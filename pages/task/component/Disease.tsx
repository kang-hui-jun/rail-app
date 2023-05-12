import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import config from '../../../utils/config';
import {Task} from '../../../types/task';

const image = {
  uri: config.apiUrl + '/imgs/task/blue.png',
};

const renderTag = (status: number) => {
  switch (status) {
    case 0:
      return <Text style={{...styles.tag, backgroundColor: '#FF4D4F'}}>待处理</Text>;
    case 1:
      return <Text style={{...styles.tag, backgroundColor: '#3B80F0'}}>处理中</Text>;
    case 2:
      return <Text style={{...styles.tag, backgroundColor: '#34C68B'}}>已处理</Text>;
  }
};

export const Disease = ({detail}: {detail: Task}) => {
  return (
    <View style={styles.page}>
      {detail.diseaseList?.map(item => (
        <View style={styles.li}>
          <View style={styles.header}>
            <Image style={styles.img} source={image} />
            <View style={styles.center}>
              <View style={styles.title}>
                <Text>{item.diseaseMouldName}</Text>
                <Text>{item.diseaseLevel}</Text>
              </View>
              <Text numberOfLines={1}>{item.remark}</Text>
            </View>
            {renderTag(item.status)}
          </View>
          <View style={styles.content}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>{item.lineName}</Text>
              <Text>{item.lineTypeName}</Text>
              <Text>{item.travelTypeName}</Text>
              <Text>{item.workAreaName}</Text>
            </View>
            <Text>{item.mileage}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.btnText}>查看详情</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.btnText}>上传维养</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    gap: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  li: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    gap: 10,
  },
  tag: {
    padding: 8,
    color: '#FFF',
    borderRadius: 4,
    fontSize: 12,
  },
  content: {},
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  btnText: {
    color: '#3B80F0',
  },
});
