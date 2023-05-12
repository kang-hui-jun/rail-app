import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getTaskDetail} from '../../api/inspection';
import {useEffect, useState} from 'react';
import config from '../../utils/config';

const image = {
  uri: config.apiUrl + '/imgs/inspection/detail.png',
};

// @ts-ignore
export const Detail = ({route, navigation}) => {
  const params = route.params;

  const [detail, setDetail] = useState<any>({});

  const getDetail = () => {
    getTaskDetail(params).then(res => {
      setDetail(res.data);
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={image} style={styles.bg}>
        <View style={styles.card}>
          <Text style={styles.title}>{detail.name}</Text>
          <Text style={styles.num}>{detail.num}</Text>
          <View style={styles.divider}></View>
          <View style={styles.date}>
            <View style={styles.start}>
              <Text>
                {detail.inspectionDate} {detail.inspectionTime}
              </Text>
            </View>
            <View style={styles.end}>
              <Text>
                {detail.inspectionDate} {detail.inspectionTime}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View>
        <Text></Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btn}>结束作业</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  bg: {
    width: '100%',
    resizeMode: 'cover',
    height: 200,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '90%',
    minHeight: 100,
    padding: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 150,
  },
  title: {
    fontSize: 20,
    color: '#9D9FB6',
  },
  num: {
    fontSize: 18,
    color: '#3B80F0',
    marginTop: 5,
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  start: {},
  end: {},
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 8,
    padding: 16,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#3B80F0',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18
  },
});
