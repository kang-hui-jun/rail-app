import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {Task} from '../../../types/task';
import config from '../../../utils/config';

const image = {
  uri: config.apiUrl + '/imgs/task/avatar.png',
};

const cardBg = {
  uri: config.apiUrl + '/imgs/task/green.png',
};

export const Group = ({detail}: {detail: Task}) => {
  return (
    <View style={styles.page}>
      {detail?.groupList?.map(item => (
        <View style={styles.li} key={item.id}>
          <View style={styles.header}>
            <Text>{item.groupName}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.person}>
            <View style={styles.leader}>
              <Image style={styles.img} source={image} />
              <Text>{item.leaderName}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.cards}>
              <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
              <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
                <ImageBackground
                style={styles.cardBg}
                source={cardBg}></ImageBackground>
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
    gap: 10
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
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  cardBg: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
  },
});
