// Import necessary libraries
import PushNotification from 'react-native-push-notification';
import React, { useEffect } from 'react';
import { Button, View, Text, Alert } from 'react-native';
// import { baseURL as BASE_URL } from "./app.json";


// Use the Postman mock server URL
const BASE_URL = 'https://e24a2f0b-e3bd-458b-ae77-ebbc2874d38e.mock.pstmn.io';
// Function to handle API response
const handleApiResponse = (response) => {
  const { success, unreadMessagesCount } = response;

  if (success && unreadMessagesCount > 0) {
    // Show a red dot by setting the badge count to 1
    PushNotification.setApplicationIconBadgeNumber(1);
    console.log('Badge updated to show red dot');
  } else {
    // Hide the red dot by resetting the badge count to 0
    PushNotification.setApplicationIconBadgeNumber(0);
    console.log('Badge cleared');
  }
};

const fetchUnreadMessages = async (deviceToken) => {
  try {
    const response = await fetch(`${BASE_URL}/check-unread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device_token: deviceToken }),
    });

    // Log the raw response status and headers
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json();
    console.log('API Response Data:', data); // Log the parsed JSON data

    handleApiResponse(data); // Handle the API response
  } catch (error) {
    console.error('Error fetching unread messages:', error.message);
    Alert.alert('Error', 'Failed to fetch unread messages.');
  }
};

// Main App Component
const App = () => {
  useEffect(() => {
    // Simulate fetching unread messages when the app starts
    const deviceToken = 'your-device-token'; // Replace with the actual device token
    fetchUnreadMessages(deviceToken);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Badge Example</Text>
      <Button
        title="Simulate API Call"
        onPress={() => {
          const deviceToken = 'your-device-token'; // Replace with the actual device token
          fetchUnreadMessages(deviceToken);
        }}
      />
    </View>
  );
};

export default App;