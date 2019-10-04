import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Opponent guessed the number {props.userNumber}</Text>
      <Text>Number of guess rounds: {props.guessRounds}</Text>
      <Button title="Play again" color={Colors.primary} onPress={props.onPlayAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

GameOverScreen.propTypes = {
  userNumber: PropTypes.number.isRequired,
  guessRounds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

export default GameOverScreen;
