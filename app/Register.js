import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import defaultStyles from "../components/style/style";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useGetUserSignInMutation, useGetUserSignUpMutation } from "../api/abinoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, setUser } from "../reducer/auth";
import { setUserDataFromStorage } from "../utils/AsyncStorage";
import { RegistrationSchema } from "../utils/Validation";
import { Link, router } from "expo-router";
import { useDispatch } from "react-redux";
import { Toast } from 'toastify-react-native'

const Register = () => {
  const dispatch = useDispatch();

  const ageRange = ["Select Age Range", "0-18", "19-24", "25-34", "35-above"];

  const pickerRef = useRef();

  async function pickImage (handleChange){
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3]
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      })
      console.log(result)
      // console.log(result.assets[0].base64)
      // console.log(result.assets[0].uri)
      // if (!result) {
      handleChange(result?.assets[0]?.base64)
      // }
  }
  // {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "height": 540, "rotation": null, "type": "image", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FAbino-Router-e04e74c6-dc4f-4a8c-ae7a-a6644e98ea03/ImagePicker/240ccab1-26af-49d0-b5c5-56845e0bbc48.jpeg", "width": 720}], "canceled": false, "cancelled": false}

  const [signUpUser,{ isLoading, isSuccess, isError, error }] = useGetUserSignUpMutation();
  const [signInUser] = useGetUserSignInMutation();

  const handleLogin = async (values) => {
    try {
      const formData = {
        username: values.username,
        email: values.email,
        Age: values.Age,
        location: values.location,
        skin: values.skin,
        occupation: values.occupation,
        password: values.password,
        confirmPassword: values.confirmPassword,
        image: values.image,
      };
      console.log(values)
      console.log(formData)
      const signUpResponse = await signUpUser(values).unwrap();
      const signInResponse = await signInUser({
        email: values.email,
        password: values.password,
      }).unwrap();
      // setErrorMessage(signInResponse.data.message);
      Toast.success( signInResponse.data.message);
      setUserDataFromStorage("userId", signInResponse?.data?.accessToken);
      router.push("(tabs)/Profile/" + signInResponse?.data?.userId);
      dispatch(setUser(signInResponse?.data?.refreshToken));
      dispatch(setToken(signInResponse?.data?.accessToken));
    } catch (error) {
      console.error("Registration:", error);
      const errorMessage = error.data ? error.data.message : "Unknown error";
      // setErrorMessage("Registration failed. " + errorMessage);
      Toast.error("Registration failed. " + errorMessage);
    }
  };


  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={require("./../asets/images/weatherTwo.png")}
          style={defaultStyles.backgroundImage}
          resizeMode="cover"
        />
        <View style={defaultStyles.content}>
          <Text style={defaultStyles.title}>Welcome to Our App</Text>
          <Text style={defaultStyles.subtitle}>Register to your account</Text>

          <Formik
            initialValues={{
              username: "",
              Age: "",
              location: "",
              skin: "",
              occupation: "",
              password: "",
              confirmPassword: "",
              image: "",
              email: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <TextInput
                  style={defaultStyles.input}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Text style={defaultStyles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                  style={defaultStyles.input}
                  placeholder="Email Address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={defaultStyles.errorText}>{errors.email}</Text>
                )}

                <Picker
                  ref={pickerRef}
                  selectedValue={values.Age}
                  onBlur={handleBlur("Age")}
                  style={styles.picker}
                  onValueChange={handleChange("Age")}
                  value={values.Age}
                >
                  {ageRange.map((age, index) => (
                    <Picker.Item label={age} value={age} key={index} />
                  ))}
                </Picker>
                {touched.Age && errors.Age && (
                  <Text style={defaultStyles.errorText}>{errors.Age}</Text>
                )}

                <TextInput
                  style={defaultStyles.input}
                  placeholder="Location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                />
                {touched.location && errors.location && (
                  <Text style={defaultStyles.errorText}>{errors.location}</Text>
                )}

                <TextInput
                  style={defaultStyles.input}
                  placeholder="Skin Type"
                  value={values.skin}
                  onChangeText={handleChange("skin")}
                  onBlur={handleBlur("skin")}
                />
                {touched.skin && errors.skin && (
                  <Text style={defaultStyles.errorText}>{errors.skin}</Text>
                )}

                <Button
                  title="Pick an image from camera roll"
                  onPress={()=>pickImage(handleChange('image'))}
                  style={{ marginTop: 10 }}
                />
                {values.image && values.image.length > 0 ? (
                  <Image source={{ uri: `data:image;base64,${values.image}` }} style={{ width: 200, height: 200,marginTop:5 }} />
                ) : null}

                <TextInput
                  style={[defaultStyles.input, { marginTop: 10 }]}
                  placeholder="Occupation"
                  onChangeText={handleChange("occupation")}
                  onBlur={handleBlur("occupation")}
                  value={values.occupation}
                />
                {touched.occupation && errors.occupation && (
                  <Text style={defaultStyles.errorText}>
                    {errors.occupation}
                  </Text>
                )}

                <TextInput
                  style={defaultStyles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={defaultStyles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                  style={defaultStyles.input}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={defaultStyles.errorText}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <TouchableOpacity
                  style={defaultStyles.button}
                  onPress={handleSubmit}
                >
                  <Text style={defaultStyles.buttonText}>
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      "Register"
                    )}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <Text style={defaultStyles.loginText}>
                    If you are already a member, click here to
                  </Text>
                  <Link
                    href={{ pathname: "Login" }}
                    style={{ color: "blue", marginLeft: 10 }}
                    asChild
                  >
                    <TouchableOpacity>
                      <Text>Login</Text>
                    </TouchableOpacity>
                  </Link>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
});

export default Register;
