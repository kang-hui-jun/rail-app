import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import config from '../utils/config';

interface Props {
  photoList: string[];
}

export default function Photo({photoList}: Props) {
  return (
    <View style={styles.page}>
      {photoList?.map(item => (
        <Image
          key={item}
          style={styles.img}
          source={{
            uri: `${config.apiUrl}/file/perview/${item}`,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  img: {
    width: 50,
    height: 50,
  },
});
