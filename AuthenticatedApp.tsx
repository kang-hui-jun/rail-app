import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './pages/home';

const Stack = createNativeStackNavigator();

export const AuthenticatedApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
          }}
          name="首页"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
