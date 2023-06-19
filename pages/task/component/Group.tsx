import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {Task} from '../../../types/task';
import config from '../../../utils/config';
import { renderTag } from '../../../components/RenderTag';

const image = {
  uri: config.apiUrl + '/imgs/task/avatar.png',
};

export const Group = ({detail}: {detail: Task}) => {
  return (
    <View style={styles.page}>
      {detail?.groupList?.map(item => (
        <View style={styles.li} key={item.id}>
          <View style={styles.header}>
            <Text>{item.groupName}</Text>
            {
              renderTag(item.status)
            }
          </View>
          <View style={styles.divider}></View>
          <View style={styles.person}>
            <View style={styles.leader}>
              <Image style={styles.img} source={image} />
              <Text>{item.leaderName}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.cards}>
              <View style={styles.card}>
                <Text style={styles.font}>打卡</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>领用</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>二次领用</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>出清</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>清点归还</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>遗留物品登记</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>结束小组作业</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.font}>拍照</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    gap: 20,
  },
  li: {
    padding: 20,
    backgroundColor: '#FFF',
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
  card: {
    width: 65,
    height: 90,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  font: {
    color: '#FFF',
  },
  cardBg: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
  },
});
