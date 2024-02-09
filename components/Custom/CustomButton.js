import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({onPress,text,type = 'PRIMARY',bgColor,fgColor}) => {
    return (
        <Pressable style={[
            styles.text,
            styles[`container_${type}`],
            bgColor ? {backgroundColor:bgColor}:{}
                ]} onPress={onPress}>
            <Text style={[styles.text,
                styles[`container_${type}`],
                fgColor ? {color:fgColor}:{}
            ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'#3b71f3',
        padding:15,
        marginVertical:5,
        alignItems:'center',
        borderRadius:5
    },
    text:{
        fontWeight:'bold',
        color:'white'
    },
    container_PRIMARY:{
        backgroundColor:'#3b71f3'
    },
    container_SECONDARY:{
        borderColor:'#3b71f3',
        borderWidth:2
    },
    container_TERTIARY:{},
    text_SECONDARY:{
        color:'#3b71f3'
    },
    text_TERTIARY:{},
    text_PRIMARY:{},
    
})
export default CustomButton

// #e7eaf4 #4765a9 #fae9ea #dd4d44 #e3e3e3 #363636
