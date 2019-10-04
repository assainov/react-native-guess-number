import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import AlertModal from '../components/AlertModal';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isInputConfirmed, setIsInputConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setIsInputConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue, 10);

    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'Number must be in the range between 1 and 99', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    setIsInputConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
              onSubmitEditing={() => confirmInputHandler()}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
              </View>
              <View style={styles.button}>
                <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
              </View>
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
      <AlertModal
        visible={isInputConfirmed}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
        resetModal={resetInputHandler}
      >
        <View>
          <Text>Chosen number is</Text>
          <NumberContainer>{selectedNumber || 0}</NumberContainer>
          <Button
            title="Start game"
            style={styles.startGameButton}
            color={Colors.primary}
            onPress={() => props.onStartGame(selectedNumber)}
          />
        </View>
      </AlertModal>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  chosenNumberCard: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  startGameButton: {
    textTransform: 'uppercase',
  },
});

StartGameScreen.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default StartGameScreen;
