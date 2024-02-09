import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { CustomButton, CustomInput } from './../components/Custom'


const Forget = () => {
    const [code,setCode]= useState('')
    const onConfirmPress =()=>{}
    const onResendPress =()=>{}
    const onBackToSignPress =()=>{}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text>Confirm your email</Text>
             <CustomInput
              
              placeholder='enter your confirmation code' value={code} setValue={setCode}
             />
             <CustomButton  
             title='confirm' 
             onPress={onConfirmPress}
             
             />
             <CustomButton  
             title='Resend code' 
             onPress={onResendPress}
             
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

export default Forget
