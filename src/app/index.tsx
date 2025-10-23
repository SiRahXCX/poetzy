import { View, Pressable, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AppText } from '@/components/AppText'
import { useNotes } from '@/context/NotesContext'

export default function IndexScreen() {
  const { notes, deleteNoteByTitle,  deleteAllNotes} = useNotes()

  return (
    <View className="justify-center flex-1 bg-white">
      <View className="flex-row flex-nowrap justify-between items-center h-[45px] px-3 bg-red-200">
        <Pressable onPress={() => deleteAllNotes()}>
          <Ionicons name="settings-outline" size={24} color="black" /> 
        </Pressable>
        <AppText className="bg-amber-200" size="heading" bold>
          Poetzy
        </AppText>
        <Pressable onPress={() => router.push('/note')}>
          <Feather name="feather" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="flex-row flex-wrap flex-1 p-4 justify-between items-center bg-cyan-200">
        {notes.map((note, index) => (
          <Pressable 
            key={index} 
            className="w-[160px] h-[200px] mb-2 justify-center items-center rounded-lg bg-lime-200" 
            onPress={() => router.push({pathname: '/note', params: { title: note.title }})}
          >
            <Pressable className="absolute right-3 bottom-3" onPress={() => deleteNoteByTitle(note.title)}>
              <Feather name="trash-2" size={20} color="red" />
            </Pressable>
            <AppText>{note.title}</AppText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
