import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Task, Group as G} from '../../../types/task';
import config from '../../../utils/config';
import RenderTag from '../../../components/RenderTag';
import GroupCard from './GroupCard';

const image = {
  uri: config.apiUrl + '/imgs/task/avatar.png',
};

interface Props {
  detail: Task;
  navigation: any;
}

export const Group = ({detail, navigation}: Props) => {
  const handleDetail = (param: G) => {
    navigation.navigate('小组详情', {
      ...param,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        {detail?.groupList?.map(item => (
          <View style={styles.li} key={item.id}>
            <TouchableOpacity style={styles.header} onPress={() => handleDetail(item)}>
              <Text>{item.groupName}</Text>
              <RenderTag status={item.status} />
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <View style={styles.person}>
              <View style={styles.leader}>
                <Image style={styles.img} source={image} />
                <Text>{item.leaderName}</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.cards}>
                <GroupCard status={item.status} title="打卡" />
                <GroupCard status={item.status} title="领用" />
                <GroupCard status={item.status} title="二次领用" />
                <GroupCard status={item.status} title="出清" />
                <GroupCard status={item.status} title="清点归还" />
                <GroupCard status={item.status} title="遗留物品登记" />
                <GroupCard status={item.status} title="结束小组作业" />
                <GroupCard status={item.status} title="拍照" />
              </View>
            </View>
          </View>
        ))}
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
    gap: 10,
  },
  leader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
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
