import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../userContext'; // Import the context
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Account({navigation}:any) {
  interface userInfo {
    name: string;
    photo: string;
    email: string;
  }
  const [data, setData] = useState<string | null>(null);
  const [userinfo,setUserinfo] = useState <userInfo|null>(null);
  const { user } = useContext<any>(UserContext);
  const {setUser} = useContext<any>(UserContext);

  // Fetch token on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await EncryptedStorage.getItem('user_token');
        const userdata = await EncryptedStorage.getItem('user_info');
  
        if (userdata) {
          setUserinfo(JSON.parse(userdata)); // Parse JSON string into an object
        }
        setData(storedData);
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await setUser('');
      navigation.navigate('Login');
      // Perform additional logout actions here
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleThemeChange = () => {
    // Placeholder for theme change functionality
    console.log('Theme change functionality coming soon!');
  };
  // console.log('user data is here : ', user);
  return (
    <View style={styles.container}>
      {userinfo ? (
        <View>
          <Text style={styles.title}>Account Information</Text>
          <View style={styles.profileSection}>
            {userinfo?.photo && (
              <Image source={{ uri: userinfo?.photo }} style={styles.image} />
            )}
            <Text style={styles.name}>{userinfo.name ?userinfo.name : "chiranjib" }</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={30} color="#9B7EBD" />
            <Text style={styles.text}>{userinfo ? userinfo.email : "default"}</Text>
          </View>
          <TouchableOpacity style={styles.row} onPress={handleThemeChange}>
            <Ionicons name="cloudy-night-outline" size={30} color="#9B7EBD" />
            <Text style={styles.text}>Change Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={30} color="#9B7EBD" />
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noUserText}>No user information available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    marginLeft: 10,
    fontSize: 28,
    fontFamily: 'cursive',
    color: '#9B7EBD',
  },
  title: {
    fontSize: 18,
    color: '#3B1E54',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'cursive',
    color: '#9B7EBD',
  },
  noUserText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});
