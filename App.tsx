import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MyReactNativeComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#81d3cf', font: 'Helvetica'  }}>
      <View style={styles.homepageContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>AI for Whatsapp Groups</Text>
          <Text style={styles.subtext}>
            Let AI do all the work for your group
          </Text>
          
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.Button}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.Button}>Log in</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homepageContainer: {
    textAlign: 'center',
    backgroundColor: '#81d3cf',
    position: 'relative',
  },
  navbar: {
    backgroundColor: "#25d366",
    padding: 10,
    textAlign: "center",
    alignItems: 'center',
  },
  logo: {
    height: 48,
    width: 48,
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#81d3cf',
  },
  heading: {
    color: '#333',
    fontSize: 80,
  },
  subtext: {
    color: '#666',
    fontSize: 20,
  },
  Button: {
    backgroundColor: '#075e54',
    color: '#fff', // Note: React Native doesn't use color for text, you would set this in the Text component
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 0, // React Native uses `borderWidth` instead of `border`
    borderColor: 'transparent', // React Native uses `borderColor` instead of `border`
  },
});

export default MyReactNativeComponent;
