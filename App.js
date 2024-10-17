import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Sobre from './componentes/Sobre';
import ListaContato from './componentes/ListaContato';
import AddContato from './componentes/AddContato';
import EditContato from './componentes/EditContato';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#000', 
          inactiveTintColor: '#ccc', 
        }}
      >
        <Tab.Screen
          name="Listagem"
          component={ListaContato}
          options={{
            tabBarLabel: 'Listagem',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/lista.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Adicionar"
          component={AddContato}
          options={{
            tabBarLabel: 'Adicionar',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/add.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
      <Tab.Screen
        name="Editar"
        component={EditContato}
        options={{
          tabBarLabel: 'Editar',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/upddel.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sobre"
        component={Sobre}
        options={{
          tabBarLabel: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/info.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;