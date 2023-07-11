import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {CheckBox} from '../../../components/CheckBox';

export const Info = ({detail}: {detail: any}) => {
  console.log(detail.itemListVo);

  return (
    <View style={styles.page}>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/line.png')}
        />
        <Text>巡检线路：</Text>
        <Text>{detail.lineName}</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/time.png')}
        />

        <Text>巡检时间：</Text>
        <Text>{detail.inspectionDate}</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/dept.png')}
        />

        <Text>负责部门：</Text>
        <Text>{detail.deptName}</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/user.png')}
        />

        <Text>负责人：</Text>
        <Text>{detail.inspectionLeaderName}</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/user.png')}
        />

        <Text>巡检人：</Text>
        <Text>
          {detail.personListVo
            ?.map((item: {personName: string}) => item.personName)
            .join(', ')}
        </Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/inspection/qd.png')}
        />

        <Text>巡检区段：</Text>
        <Text>{detail.inspectionAddr}</Text>
      </View>
      <View style={styles.item}>
        <Text>巡检项：</Text>
        <View style={styles.item}>
          {detail.itemListVo?.map(
            (item: {id: number; inspectionItemName: string}) => (
              <CheckBox
                key={item.id}
                label={item.inspectionItemName}
                checked={true}
                onChange={() => {}}
              />
            ),
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFF',
    gap: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  img: {
    width: 20,
    height: 20,
  },
});
