import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { AuthForm } from '../../components';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/routes';
import { useRegisterUserMutation } from '../../redux/services/userApi';
import {
  validatePhone,
  validateEmail,
  validateInput,
  validatePassword,
} from '../../utils/Methods';

const SignUp = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // clear individual error
  };

  const handleSignUp = async () => {
    const { name, email, phone, password } = form;
    const validationErrors = {
      name: validateInput(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
    };

    const hasErrors = Object.values(validationErrors).some((error) => error);

    if (hasErrors) {
      setErrors(validationErrors);

      // Clear after 3 seconds
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    try {
      const response = await registerUser({ name, email, phone, password }).unwrap();

      alert('Account created successfully!');
      navigation.navigate(ScreenNames.LOGIN);
    } catch (error) {
      const message = error?.data?.message || 'Something went wrong!';
      alert(`Registration Failed: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        title="Sign Up"
        fields={[
          {
            name: 'name',
            value: form.name,
            placeholder: 'Enter your full name',
            error: errors.name,
          },
          {
            name: 'email',
            value: form.email.toLowerCase(),
            placeholder: 'Enter your email',
            keyboardType: 'email-address',
            error: errors.email,
          },
          {
            name: 'phone',
            value: form.phone,
            placeholder: 'Enter your phone number',
            keyboardType: 'phone-pad',
            error: errors.phone,
          },
          {
            name: 'password',
            value: form.password,
            placeholder: 'Enter your password',
            secureTextEntry: true,
            error: errors.password,
          },
        ]}
        onChange={handleChange}
        onSubmit={handleSignUp}
        submitTitle="Create Account"
        isLoading={isLoading}
        footer={
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate(ScreenNames.LOGIN)}
            >
              Login
            </Text>
          </Text>
        }
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
  link: {
    color: '#007bff',
    fontWeight: '600',
  },
});
