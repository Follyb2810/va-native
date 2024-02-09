import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import defaultStyles from "../components/style/style";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../reducer/auth";
import { useGetUserSignInMutation } from "../api/abinoSlice";
import { setUserDataFromStorage } from "../utils/AsyncStorage";
import { LoginSchema } from "../utils/Validation";
import { useFormik } from "formik";
import ToastManager,{ Toast } from 'toastify-react-native'

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();


  const [signInUser, { isLoading, isSuccess }] = useGetUserSignInMutation();
  

  const handleLogin = async () => {
    try {
      // console.log(values);
      const signInResponse = await signInUser(values).unwrap();
      
      setUserDataFromStorage("userId", signInResponse?.data?.accessToken);
      router.push("(tabs)/Profile/" + signInResponse?.data?.userId);
      dispatch(setUser(signInResponse?.data?.refreshToken));
      dispatch(setToken(signInResponse?.data?.accessToken));
  
      Toast.success(signInResponse?.message);
    } catch (error) {
      const errorMessage = error.data ? error.data.message : 'Unknown error';
      Toast.error(errorMessage);
    }
  };

  const { touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit, values,errors } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin
  });

  console.log(values);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={require("./../asets/images/weatherTwo.png")}
        style={defaultStyles.backgroundImage}
        resizeMode="cover"
      />
      <View style={defaultStyles.content}>
        <Text style={defaultStyles.title}>Welcome to Our App</Text>
        <Text style={defaultStyles.subtitle}>Log in to your account</Text>
        <TextInput
          style={defaultStyles.input}
          placeholder="email"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          keyboardType='email-address'
        />
        {touched.email && errors.email && (
          <Text style={defaultStyles.errorText}>
            {errors.email}
          </Text>
        )}
        <TextInput
          style={defaultStyles.input}
          placeholder="Password"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        {touched.password && errors.password && (
          <Text style={defaultStyles.errorText}>
            {errors.password}
          </Text>
        )}
        <TouchableOpacity style={defaultStyles.button} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={defaultStyles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.login, { flexDirection: 'row' }]}>
          <Text style={defaultStyles.loginText}>
            if you are you not a member, click here to
          </Text>
          <Link
            href={{ pathname: "Register" }}
            style={{ color: "blue" }}
            asChild
          >
            <TouchableOpacity>
              <Text>Register</Text>
            </TouchableOpacity>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;



