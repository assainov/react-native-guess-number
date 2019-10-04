import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.number}>83</Text>
      <View style={styles.button}>
        <Button title="Go back" />
      </View>
      <View style={styles.button}>
        <Button title="Start game" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
  number: {},
  button: {},
});
