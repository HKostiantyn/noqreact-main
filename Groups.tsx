import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Group = () => {
  const handleEditGroup = (groupId) => {
    // Implement navigation to edit group screen
    console.log('Edit group:', groupId);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <View>
        <Text>Welcome to NoqNoq</Text>
        {/* Logout button */}
        <TouchableOpacity onPress={() => console.log('Logout')}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <Text>Edit the details on your group</Text>

        {/* Add Group Form */}
        <View>
          <TextInput placeholder="Enter a name for the group" />
          <TextInput placeholder="Enter a description (optional)" />

          <TouchableOpacity onPress={() => console.log('Add group')}>
            <Text>Add a group</Text>
          </TouchableOpacity>
        </View>

        {/* Render Groups */}
          <View>
            <Text>Tes</Text>
            <Text>Test</Text>

            {/* Edit group button */}
            <TouchableOpacity onPress={() => handleEditGroup(1)}>
              <Text>Edit Group</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
};

export default Group;
