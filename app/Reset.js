import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { CustomButton, CustomInput } from './../components/Custom'


const Reset = () => {
    const [username,setUsername]= useState('')
    const onConfirmPress =()=>{}
    const resetPress =()=>{}
    const onBackToSignPress =()=>{}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text>Reset Your Password</Text>
             <CustomInput
              
              placeholder='enter your email' value={username} setValue={setUsername}
             />
             <CustomButton  
             title='confirm' 
             onPress={onConfirmPress}
             
             />
             <CustomButton  
             title='Send' 
             onPress={resetPress}
             
             type='SECONDARY'
             />
             <CustomButton  
             title='Back to Sign In' 
             onPress={onBackToSignPress}
             type='TERTIARY'
             />
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#f9fbfc'
    }
})

export default Reset
