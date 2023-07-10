import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {Task, Group as G} from '../../../types/task';
import config from '../../../utils/config';
import RenderTag from '../../../components/RenderTag';
import ScanDeviceModule from '../../../ToastExample';
import GroupCard from '../../task/component/GroupCard';
import {useEffect} from 'react';

const image = {
  uri: config.apiUrl + '/imgs/task/avatar.png',
};

interface Props {
  detail: Task;
  navigation: any;
}

export const Cycle = ({detail, navigation}: Props) => {
  ScanDeviceModule.initDevice();
  ScanDeviceModule.open915(
    33,
    () => {
      console.log('成功');
      ScanDeviceModule.startScan915();
    },
    () => {
      console.log('失败');
    },
  );
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ScanDeviceModule);
    eventEmitter.addListener('tagEvent', event => {
      console.log(event);
    });

    return () => {
      ScanDeviceModule.close915();
    };
  }, []);

  const handleDetail = (param: G) => {
    navigation.navigate('小组详情', {
      ...param,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.li}>
          <View style={styles.person}>
            <View style={styles.leader}>
              <Image style={styles.img} source={image} />
              <Text>李四</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.cards}>
              <GroupCard status={2} title="打卡" />
              <GroupCard status={2} title="领用" />
              <GroupCard status={2} title="二次领用" />
              <GroupCard status={2} title="出清" />
              <GroupCard status={2} title="清点归还" />
              <GroupCard status={2} title="遗留物品登记" />
              <GroupCard status={2} title="拍照" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    gap: 20,
    flex: 1,
  },
  li: {
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  img: {
    width: 60,
    height: 60,
  },
  line: {
    height: 100,
    width: 2,
    backgroundColor: '#F0F1F3',
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    alignItems: 'center',
  },
  cardBg: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
  },
});
