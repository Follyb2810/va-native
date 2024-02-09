import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import { LinearGradient } from 'react-native-linear-gradient';
import ApiBaseUrl from './../../../utils/ApiBaseUrl'
import { LinearGradient } from 'expo-linear-gradient';
import { useGetSingleUserQuery } from '../../../api/abinoSlice';
import IMG from './../../../asets/images/profile_init.png'
const SingleUser = () => {
    const route = useRouter();
    const { id} = useLocalSearchParams();
    const [userImage, setUserImage] = useState(null);
    const [useDetails, setuseDetails] = useState({});
    const userId = id ? id.toString() : "";
    // console.log(userIdString);
    console.log(userId)
    console.log(id)
    const {data, isLoading, isSuccess, isError, error } = useGetSingleUserQuery(userId)
    console.log(data)
  
    useEffect(() => {

    }, [id]);
    
    if(isLoading){
      return (
        <View style={{flex:1}}>
          <Image
           source={require('./../../../asets/images/profileAnime.gif')}
           resizeMode='cover'
           style={{width:'100%',height:'100%'}}
          />
        </View>
        )
    }
    return (
      <LinearGradient colors={['#56ab2f', '#a8e063']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <SafeAreaView>
        <Stack.Screen
        options={{
            headerTitle:  data?.data?.email ?? 'Loading',
            headerTintColor:'#333'
        }}
    />

          <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
          {data?.data?.image && (
            <Image
              source={{ uri: data.data.image.startsWith("http") ? data.data.image : `data:image;base64,${data.data.image}` }}
              style={styles.profileImage}
            />
          )}
          
        </View>
  <View style={styles.detailsContainer}>
    {Object.entries(data?.data).map(([key, value]) => (
      <View style={{ flexDirection: 'row', gap: 5 }} key={key}>
        <Text style={styles.infoText}>{key !== 'image' ? key : ''}</Text>
        <Text style={styles.infoText}>{key === 'image' ? '' : value}</Text>
      </View>
    ))}
  </View>
</View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
    )
}


const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  imageContainer: {
    // flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  detailsContainer: {
    // flex: 1,
    // marginLeft: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#2c3e50',
  },
});
export default SingleUser
