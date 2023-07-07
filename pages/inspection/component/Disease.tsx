import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';

export const Disease = ({detail}: {detail: any}) => {
  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={{gap: 10}}>
        {[1, 2, 3, 4].map(item => (
          <View style={styles.card}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                style={{width: 80, height: 80}}
                source={require('../../../assets/home/task.png')}
              />
              <View style={{gap: 10}}>
                <Text>病害名称</Text>
                <Text>病害具体说明内容信息展示位置字数多…</Text>
              </View>
            </View>

            {/*  */}
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image source={require('../../../assets/home/task.png')} />
              <Text>九号线</Text>
              <Text>线别</Text>
              <Text>行别</Text>
              <Text>工区</Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image source={require('../../../assets/home/task.png')} />
              <Text>sk1+521.02</Text>
            </View>
          </View>
        ))}
        </View>
      </ScrollView>
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
  },
});
