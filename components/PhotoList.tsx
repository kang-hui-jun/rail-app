import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {request} from '../utils/request';
import config from '../utils/config';

interface Props {
  change: (v: string[]) => void;
}

export default function PhotoList({change}: Props) {
  const [photoList, setPhotoList] = useState<string[]>([]);

  // 调相机
  const convertImageToFile = (imagePath: string) => {
    const tempImageFilePath =
      RNFetchBlob.fs.dirs.DocumentDir + '/tempImage.jpg';

    RNFetchBlob.fs
      .readFile(imagePath, 'base64')
      .then(data => {
        return RNFetchBlob.fs.writeFile(tempImageFilePath, data, 'base64');
      })
      .then(() => {
        const imageFile = {
          uri: 'file://' + tempImageFilePath,
          type: 'image/jpeg',
          name: 'tempImage.jpg',
        };
        const formData = new FormData();
        formData.append('file', imageFile);
        request('/file/upload', {
          method: 'post',
          body: formData,
          file: true,
        }).then(res => {
          const list = [...photoList, res.data];
          setPhotoList(list);
          change(list);
        });
      })
      .catch(error => {
        console.log('Error converting image to file:', error);
      });
  };

  const handlePaiZhao = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      convertImageToFile(image.path);
    });
  };
  return (
    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
      {photoList?.map(item => (
        <Image
          key={item}
          style={styles.img}
          source={{
            uri: `${config.apiUrl}/file/perview/${item}`,
          }}
        />
      ))}

      <View style={styles.add}>
        <TouchableOpacity onPress={handlePaiZhao}>
          <Text style={{color: '#52546D', fontSize: 32}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
  },
  add: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F9',
    borderRadius: 6,
  },
});
