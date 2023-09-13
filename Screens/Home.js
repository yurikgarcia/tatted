import React from 'react';
import { Button } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',      // Center items vertically
    justifyContent: 'center',  // Center items horizontally
  },
  contentContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-end', // Push items to the right
    // paddingHorizontal: 20,
    width: '90%', // Make the row take up the full width
  },
  bell: {
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end', // Push items to the right
    paddingHorizontal: 20,
    width: '10%', // Make the row take up the full width
  },
});

function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SafeAreaView >

        <View style={styles.contentContainer} >

            <Text>Welcome Home Bitch!</Text>

            <View styel={styles.bell} >
              <Button icon="bell-outline" />
              </View>

        </View>



      </SafeAreaView>
    </View>
  );
}

export default Home;
