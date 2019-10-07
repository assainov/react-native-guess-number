import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import fontStyles from '../constants/fontStyles';
import Colors from '../constants/colors';

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
  const firstGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(firstGuess);
  const [rounds, setRounds] = useState(1);
  const [pastGuesses, setPastGuesses] = useState([firstGuess]);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLowest = useRef(1);
  const currentHighest = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  });

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
      currentLowest.current = currentGuess + 1;
    }

    const nextGuess = generateRandomBetween(
      currentLowest.current,
      currentHighest.current,
      currentGuess,
    );

    setRounds(currentNumRounds => currentNumRounds + 1);
    setPastGuesses(currentGuesses => [nextGuess, ...currentGuesses]);
    return setCurrentGuess(nextGuess);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <View style={styles.panel}>
          <View style={styles.currentGuess}>
            <Text style={fontStyles.title}>Opponent&apos;s guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
          </View>
          <Card style={{ ...styles.buttonContainer, ...styles.iconButtonContainer }}>
            <CustomButton
              color={Colors.primary}
              title=""
              style={{ marignBottom: 10 }}
              onPress={() => nextGuessHandler('lower')}
              icon={<AntDesign name="minuscircle" size={16} color="white" />}
            />
            <CustomButton
              color={Colors.primary}
              title=""
              onPress={() => nextGuessHandler('greater')}
              icon={<AntDesign name="pluscircle" size={16} color="white" />}
            />
          </Card>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.pastGuessList}>
          {pastGuesses.map((guess, index) => (
            <View style={styles.pastGuessItem} key={guess}>
              <Text>Guess {pastGuesses.length - index}:</Text>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={fontStyles.title}>Opponent&apos;s guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton
          color={Colors.primary}
          title="Lower"
          onPress={() => nextGuessHandler('lower')}
          icon={<AntDesign name="minuscircle" size={16} color="white" />}
        />
        <CustomButton
          color={Colors.primary}
          title="Greater"
          onPress={() => nextGuessHandler('greater')}
          icon={<AntDesign name="pluscircle" size={16} color="white" />}
        />
      </Card>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.pastGuessList}>
        {pastGuesses.map((guess, index) => (
          <View style={styles.pastGuessItem} key={guess}>
            <Text>Guess {pastGuesses.length - index}:</Text>
            <Text>{guess}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  currentGuess: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height < 600 ? 7 : 20,
    minWidth: 300,
    width: '80%',
    maxWidth: '95%',
  },
  iconButtonContainer: {
    minWidth: 120,
    width: '50%',
  },
  scrollView: {
    width: '100%',
    marginTop: Dimensions.get('window').height < 600 ? 10 : 30,
  },
  pastGuessList: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  pastGuessItem: {
    height: Dimensions.get('window').height < 600 ? 25 : 50,
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    marginVertical: Dimensions.get('window').height < 600 ? 5 : 10,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

GameScreen.propTypes = {
  userChoice: PropTypes.number.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default GameScreen;
