import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Photo from '../../../components/Photo';
import {Inspection} from '../../../types/inspection';

interface Props {
  detail: Inspection;
  navigation: any;
}

export const Disease = ({detail, navigation}: Props) => {
  const addDisease = () => {
    navigation.navigate('病害上报', {
      ...detail,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={{gap: 10}}>
          {detail?.diseaseList.map(item => (
            <View style={styles.card} key={item.id}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Photo photoList={['924']} />
                <View style={{gap: 10}}>
                  <Text>{item.diseaseMouldName}</Text>
                  <Text>{item.remark}</Text>
                </View>
              </View>

              {/*  */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../../assets/emergency/location.png')}
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
                  source={require('../../../assets/inspection/mileage.png')}
                />
                <Text>{item.mileage}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.btn} onPress={addDisease}>
        <Text style={{fontSize: 32, color: '#fff'}}>+</Text>
      </TouchableOpacity>
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

  btn: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#93B8F5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
