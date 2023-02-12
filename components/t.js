import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeIcon, MagnifyingGlassIcon, BellIcon, ShoppingBagIcon, HeartIcon } from "react-native-heroicons/outline";
import { Text, View, TouchableOpacity } from 'react-native';
import Home from '../screens/Home';
import RestaurantScreen from '../screens/RestaurantScreen';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../features/basketSlice';
import CartScreen from '../screens/CartScreen';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import SearchScreen from '../screens/SearchScreen';
import Restscreen from '../screens/Restscreen';
import FavScreen from '../screens/FavScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { selectFavItems } from '../features/favSlice';
const Tab = createBottomTabNavigator();


const CustomButtont = ({ children, OnPress }) => {
  <TouchableOpacity style={{ top: 30, justifyContent: 'center', alignItems: 'center' }}
    onPress={OnPress}>
    <View
      style={{ width: 70, height: 70, backgroundColor: 'blue' }}>
      {children}

    </View>

  </TouchableOpacity>

}



const TabBar = () => {

  const navigation = useNavigation()
  useLayoutEffect(() => {

    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const Items = useSelector(selectBasketItems)
  const favItems = useSelector(selectFavItems)
  console.log(Items, 'tabbar');

  return (
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FB6E3B',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute', backgroundColor: 'white', bottom: 0,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          height: 70,
          elevation: 0,
          // ...styles.shadow


        },
        tabBarBadgeStyle: {
          color: 'white',
          top: 20,
          
          backgroundColor: '#FB5F26'
        }
        // tabBarItemStyle:{backgroundColor:'blue'},


        // tabBarBackground: () => (
        //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        // ),


      }}


    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon name="home" color={color} size={focused ? 35 : 30} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Your favourite"
        component={FavScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ focused, color, size }) => (
            <HeartIcon name="fav" color={color} size={focused ? 35 : 30} />
          ),
          headerShown:false,
          
          tabBarBadge: favItems.length,



        }}
      />
      <Tab.Screen
        name="Searct"
        component={CartScreen}
        options={{
          tabBarLabel: 'search',
          // headerShown:false,
          


          tabBarButton: (props) => <TouchableOpacity style={{ top: 80, justifyContent: 'center', alignItems: 'center' }}
            {...props}>
            <View
              style={{
                width: 65, height: 65, backgroundColor: '#FB6E3B', top: -32, justifyContent: 'center', alignItems: 'center', borderRadius: 50, padding: 10, shadowColor: '#FB6E3B',
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 16
              }}>
              <MagnifyingGlassIcon name="search" color={'white'} size={32} />

            </View>

          </TouchableOpacity>
          
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate("Search")
          },
        })}

      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'notification',
          tabBarIcon: ({ focused, color, size }) => (
            <BellIcon name="notification" color={color} size={focused ? 35 : 30} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{

          tabBarLabel: 'CartScreen',
          
          tabBarIcon: ({ focused, color, size }) => (
            <ShoppingBagIcon name="cart" color={color} size={focused ? 35 : 30} />
          ),
          tabBarBadge: Items.length,
          tabBarStyle: { display: "none" },
          
          // headerShown:true


        }}

      />

    </Tab.Navigator>
  );
}

export default TabBar