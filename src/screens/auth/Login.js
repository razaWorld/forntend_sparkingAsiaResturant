import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { AuthForm } from '../../components';
import { useDispatch } from 'react-redux';
import { useLoginUsersMutation } from '../../redux/services/userApi';
import { setIsLoggedIn, setToken, setUserMeta } from '../../redux/slices/user';
import ScreenNames from '../../routes/routes';
import { EmailSvg, PasswordSvg } from '../../assets/svgs/svg';
import { AppColors } from '../../utils/DesignSystem';
import { validateInput } from '../../utils/Methods'; // ✅ Only using this

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    email: 'razaworld72575@gmail.com',
    password: '12345678',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { isLoading }] = useLoginUsersMutation();
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleLogin = async () => {
    const emailError = validateInput(form.email);
    const passwordError = validateInput(form.password);
  
    setErrors({
      email: emailError,
      password: passwordError,
    });
  
    if (emailError || passwordError) {
      // Clear errors after 3 seconds
      setTimeout(() => {
        setErrors({ email: '', password: '' });
      }, 3000);
      return;
    }
  
    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      }).unwrap();
  
      dispatch(setIsLoggedIn(true));
      dispatch(setUserMeta(response.user));
      dispatch(setToken(response.token));
  
      navigation.navigate(ScreenNames.BOTTOMTAB);
    } catch (err) {
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
            leftIcon: <EmailSvg />,
            error: errors.email,
          },
          {
            name: 'password',
            value: form.password,
            placeholder: 'Enter your password',
            secureTextEntry: true,
            leftIcon: <PasswordSvg />,
            error: errors.password,
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
