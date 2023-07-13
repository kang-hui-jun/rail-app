import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Task} from '../../types/task';
import Photo from '../../components/Photo';
import Divider from '../../components/Divider';

interface Props {
  detail: Task;
  navigation: any;
}

export const renderTag = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Text style={{...styles.tag, backgroundColor: '#FF4D4F'}}>待处理</Text>
      );
    case 1:
      return (
        <Text style={{...styles.tag, backgroundColor: '#3B80F0'}}>处理中</Text>
      );
    case 2:
      return (
        <Text style={{...styles.tag, backgroundColor: '#34C68B'}}>已处理</Text>
      );
  }
};

export const Disease = ({detail, navigation}: Props) => {
  const addDisease = () => {
    navigation.navigate('上传维养', {
      ...detail,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={{gap: 10}}>
          {detail?.diseaseList?.map(item => (
            <View style={styles.card} key={item.id}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Photo photoList={['924']} />
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{item.diseaseMouldName}</Text>
                    {renderTag(item.status)}
                  </View>
                  <Text>{item.remark}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/emergency/location.png')}
                />
                <Text>{item.lineName} |</Text>
                <Text>{item.lineTypeName} |</Text>
                <Text>{item.travelTypeName} |</Text>
                <Text>{item.workAreaName}</Text>
              </View>

              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/inspection/mileage.png')}
                />
                <Text>{item.mileage}</Text>
              </View>

              <Divider />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    gap: 5,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/task/detail.png')}
                  />
                  <Text>查看详情</Text>
                </TouchableOpacity>

                <Text>|</Text>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    gap: 5,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/task/upload.png')}
                  />
                  <Text>上传维养</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* <TouchableOpacity style={styles.btn} onPress={addDisease}>
        <Text style={{fontSize: 32, color: '#fff'}}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#FFF',
    flexDirection: 'column',
    gap: 10,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    minWidth: 100,
    minHeight: 100,
    padding: 10,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1.5,
    gap: 10,
  },

  tag: {
    padding: 5,
    color: '#FFF',
    borderRadius: 4,
    fontSize: 10,
  },

  img: {
    width: 20,
    height: 20,
  },
});
