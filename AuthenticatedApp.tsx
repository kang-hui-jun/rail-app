import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './pages/home';
import {Task} from './pages/task';
import {Inspection} from './pages/inspection';
import {Warehouse} from './pages/warehouse';
import {Emergency} from './pages/emergency';
import {Detail as InspectionDetail} from './pages/inspection/Detail';
import {Text, TouchableOpacity} from 'react-native';
import {AddInspection} from './pages/inspection/AddInspection';
import {Detail as TaskDetail} from './pages/task/Detail';
import AddTask from './pages/task/AddTask';

const Stack = createNativeStackNavigator();

export const AuthenticatedApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="首页"
          component={Home}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('创建巡检');
                }}>
                <Text style={{fontSize: 16}}>新建巡检</Text>
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
                <Text style={{fontSize: 16}}>新建作业</Text>
              </TouchableOpacity>
            ),
          })}
          name="作业管理"
          component={Task}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="创建作业"
          component={AddTask}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="作业详情"
          component={TaskDetail}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="库存管理"
          component={Warehouse}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="应急抢修"
          component={Emergency}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
