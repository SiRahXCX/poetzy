import { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ensurePoetzyDirExists, saveNote } from '@/services/NotesManager'

export default function NoteScreen() {
    const canGoBack = router.canGoBack()
    const noteTitleMaxlength = 64
    const [noteTitle, setNoteTitle] = useState<string>('')
    const [note, setNote] = useState<string>('')

    const routerGoBack = async () => {
        if (note.length) {
            await saveNote(noteTitle || note.slice(0, noteTitleMaxlength), note)
        }
        
        if (canGoBack) {
            router.back()
        }
    }

    return (
        <View className="flex-1 bg-white">
            <View className="flex-row flex-nowrap justify-between items-center h-[45px] px-3 bg-red-200">
                <Pressable onPress={() => canGoBack && routerGoBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
                <TextInput
                    value={noteTitle}
                    placeholder='Untitled'
                    onChangeText={(text) => setNoteTitle(text)}
                    maxLength={noteTitleMaxlength}
                />
                <Pressable onPress={() => routerGoBack()}>
                    <FontAwesome name="save" size={24} color="black" /> 
                </Pressable>
            </View>

            <View className="flex-1 bg-cyan-200">
                <TextInput
                    className="px-2 color-black bg-lime-200"  
                    value={note}
                    onChangeText={(text) => setNote(text)}
                    multiline
                />
            </View>
        </View>
    )
}