import React, {useState, useContext, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  SafeAreaView,
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {UserContext} from '../userContext'; // Import the context
import Ionicons from 'react-native-vector-icons/Ionicons';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId:
    '132067794716-2vob4r53ugetj7d8on7rremqhkfta683.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

/**
 *
 * @param
 * @returns string
 */
export default function Login({navigation}: LoginProps) {
  const {setUser} = useContext<any>(UserContext);
  const { user } = useContext<any>(UserContext);
  const [data, setData] = useState<string | null>(null);

  const [state, setState] = useState({
    userInfo: null, // Initialize userInfo in the state
  });

   useEffect(() => {
      const fetchData = async () => {
        try {
          const storedData = await EncryptedStorage.getItem('user_token');
          setData(storedData);
        } catch (error) {
          console.error('Error fetching user token:', error);
        }
      };
      fetchData();
    }, []);

    useEffect( () => {
     if(data){
      navigation.navigate('Welcome')
     }else{
      console.log("login page")
     }
    },[data])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const token = response.data?.idToken;
        const Name = response.data?.user.name;
        const Photo = response.data?.user.photo;
        const Email = response.data?.user.email;
        const user_info = {
          name:response.data?.user.name,
          photo:response.data?.user.photo,
          email:response.data?.user.email,
        }
        await EncryptedStorage.setItem("user_token", JSON.stringify(token));
        await EncryptedStorage.setItem("user_info", JSON.stringify(user_info));
        
        setUser({name: Name, photo: Photo, email: Email});

        if (!navigation) {
          console.error('Navigation object not available');
          return;
        }

        navigation.navigate('Welcome');
      } else {
        console.log('Sign-in was cancelled by the user');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Sign-in is already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available or outdated');
            break;
          default:
            console.error('An unknown error occurred:', error);
        }
      } else {
        console.error('Non Google Sign-In related error:', error);
      }
    }
  };

  return (
    <View style={styles.mcontaineer}>
      <Ionicons
        name={'images-outline'}
        size={200}
        color={'#3B1E54'}
        style={styles.imgIcon}
      />
      <Text style={styles.Wtitle}>Welcome to Daily Driver !</Text>
      <Text style={styles.quote}>
        Transform your screen, one wallpaper at a time. Your daily dose of
        inspiration, delivered by Daily Driver.
      </Text>
      <View style={styles.GbuttonW}>
        <Ionicons
          name={'logo-google'}
          size={30}
          color={'#3B1E54'}
          style={styles.Gicon}
        />
        <Text onPress={() => signIn()} style={styles.Gbutton}>
          Sign in with Google
        </Text>
      </View>
      <View style={styles.dcon}>
        <Text style={styles.DTitle1}>Made with</Text>
        <Ionicons name={'heart'} size={16} color={'red'} />
        <Text style={styles.DTitle2}>by chiranjibi.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mcontaineer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gbutton: {
    fontSize: 16,
    color: '#3B1E54',
  },
  GbuttonW: {
    backgroundColor: '#D4BEE4',
    flexDirection: 'row',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 60,
    paddingRight: 60,
    borderWidth: 3,
    borderColor: '#9B7EBD',
  },
  Gicon: {
    marginRight: 10,
  },
  Wtitle: {
    fontSize: 28,
    marginBottom: 10,
    color: '#3B1E54',
    fontFamily: 'cursive',
  },
  quote: {
    fontSize: 14,
    marginBottom: 20,
    color: '#3B1E54',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  DTitle1: {
    fontSize: 14,
    marginRight: 5,
    color: '#1A1A1D'
  },
  DTitle2: {
    fontSize: 14,
    marginLeft: 5,
    color: '#1A1A1D'
  },
  dcon: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    marginBottom: 40,
  },
});
