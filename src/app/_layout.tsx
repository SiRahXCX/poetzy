import { Stack } from "expo-router";
import "../../global.css";
import React from "react";

export default function RootLayout() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
