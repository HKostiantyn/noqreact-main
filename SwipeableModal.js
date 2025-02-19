import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

// @ts-ignore
import Modal from "react-native-modal";
// import DefaultModalContent from '../utils/DefaultModalContent';

const RenderSwipeModal = ({ isVisible, setIsVisible, children }) => {
  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      useNativeDriverForBackdrop
      style={{
        margin: 0,
      }}

      onBackButtonPress={()=> null}
     
    >
      <View style={styles.content}>
        <Pressable
          style={{
            position: "absolute",
            right: 16,
            top: 22,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingVertical: 8,
            width:200,
            zIndex:1000
          }}
          onPress={() => setIsVisible(false)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            Close
          </Text>
        </Pressable>

        <View style={{flex:1}}>
            {children}
        </View>
      </View>
    </Modal>
  );
};

export default RenderSwipeModal;
const styles = StyleSheet.create({
  content: {
    backgroundColor: "#81d3cf",
    flex: 1,
    padding: 22,

    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
