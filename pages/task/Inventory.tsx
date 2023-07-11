import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import config from '../../utils/config';
import Signature from '../../components/Signature';

const list = [
  {
    name: '所有参与人员提前一小时到达车站',
    stepA: 2,
  },
  {
    name: '作业分工',
    stepB: 2,
  },
  {
    name: '开展安全交底',
    stepC: 2,
  },
  {
    name: '所有参与作业人员进行安全交底确认签字',
    stepD: 2,
  },
  {
    name: '安全交底信息及影像反馈',
    stepE: 2,
  },
  {
    name: '工器具及材料清点人清点材料工具并进行登记、签名',
    stepF: 2,
  },
  {
    name: '工器具及材料确认人复核清点材料工具并签名',
    stepG: 2,
  },
  {
    name: '工器具及材料清点信息及影像反馈',
    stepH: 2,
  },
  {
    name: '设置工器具及材料摆放点',
    stepI: 2,
  },
  {
    name: '确认作业过程中是否有新增发现的材料、工器具、遗留物等情况',
    stepJ: 2,
  },
  {
    name: '提前半小时进行出清',
    stepK: 2,
  },
  {
    name: '检查作业覆盖区域',
    stepL: 2,
  },
  {
    name: '位于撤离队伍后方进行最后检查把关',
    stepM: 2,
  },
  {
    name: '是否有原属于轨行区物件需出清到轨行区外，确保在清点清单中登记确认',
    stepN: 2,
  },
  {
    name: '工器具及材料清点人清点出清工具及材料、签名',
    stepO: 2,
  },
  {
    name: '工器具及材料清点人复核清点材料工器具出清情况并签名',
    stepP: 2,
  },
  {
    name: '工器具及材料清点信息及影像反馈',
    stepQ: 2,
  },
];

// @ts-ignore
export const Inventory = ({route, navigation}) => {
  const params = route.params;
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number>();

  const [form, setForm] = useState({})

  const [signList, setSignList] = useState([
    {
      name: '施工负责人签字',
      pic: 'leaderSignature',
      url: '924',
    },
    {
      name: '安全员签字',
      pic: 'safeSignature',
      url: '',
    },
    {
      name: '清点人签字',
      pic: 'countSignature',
      url: '',
    },
    {
      name: '出清负责人签字',
      pic: 'clearSignature',
      url: '',
    },
    {
      name: '确认人签字',
      pic: 'confirmSignature',
      url: '',
    },
  ]);

  const handlePic = (index: number) => {
    setActive(index);
    setVisible(true);
  };

  const getImg = (imgId: string) => {};

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.itemList}>
          {list.map(v => (
            <View style={styles.item}>
              <Text>{v.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.msg}>
          说明：管控措施由施工负责人、安全员、清点人、出清负责人、确认人配合进行监督落实，措施落实后于“完成情况”列打“√”，全部完
          成后于下方签字确认。
        </Text>

        <View style={styles.sign}>
          {signList.map((item, index) => (
            <View style={styles.li}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity
                style={styles.box}
                onPress={() => handlePic(index)}>
                {item.url && (
                  <Image
                    style={styles.img}
                    source={{
                      uri: `${config.apiUrl}/file/perview/${item.url}`,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btn}>确定</Text>
      </TouchableOpacity>

      <Signature
        visible={visible}
        close={() => setVisible(false)}
        getImg={getImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    paddingBottom: 80,
  },
  itemList: {
    gap: 10,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1.5,
    borderRadius: 8,
  },
  msg: {
    marginTop: 10,
    marginBottom: 10,
    color: '#9D9FB6',
  },
  sign: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  li: {
    gap: 5,
  },
  title: {
    color: '#21254D',
  },
  box: {
    height: 100,
    width: 180,
    borderColor: '#3B80F0',
    backgroundColor: 'rgba(14, 110, 254, 0.1)',
    border: 1,
    borderRadius: 8,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
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
    fontSize: 18,
  },
});
