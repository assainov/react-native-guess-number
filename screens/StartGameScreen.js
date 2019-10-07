import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import AlertModal from '../components/AlertModal';
import fontStyles from '../constants/fontStyles';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isInputConfirmed, setIsInputConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width < 400
      ? Dimensions.get('window').width / 2.9
      : Dimensions.get('window').width / 3.5,
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(
        Dimensions.get('window').width < 400
          ? Dimensions.get('window').width / 2.9
          : Dimensions.get('window').width / 3.5,
      );
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

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

  let buttons = (
    <>
      <View style={{ width: buttonWidth }}>
        <CustomButton
          title="Reset"
          onPress={resetInputHandler}
          color={Colors.accent}
          icon={<AntDesign name="closecircle" size={16} color="white" />}
        />
      </View>
      <View style={{ width: buttonWidth }}>
        <CustomButton
          title="Confirm"
          onPress={confirmInputHandler}
          color={Colors.primary}
          icon={<AntDesign name="checkcircle" size={16} color="white" />}
        />
      </View>
    </>
  );
  if (Platform.OS === 'ios') {
    buttons = (
      <>
        <View style={{ width: buttonWidth }}>
          <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
        </View>
        <View style={{ width: buttonWidth }}>
          <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
        </View>
      </>
    );
  }

  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={{ ...fontStyles.title, ...styles.title }}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text style={fontStyles.body}>Select a Number</Text>
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
              <View style={styles.buttonContainer}>{buttons}</View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <AlertModal
        visible={isInputConfirmed}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
        resetModal={resetInputHandler}
        supportedOrientations={['portrait', 'landscape', 'landscape-left']}
      >
        <View>
          <Text style={fontStyles.body}>Chosen number is</Text>
          <NumberContainer>{selectedNumber || 0}</NumberContainer>
          <CustomButton
            title="Start game"
            style={styles.startGameButton}
            color={Colors.primary}
            onPress={() => props.onStartGame(selectedNumber)}
            icon={<Ionicons name="md-flag" size={22} color="white" />}
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
    marginVertical: 20,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
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
