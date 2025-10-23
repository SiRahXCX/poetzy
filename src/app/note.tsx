import { useState, useEffect } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNotes } from '@/context/NotesContext'
import { AppText } from '@/components/AppText'
import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown'
import { remark } from 'remark'
import strip from 'strip-markdown'
import LoaderAnimation from '@/components/LoaderAnimation'

export default function NoteScreen() {
    const canGoBack = router.canGoBack()
    const noteTitleMaxlength = 64
    const { notes, saveNote } = useNotes()
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [screenInitialized ,setScreenInitialized] = useState(false)
    const params = useLocalSearchParams<{title: string}>()

    const stripMarkdown = async (markdown: string) => {
        return String(await remark().use(strip).process(markdown))
    }

    const routerGoBack = async () => {
        try {
            if (content.length) {
                await saveNote(title || await stripMarkdown(content.slice(0, 24)), content)
            }
            
            if (canGoBack) {
                router.back()
            }
        } catch (e: any) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        const initializeScreen = async () => {
            try {
                if (params.title) {
                    const note = notes.find(note => note.title === params.title)
                    
                    if (!note) {
                        throw new Error(`error note ${params.title} does not exist`)
                    }

                    setTitle(note.title)
                    setContent(note.content)
                }
            } catch (e: any) {
                console.error(`error initializing screen\n->${e.message}`)
            } finally {
                setScreenInitialized(true)
            }
        }

        initializeScreen()
    }, []) 

    return (
        <View className="flex-1 bg-white">
            {
                screenInitialized ? (
                    <>

                        <View className="flex-row flex-nowrap justify-between items-center h-[45px] px-3 bg-red-200">
                            <Pressable onPress={() => canGoBack && routerGoBack()}>
                                <Ionicons name="arrow-back-outline" size={24} color="black" />
                            </Pressable>
                            <TextInput
                                value={title}
                                placeholder='Untitled'
                                onChangeText={(text) => setTitle(text)}
                                maxLength={noteTitleMaxlength}
                            />
                            <Pressable onPress={() => routerGoBack()}>
                                <FontAwesome name="save" size={24} color="black" />
                            </Pressable>
                        </View>

                        <View>
                            <Pressable className="p-2">
                                <AppText bold>
                                    Bold
                                </AppText>
                            </Pressable>
                        </View>

                        <View className="flex-1 bg-cyan-200">
                            <MarkdownTextInput
                                className="px-2 color-black bg-lime-200"
                                value={content}
                                placeholder={`There is nothing so stable as change\n- Bob Dylan`}
                                onChangeText={(text) => setContent(text)}
                                parser={parseExpensiMark}
                                multiline
                            />
                        </View>
                    </>
                ) : <LoaderAnimation size="large" color="green" />
            }
        </View>
    )
}