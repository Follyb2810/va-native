import { Formik } from 'formik';
import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    Age: Yup.string().required('Age is required'),
    location: Yup.string().required('Location is required'),
    skin: Yup.string().required('Skin Type is required'),
    occupation: Yup.string().required('Occupation is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    image:Yup.string().optional()
});
export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
// password: Yup.string().required('Password is required'),
// confirmPassword: Yup.string()
//   .oneOf([Yup.ref('password'), null], 'Passwords must match')
//   .required('Confirm Password is required'),
  