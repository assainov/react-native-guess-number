import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const NumberContainer = props => (
  <View style={{ ...props.style, ...styles.container }}>
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.accent,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  number: {
    color: Colors.primary,
    fontSize: 32,
  },
});

NumberContainer.propTypes = {
  children: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default NumberContainer;
