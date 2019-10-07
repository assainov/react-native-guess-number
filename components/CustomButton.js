import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/colors';

const Button = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableComponent onPress={props.onPress} activeOpacity={0.5}>
        <View style={{ ...styles.button, ...props.style, backgroundColor: props.color }}>
          <Text style={styles.text}>{props.title}</Text>
          <View style={styles.icon}>{props.icon}</View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 7,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'primary',
    fontSize: 18,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 5,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.object,
};

export default Button;
