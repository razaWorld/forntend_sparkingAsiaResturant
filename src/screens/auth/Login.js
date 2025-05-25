import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { AuthForm } from '../../components';
import { useDispatch } from 'react-redux';
import { useLoginUsersMutation } from '../../redux/services/userApi';
import { setIsLoggedIn, setToken, setUserMeta } from '../../redux/slices/user';
import ScreenNames from '../../routes/routes';
import { EmailSvg, PasswordSvg } from '../../assets/svgs/svg';
import { AppColors } from '../../utils/DesignSystem';

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    email: 'raza72575@gmail.com',
    password: '123',
  });

  const [loginUser, { isLoading }] = useLoginUsersMutation();
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert('Error', 'Email and Password are required');
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();

      dispatch(setIsLoggedIn(true));
      dispatch(setUserMeta(response.user));
      dispatch(setToken(response.token));

      navigation.navigate(ScreenNames.BOTTOMTAB);
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Login Failed', err?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        title="Login"
        fields={[
          {
            name: 'email',
            value: form.email,
            placeholder: 'Enter your email',
            keyboardType: 'email-address',
            leftIcon: <EmailSvg />
          },
          {
            name: 'password',
            value: form.password,
            placeholder: 'Enter your password',
            secureTextEntry: true,
            leftIcon: <PasswordSvg />
          },
        ]}
        onChange={handleChange}
        onSubmit={handleLogin}
        submitTitle="Login"
        isLoading={isLoading}
        footer={
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate(ScreenNames.SIGNUP)}
            >
              Sign Up
            </Text>
          </Text>
        }
      />
    </View>
  );
};

export default Login;

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
    color: AppColors.reds,
    fontWeight: '600',
  },
});
