import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './pages/home';
import {Task} from './pages/task';
import {Inspection} from './pages/inspection';
import {Warehouse} from './pages/warehouse';
import {Emergency} from './pages/emergency';
import {Detail as InspectionDetail} from './pages/inspection/Detail';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AddInspection} from './pages/inspection/AddInspection';
import {Detail as TaskDetail} from './pages/task/Detail';
import AddTask from './pages/task/AddTask';
import GroupDetail from './pages/task/component/GroupDetail';
import {Login} from './pages/login';
import {navigationRef} from './utils/navigation';
import Notice from './pages/notice';
import Set from './pages/set';
import Label from './pages/set/Label';
import Temperature from './pages/set/Temperature';
import NoticeDetail from './pages/notice/NoticeDetail';
import MyTask from './pages/my-task';
import AddEmergency from './pages/emergency/AddEmergency';
import AddDisease from './pages/inspection/AddDisease';
import {Inventory as I} from './pages/task/Inventory';
import Distribute from './pages/warehouse/Distribute';
import Return from './pages/warehouse/Return';
import Scrap from './pages/warehouse/Scrap';
import AddDistribute from './pages/warehouse/Distribute/AddDistribute';
import {Execute} from './pages/task/Execute';
import AddReturn from './pages/warehouse/Return/AddReturn';
import AddInventory from './pages/warehouse/Inventory/AddInventory';
import Inventory from './pages/warehouse/Inventory';
import AddScrap from './pages/warehouse/Scrap/AddScrap';

const Stack = createNativeStackNavigator();

export const AuthenticatedApp = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="登录"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="首页"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
          }}
          name="我的工作"
          component={MyTask}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('创建巡检');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/inspection/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="巡检管理"
          component={Inspection}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="创建巡检"
          component={AddInspection}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="巡检详情"
          component={InspectionDetail}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('创建作业');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/task/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="作业管理"
          component={Task}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="病害上报"
          component={AddDisease}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="创建作业"
          component={AddTask}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="执行计划"
          component={Execute}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="作业详情"
          component={TaskDetail}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="工场清单"
          component={I}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="小组详情"
          component={GroupDetail}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="库存管理"
          component={Warehouse}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('新增分发');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/warehouse/fenfa/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="分发管理"
          component={Distribute}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="新增分发"
          component={AddDistribute}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('新增退换');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/warehouse/tuihuan/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="退换管理"
          component={Return}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="新增退换"
          component={AddReturn}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('新增报废');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/warehouse/baofei/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="报废管理"
          component={Scrap}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="新增报废"
          component={AddScrap}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('新增盘点');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/warehouse/pandian/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="物资盘点"
          component={Inventory}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="新增盘点"
          component={AddInventory}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('添加应急抢修');
                }}>
                <Image
                  style={styles.img}
                  source={require('./assets/emergency/add.png')}
                />
              </TouchableOpacity>
            ),
          })}
          name="应急抢修"
          component={Emergency}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="添加应急抢修"
          component={AddEmergency}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="事务通知"
          component={Notice}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="通知详情"
          component={NoticeDetail}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="设置"
          component={Set}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="标签监测"
          component={Label}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="体温枪设置"
          component={Temperature}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
});
