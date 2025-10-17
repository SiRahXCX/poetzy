import * as FileSystem from 'expo-file-system'

const notesDir = FileSystem.documentDirectory + 'poetzy/'

export const ensurePoetzyDirExists = async (): Promise<void> => {
    try {
        const dirInfo = await FileSystem.getInfoAsync(notesDir)
    
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(notesDir, { intermediates: true })
        }
    } catch (e: any) {
        throw new Error(`error ensuring 'poetzy' directory existence\n->${e.message}`)
    }
}

export const saveNote = async (filename: string, content: string): Promise<void> => {
    try {
        if (!filename) {
            throw new Error(`filename cannot be empty`)
        }

        await ensurePoetzyDirExists()
        const filePath = `${notesDir}${filename}.txt`
        await FileSystem.writeAsStringAsync(filePath, content)
    } catch (e: any) {
        throw new Error(`error saving note\n->${e.message}`)
    }
}

export const listNotes = async (): Promise<string[]> => {
    try {
        await ensurePoetzyDirExists()
        const notes = await FileSystem.readDirectoryAsync(notesDir)
        return notes    
    } catch (e: any) {
        throw new Error(`error listing saved notes\n->${e.message}`)
    }
}

