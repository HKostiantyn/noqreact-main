/**
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  AppRegistry,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { name as appName, baseURL as BASE_URL } from "./app.json";
import { Image } from "react-native";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import ContactsList from "./Contacts";
import Contacts, { addContact, updateContact } from "react-native-contacts";
import axios from "axios";

import {
  getFormatContact,
  updateFormatContact,
  getParameterByName,
  getStorData,
  removeValue,
  storeData,
} from "./utils";
import DeviceInfo from "react-native-device-info";
import RenderSwipeModal from "./SwipeableModal";
import UpdateContacts from "./UpdateContact";
import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: BASE_URL,
});

const Index = () => {
  const [contactsData, setContactsData] = useState([]);
  const [isSkipContact, setIsSkipContact] = useState(false);
  const [isSkipContactStart, setIsSkipContactStart] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isContactUpdate, setIsContactUpdate] = useState(false);
  const [showContactsSync, setShowContactsSync] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const webViewRef = useRef();
  const [mainUrl, setMainUrl] = useState(BASE_URL);
  useEffect(() => {
    checkIsSkipFromStore();
    getDeviceTokenAysnc();
  }, []);

  const [deviceToken, setDeviceToken] = useState(null);

  const getDeviceTokenAysnc = async () => {
    try {
      let token = await DeviceInfo.getUniqueId();
      setDeviceToken(token);
    } catch (error) {}
  };

  const checkIsSkipFromStore = async () => {
    try {
      setIsLoader(true);
      const response = await getStorData("intialContactScreen");
      if (response) {
        setIsSkipContactStart(false);
        setIsLoader(false);
        setIsSkipContact(response);
      } else {
        setIsSkipContactStart(true);
        setIsLoader(false);
      }
    } catch {
      setIsSkipContactStart(true);
      setIsLoader(false);
    }
  };

  const hanldeSkip = async () => {
    try {
      const response = await storeData(
        "intialContactScreen",
        JSON.stringify(true)
      );
      setIsSkipContact(true);
    } catch {}
  };
  const handleSubmit = () => {
    hanldeSkip();
  };

  /********************************* PERMISSION CONTACTS ******************** P******************* P*******************/
  const openInfoAlert = () => {
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
        checkDeviceIdIsExits();
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

  const handleUpdate = async (data) => {
    if (data && data.length > 0) {
      let modifiData = data.map((x, i) => {
        return {
          ...x,
        };
      });
      let deviceId = await DeviceInfo.getUniqueId();
      client
        .post(`/whatsapp/contact_update/${deviceId}`, { data: modifiData })
        .then((res) => {
          setIsContactUpdate(false);
          if (res?.data?.status == 200) {
            hanldeSkip();
            setMainUrl(
              `${BASE_URL}/contacts?timestamp=${new Date().getTime()}`
            );
            return Alert.alert("Success!", "Contact updated successfully.");
          }
          return Alert.alert("Error!", res?.data?.message);
        })
        .catch((error) => {
          setIsContactUpdate(false);
          console.log("error", error);
        });
    } else {
      setIsContactUpdate(false);
      Alert.alert("Error!", "Not able to fetch contacts");
    }
  };

  const checkDeviceIdIsExits = async () => {
    try {
      setIsContactUpdate(true);
      let deviceId = await DeviceInfo.getUniqueId();
      client
        .get(`/whatsapp/device_verify/${deviceId}`)
        .then((res) => {
          console.log(res?.data, "res?.datares?.datares?.data");
          if (res?.data?.status == 200) {
            if (res?.data?.success === true) {
              loadContacts();
            }
          } else {
            setIsContactUpdate(false);
            setIsVisible(true);
          }
          return false;
        })
        .catch((error) => {
          setIsContactUpdate(false);
          return false;
        });
    } catch (error) {
      setIsContactUpdate(false);
      return false;
    }
  };

  const loadContacts = async () => {
    try {
      Contacts.getAll()
        .then((contacts) => {
          const data = updateFormatContact(contacts, deviceToken);
          handleUpdate(data);
        })
        .catch((e) => {});
    } catch (error) {}
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
      checkDeviceIdIsExits();
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

  /********************************* PERMISSION CONTACTS ******************** P******************* P*******************/

  const renderLoader = (msg) => {
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
        <Text style={{ color: "black" }}>{msg || "Loading...."}</Text>
      </View>
    );
  };
  if (isLoader) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isSkipContact && isSkipContactStart && (
        <ContactsList
          save={handleSubmit}
          contactsData={contactsData}
          deviceToken={deviceToken}
          setDeviceToken={setDeviceToken}
          isSkipContact={isSkipContact}
          setContactsData={setContactsData}
          hanldeSkip={hanldeSkip}
        />
      )}
      {isSkipContact && (
        <WebView
          onLoad={() => {
            // setIsLoader(true);
          }}
          onLoadStart={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.log('Initial URL:', nativeEvent.url);
            if (nativeEvent.url.includes("contacts")) {
              console.log("ok")
              setShowContactsSync(true);
            }
            if (showContactsSync && !nativeEvent.url.includes("contacts")) {
              setShowContactsSync(false);
            }
          }}  
          startInLoadingState={true}
          renderLoading={() => {
            return renderLoader();
          }}
          onMessage={(event) =>
            console.log(
              event.nativeEvent.data,
              "onMessageonMessageonMessageonMessage"
            )
          }
          ref={webViewRef}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          androidHardwareAccelerationDisabled={true}
          source={{ uri: mainUrl }}
        />
      )}

      {showContactsSync  && (
        <TouchableOpacity
          onPress={() => openInfoAlert(true)}
          title="Sync Contacts"
          color={"#25d366"}
          style={{
            position: "absolute",
            bottom: Dimensions.get("window").height / 25,
            width: Dimensions.get("window").width - 24,
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginHorizontal: 12,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#25d366",
            borderWidth: 1,
            // backgroundColor:'#25d366'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#25d366",
              fontWeight: "600",
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      )}
      {isContactUpdate && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {renderLoader("Updateting Contacts")}
        </View>
      )}
      <RenderSwipeModal setIsVisible={setIsVisible} isVisible={isVisible}>
        <UpdateContacts
          save={handleSubmit}
          contactsData={contactsData}
          deviceToken={deviceToken}
          setIsVisible={setIsVisible}
          setDeviceToken={setDeviceToken}
          isSkipContact={isSkipContact}
          setContactsData={setContactsData}
          hanldeSkip={hanldeSkip}
        />
      </RenderSwipeModal>
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => Index);
