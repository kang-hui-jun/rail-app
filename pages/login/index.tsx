import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useAuth} from '../../store';
import {LoginForm} from '../../types/login-form';
import config from '../../utils/config';
import { getInfo } from '../../api/get-info';

const title = config.appName;
const image = {uri: config.apiUrl + '/imgs/login_bg.png'};
const logo = {uri: config.apiUrl + '/imgs/logo.png'};

export const Login = () => {
  const context = useAuth();
  const [form, setForm] = useState({
    username: 'admin',
    password: 'admin123',
  });

  const handleLogin = async (form: LoginForm) => {
    try {
      await context?.login(form);
      await getInfo()
    } catch (error) {}
  };

  return (
    <View style={styles.login}>
      <ImageBackground source={image} style={styles.image}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.inp}
          placeholderTextColor="#FFF"
          placeholder="账号"
          onChangeText={v => setForm({...form, username: v})}
          value={form.username}
          autoComplete="password"
        />

        <TextInput
          style={styles.inp}
          placeholderTextColor="#FFF"
          placeholder="密码"
          onChangeText={v => setForm({...form, password: v})}
          value={form.password}
          autoComplete="password"
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleLogin(form)}>
          <Text style={{color: '#3B80F0', textAlign: 'center'}}>登 录</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
  },
  inp: {
    width: 300,
    padding: 12,
    color: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#FFF',
    padding: 12,
    width: 300,
    borderRadius: 8,
  },
});
