import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

/* returns int between [min, max) */
const generateRandomBetween = (min, max, exclude) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  const randomNum = Math.floor(Math.random() * (maxInt - minInt)) + minInt;

  if (randomNum === exclude) {
    return generateRandomBetween(minInt, maxInt, exclude);
  }

  return randomNum;
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLowest = useRef(1);
  const currentHighest = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && props.userChoice > currentGuess) ||
      (direction === 'greater' && props.userChoice < currentGuess)
    ) {
      return Alert.alert('Wrong direction!', 'Seems like you pressed the wrong button.', [
        { text: 'Try again', style: 'default' },
      ]);
    }

    if (direction === 'lower') {
      currentHighest.current = currentGuess;
    } else {
      currentLowest.current = currentGuess;
    }

    const nextGuess = generateRandomBetween(
      currentLowest.current,
      currentHighest.current,
      currentGuess,
    );

    setRounds(currentNumRounds => currentNumRounds + 1);
    return setCurrentGuess(nextGuess);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent&apos;s guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
        <Button title="Greater" onPress={() => nextGuessHandler('greater')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

GameScreen.propTypes = {
  userChoice: PropTypes.number.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default GameScreen;
