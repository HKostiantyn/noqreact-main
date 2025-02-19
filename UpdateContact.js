/**
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  AppRegistry,
  Platform,
  View,
  Text,
  PermissionsAndroid,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import Contacts, { addContact, updateContact } from "react-native-contacts";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { validateEmail } from "./utils";
import { baseURL as BASE_URL } from "./app.json"
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: BASE_URL,
});
const UpdateContacts = ({
  hanldeSkip,
  contactsData,
  setDeviceToken,
  deviceToken,
  setIsVisible,
  setContactsData,
  save,
  isSkipContact,
}) => {
  const [isPermission, setPermission] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    requestPermissionsAsync();
  }, [deviceToken]);

  useEffect(() => {}, [contactsData]);

  const handleSubmit = (data) => {
    Keyboard.dismiss();
    if (!username) {
      return Alert.alert("Error!", "Please enter email address");
    }
    if (!validateEmail(username)) {
      return Alert.alert("Error!", "Please enter valid email address");
    }
    setIsLoader(true);
    if (data && data.length > 0) {
      let modifiData = data.map((x, i) => {
        return {
          ...x,
          user_email: username,
        };
      });

      client
        .post("/whatsapp/contacts/", modifiData)
        .then((res) => {
          console.log(res, "ndknfndmnmdnf");
          save(res);
          setIsVisible(false);
          Alert.alert("Success!", "Contact saved successfully.");

          setIsLoader(false);
          setUsername(null);

          console.log("Contact Success", res.data);
        })
        .catch((error) => {
          setIsLoader(false);
          console.log("error", error);
        });
    } else {
      setIsLoader(false);
      Alert.alert("Error!", "Not able to fetch contacts");
    }
  };

  const onRequestPermissions = async () => {
    const permissionContact = Platform.select({
      android: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ios: PERMISSIONS.IOS.CONTACTS,
    });

    const res = await requestMultiple([permissionContact]);
    if (
      res[permissionContact] === RESULTS.GRANTED ||
      res[permissionContact] == "authorized" ||
      res[permissionContact] === "limited"
    ) {
      loadContacts();
      setPermission(res[permissionContact]);
    } else if (res[permissionContact] === RESULTS.DENIED) {
      return hanldeSkip();
    } else if (
      res[permissionContact] === "undetermined" ||
      res[permissionContact] === RESULTS.UNAVAILABLE
    ) {
      return openBlockAlert("Conatct");
    } else if (res[permissionContact] == RESULTS.BLOCKED) {
      openBlockAlert("Conatct");
    }
  };

  const loadContacts = () => {
    setIsLoader(true);
    try {
      Contacts.getAll()
        .then((contacts) => {
          setIsLoader(false);
          const data = getFormatContact(contacts);
          setContactsData(data);
        })
        .catch((e) => {
          console.log(e);
          setIsLoader(false);
        });
    } catch (error) {
      setIsLoader(false);
      console.log(error, "loadContacts");
    }
  };

  const openInfoAlert = (item) => {
    try {
      Alert.alert(
        "Contacts",
        `Noqnoq will need access to contacts for sending messages.
`,
        [
          { text: "I will allow later", onPress: () => hanldeSkip() },
          { text: "Allow", onPress: () => requestPermissionsAsync() },
        ]
      );
    } catch (error) {
      alert("error occured");
    }
  };
  const openBlockAlert = (item) => {
    try {
      Alert.alert(
        "Contacts",
        `Noqnoq will need access to contacts for sending messages.
`,
        [
          { text: "I will allow later", onPress: () => hanldeSkip() },
          { text: "Allow", onPress: () => openSettings() },
        ]
      );
    } catch (error) {
      alert("error occured");
    }
  };

  const removeSpaceHyphenBracket = (str) => {
    if (str) {
      return str.replace(/[- )(]/g, "");
    }
    return "";
  };

  const getFormatContact = (data) => {
    try {
      if (data && data.length > 0) {
        const filters = data.filter(
          (x, i) => x?.phoneNumbers?.[0]?.number || x?.phoneNumbers?.[1]?.number
        );
        const syncContact = filters.map((x) => {
          return {
            phone:
              x?.phoneNumbers?.[0]?.number ||
              x?.phoneNumbers?.[1]?.number ||
              "",
            contact_name: `${x?.displayName || "No Name"}`,
            device_id: deviceToken,
            user_email: null,
          };
        });
        return syncContact;
      } else {
      }
    } catch (error) {
      console.log(error, "ERRROOROOROROR:");
    }
  };
  const requestPermissionsAsync = async () => {
    try {
      const permissionContact = Platform.select({
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
        ios: PERMISSIONS.IOS.CONTACTS,
      });

      const res = await checkMultiple([permissionContact]);
      if (
        res[permissionContact] === RESULTS.GRANTED ||
        res[permissionContact] == "authorized" ||
        res[permissionContact] === "limited"
      ) {
        loadContacts();
        setPermission(true);
      } else if (
        res[permissionContact] === RESULTS.DENIED ||
        res[permissionContact] === "undetermined" ||
        res[permissionContact] === RESULTS.UNAVAILABLE
      ) {
        return onRequestPermissions();
      } else if (res[permissionContact] === RESULTS.BLOCKED) {
        openBlockAlert("Conatct");
      }
    } catch (error) {}
  };

  const renderLoader = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"blue"} />
        <Text style={{ color: "black" }}>Submitting....</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Display error message if there is one */}
      <View style={styles.back}>
        <View style={{}}>
          <View
            style={{
              paddingVertical: 16,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
              Add Contact Email
            </Text>
          </View>
          <TextInput
            placeholder="Enter email address"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            keyboardType="email-address"
            style={{
              borderColor: "white",
              borderWidth: 1,
              color: "white",
              padding: 10,
              borderRadius: 12,
            }}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit(contactsData)}
        style={{
          backgroundColor: "#25d366",
          marginTop: 100,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Send
        </Text>
      </TouchableOpacity>
      {isLoader && renderLoader()}
    </View>
  );
};

export default UpdateContacts;

const styles = StyleSheet.create({
  back: {
    // padding: "150px 50px 50px 50px",
    // backgroundColor: "rgba(8, 19, 33, 0.6)",
    marginTop: "25%",
  },
  homepageContainer: {
    textAlign: "center",
    // backgroundColor: "#81d3cf",
    position: "relative",
  },
  navbar: {
    backgroundColor: "#25d366",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
  },
  logo: {
    height: 48,
    width: 48,
  },
  textContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#81d3cf",
  },
  heading: {
    color: "#333",
    fontSize: 80,
  },
  subtext: {
    color: "#666",
    fontSize: 20,
  },
  Button: {
    backgroundColor: "#075e54",
    color: "#fff", // Note: React Native doesn't use color for text, you would set this in the Text component
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 0, // React Native uses `borderWidth` instead of `border`
    borderColor: "transparent", // React Native uses `borderColor` instead of `border`
  },
});
