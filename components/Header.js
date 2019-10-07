import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/colors';
import FontStyles from '../constants/fontStyles';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={{ ...FontStyles.title, ...styles.headerTitle }}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomColor: Platform.OS === 'android' ? 'transparent' : Colors.primary,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
