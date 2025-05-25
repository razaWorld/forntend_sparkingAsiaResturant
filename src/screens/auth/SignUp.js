import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { AuthForm } from '../../components';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/routes';
const SignUp = () => {
  const navigation = useNavigation();

  // State for form fields
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    setLoading(true);

    // Simulate async signup process
    setTimeout(() => {
      setLoading(false);
      // Navigate to Login or Home screen after success
      navigation.navigate(ScreenNames.LOGIN);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <AuthForm
        title="Sign Up"
        fields={[
          {
            name: 'email',
            value: form.email,
            placeholder: 'Enter your email',
            keyboardType: 'email-address',
          },
          {
            name: 'password',
            value: form.password,
            placeholder: 'Enter your password',
            secureTextEntry: true,
          },
          {
            name: 'confirmPassword',
            value: form.confirmPassword,
            placeholder: 'Confirm your password',
            secureTextEntry: true,
          },
        ]}
        onChange={handleChange}
        onSubmit={handleSignUp}
        submitTitle="Create Account"
        isLoading={loading}
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
