import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

const CustomInput = ({value,placeholder,setValue,secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={setValue}
              value={value}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        borderColor:'white',
        borderWidth:5,
        borderRadius:5,
        paddingHorizontal:10,
        marginVertical:5
    },
    input:{}
})
export default CustomInput
