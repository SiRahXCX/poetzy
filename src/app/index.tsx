import { useEffect, useState } from 'react'
import { View, Pressable, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { listNotes } from '@/services/NotesManager'
import LoaderAnimation from '@/components/LoaderAnimation'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function IndexScreen() {
  const [notes, setNotes] = useState<string[]>([])
  const [screenInitialized, setScreenInitialized] = useState<boolean>(false)

  useEffect(() => {
    const initializeScreen = async () => {
      const existingNotes = await listNotes()
      setNotes(existingNotes)
      setScreenInitialized(true)
    }

    initializeScreen()
  }, [])

  return (
    <View className="justify-center flex-1 bg-white">
      <View className="flex-row flex-nowrap justify-between items-center h-[45px] px-3 bg-red-200">
        <Pressable onPress={() => null}>
          <Ionicons name="settings-outline" size={24} color="black" /> 
        </Pressable>
        <Text>
          Poetzy
        </Text>
        <Pressable onPress={() => router.push('/note')}>
          <Feather name="feather" size={24} color="black" />
        </Pressable>
      </View>

      { 
        screenInitialized ? 
        (
          <ScrollView contentContainerClassName="flex-row flex-wrap flex-1 p-4 justify-between items-center bg-cyan-200">
            {notes.map((note, index) => (
              <Pressable className="w-[150px] h-[200px] justify-center items-center rounded-md bg-lime-200">
                <Text key={index}>{note}</Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : 
        <LoaderAnimation />
      }
    </View>
  );
}
