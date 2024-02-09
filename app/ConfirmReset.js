import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { CustomButton, CustomInput } from './../components/Custom'


const ConfirmReset = () => {
    const [code,setCode]= useState('')
    const [newPassword,setnewPassword]= useState('')
    const onSubmitPress =()=>{}
     
    const onBackToSignPress =()=>{}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text>Reset your password</Text>
             <CustomInput
              
              placeholder='enter your confirmation code'
               value={code} setValue={setCode}
             />
             <CustomInput
              
              placeholder='enter your new password'
               value={newPassword} setValue={setnewPassword}
             />
             <CustomButton  
             title='submit' 
             onPress={onSubmitPress}
             
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

export default ConfirmReset
