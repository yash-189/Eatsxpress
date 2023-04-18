
import { NativeWindStyleSheet } from "nativewind";

import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';



import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'firebase/auth';


import { setSignIn } from './features/authSlice';

import AuthStack from './stacks/AuthStack';
import UserStack from './stacks/UserStack';
import Loader from './components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


NativeWindStyleSheet.setOutput({
  default: "native",
});






const Main = () => {



  const auth = getAuth()
  const [user, setuser] = useState()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)





  useEffect(() => {



    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      console.log('user,effect', user);
      if (user) {
        console.log(user, 'ussrr');
        const us = {
          email: user.email,
          name: '',
          isLoggedIn: true
        }
        setuser(true)
        dispatch(setSignIn(us))


        // setuser(user);
      } else {
        // User is signed out
        setuser(false);
      }
      setloading(false)
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);


  


  if (loading) return <Loader />



  return (

    user ? <UserStack /> : <AuthStack />
  );
}

export default Main