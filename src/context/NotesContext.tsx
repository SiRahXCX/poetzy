import React, { createContext, useContext, useState, useEffect } from 'react'
import * as FileSystem from 'expo-file-system'
import { remark } from 'remark'

type Note = {
    title: string;
    content: string;
}

type NotesContextType = {
    notes: Note[];
    loadNoteByFilename: (filename: string) => Promise<string>;
    saveNote: (filename: string, content: string) => Promise<void>;
    deleteAllNotes: () => Promise<void>;
    deleteNoteByTitle: (filename: string) => Promise<void>;
    deleteNoteByFilename: (filename: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([])
    const fileDir = FileSystem.documentDirectory + 'poetzy/'
    const fileFormat = 'md'

    const ensurePoetzyDirExists = async (): Promise<void> => {
        try {
            const dirInfo = await FileSystem.getInfoAsync(fileDir)

            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true })
            }
        } catch (e: any) {
            throw new Error(`error ensuring 'poetzy' directory existence\n->${e.message}`)
        }
    }
    
    const listNotes = async (): Promise<void> => {
        try {
            await ensurePoetzyDirExists()
            const filenames = await FileSystem.readDirectoryAsync(fileDir)
            const notesArray = await Promise.all(filenames.map(async (filename: string) => {
                const content = await FileSystem.readAsStringAsync(`${fileDir}${filename}`)
                return { title: filename.replace(`.${fileFormat}`, ''), content }
            }))

            setNotes(notesArray)
        } catch (e: any) {
            throw new Error(`error listing saved notes\n->${e.message}`)
        }
    }

    const loadNoteByFilename = async (filename: string): Promise<string> => {
        try {
            await ensurePoetzyDirExists()
            const filePath = `${fileDir}${filename}`
            const fileInfo = await FileSystem.getInfoAsync(filePath)

            if (!fileInfo.exists) {
                throw new Error('file does not exist')
            }

            const content = await FileSystem.readAsStringAsync(filePath)
            return content
        } catch (e: any) {
            throw new Error(`error loading note ${filename}\n->${e.message}`)
        }
    }

    const saveNote = async (title: string, content: string): Promise<void> => {
        try {
            if (!title) {
                throw new Error(`note title cannot be empty`)
            }

            await ensurePoetzyDirExists()
            const filePath = `${fileDir}${title}.${fileFormat}`
            await FileSystem.writeAsStringAsync(filePath, content)
            await listNotes()
        } catch (e: any) {
            throw new Error(`error saving note\n->${e.message}`)
        }
    }

    const deleteAllNotes = async () => {
        try {
            await ensurePoetzyDirExists()
            const filenames = await FileSystem.readDirectoryAsync(fileDir)
            filenames.forEach(async filename => await deleteNoteByFilename(filename))
        } catch (e: any) {
            throw new Error(`error deleting all notes\n->${e.message}`)
        }
    }

    const deleteNoteByTitle = async (title: string) => {
        try {
            if (!title) {
                throw new Error('title cannot be empty')
            }

            await ensurePoetzyDirExists()
            const filePath = `${fileDir}${title}.${fileFormat}`
            const fileInfo = await FileSystem.getInfoAsync(filePath)

            if (!fileInfo.exists) {
                throw new Error('file does not exist')
            }

            await FileSystem.deleteAsync(filePath)
            await listNotes()
        } catch (e: any) {
            throw new Error(`error deleting note ${title}\n->${e.message}`)
        }
    }

    const deleteNoteByFilename = async (filename: string) => {
        try {
            if (!filename) {
                throw new Error('filename cannot be empty')
            }

            await ensurePoetzyDirExists()
            const filePath = `${fileDir}${filename}`
            const fileInfo = await FileSystem.getInfoAsync(filePath)

            if (!fileInfo.exists) {
                throw new Error('file does not exist')
            }

            await FileSystem.deleteAsync(filePath)
            await listNotes()
        } catch (e: any) {
            throw new Error(`error deleting note ${filename}\n->${e.message}`)
        }
    }

    useEffect(() => {
        listNotes()
    }, [])

    return (
        <NotesContext.Provider value={{ notes, loadNoteByFilename, saveNote, deleteAllNotes, deleteNoteByTitle, deleteNoteByFilename }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () => {
    const ctx = useContext(NotesContext)
    if (!ctx) {
        throw new Error('useNotes can only be used for screens covered by NotesProvider')
    }
    return ctx
}