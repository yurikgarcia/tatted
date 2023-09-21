import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

function CustomBottomDrawer({ isVisible, onClose, onSelect }) {
  const options = ['Distance', 'Star Rating']; // Add more options as needed
  const [selectedOption, setSelectedOption] = useState(''); 

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['down']} // Enable swipe-down to close the drawer
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={{
        justifyContent: 'flex-end', // Change this to 'flex-end'
        margin: 0, // Change this to 0
      }}
    >
      <View
        style={{
          flex: 1,
          maxHeight: 200, // Set the maximum height for the modal
          backgroundColor: 'white', // Background color of the view
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: 'lightgray', // Background color of the header
              paddingVertical: 10,
              paddingLeft: 16,
              flexDirection: 'row',
              justifyContent: 'space-between', // Align items to the right
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 170 }}>SORT</Text>
          </View>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setSelectedOption(option.toLowerCase()); // Set the selected option
                onSelect(option.toLowerCase());
                onClose();
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between', // Align items to the right
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontSize: 16 }}>{option}</Text>
                {selectedOption === option.toLowerCase() && (
                  <Icon name="check" size={16} color="green" /> // Display a checkmark for the selected option
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [sortBy, setSortBy] = useState(''); // Selected sorting criteria

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSortByChange = (value) => {
    // Handle the sort by change here, e.g., trigger sorting logic
    setSortBy(value);
    setDrawerVisible(false); // Close the drawer
  };

  return (
    <View>
      {/* Create a container view to center the text vertically */}
      <View
        style={{
          height: 40, // Set the height of the container
          justifyContent: 'center', // Center vertically
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            fontSize: 16,
            marginTop: 16,
          }}
          inputStyle={{
            textAlign: 'left', // Left-justify the text
            marginLeft: 10, // Add some left margin for better alignment
          }}
        />
      </View>
      {/* View for the header */}

      {/* Chip for opening the sorting options drawer */}
      <TouchableOpacity onPress={() => setDrawerVisible(true)}>
        <Chip
          mode="outlined"
          style={{
            marginTop: 20,
            marginLeft: 5,
            width: 120, // Adjust the width as needed
            borderRadius: 20, // Make corners rounder
          }}
        >
          Sort By: {sortBy || 'Select'}
        </Chip>
      </TouchableOpacity>
      {/* Custom bottom drawer for sorting options */}
      <CustomBottomDrawer
        isVisible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSelect={(option) => handleSortByChange(option)}
      />
      {/* Your other components */}
    </View>
  );
}

export default Search;
