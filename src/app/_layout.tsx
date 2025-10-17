import { Stack } from 'expo-router'
import '../../global.css'
import React from 'react'
import { NotesProvider } from '@/context/NotesContext'

export default function RootLayout() {
  return (
    <React.Fragment>
      <NotesProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="note"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </NotesProvider>
    </React.Fragment>
  );
}
