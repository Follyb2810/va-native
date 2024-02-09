import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const _layout = () => {
    return <Stack
    screenOptions={{
        headerStyle: {
        //   backgroundColor: '#f4511e',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: 'loading..',
      }}
    
    />
}

export default _layout
