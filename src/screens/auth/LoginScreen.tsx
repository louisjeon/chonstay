import React, {useRef, useState} from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';
import useAuth from '../../hooks/queries/useAuth';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {
      id: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="아이디"
          error={login.errors.id}
          touched={login.touched.id}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType="next"
          {...login.getTextInputProps('id')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
