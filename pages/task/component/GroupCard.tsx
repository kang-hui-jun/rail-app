import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import config from '../../../utils/config';

const grey = {
  uri: config.apiUrl + '/imgs/task/grey.png',
};

const blue = {
  uri: config.apiUrl + '/imgs/task/blue.png',
};

const green = {
  uri: config.apiUrl + '/imgs/task/green.png',
};

interface Props {
  title: string;
  status: number;
}
const obj: {[key: string]: {uri: string}} = {
  4: blue,
};

export default function GroupCard({status, title}: Props) {
  return (
    <ImageBackground source={obj[status] || green} style={styles.card}>
      <Text style={styles.font}>{title}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 65,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    color: '#FFF',
  },
});
