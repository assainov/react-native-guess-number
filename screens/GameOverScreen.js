import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import fontStyles from '../constants/fontStyles';

const GameOverScreen = props => {
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  // todo: change layout in landscape to have flex direction row
  const screenStyles = deviceHeight < 600 ? styles.screenLandscape : styles.screenPortrait;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={{ ...styles.screenBase, ...screenStyles }}>
        <View style={styles.titleImageContainer}>
          <Image
            /* eslint-disable-next-line */
            source={require('../assets/images/success.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={{ ...fontStyles.title, ...styles.title }}>The Game is Over!</Text>
          </View>
        </View>
        <View>
          <View style={styles.textContainer}>
            <Text style={{ ...fontStyles.body, ...styles.text }}>
              Opponent guessed the number <Text style={styles.highlight}>{props.userNumber}</Text>
            </Text>
            <Text style={{ ...fontStyles.body, ...styles.text }}>
              Number of guess rounds: <Text style={styles.highlight}>{props.guessRounds}</Text>
            </Text>
          </View>
          <CustomButton
            title="Play again"
            color={Colors.primary}
            onPress={props.onPlayAgain}
            icon={<AntDesign name="rightcircle" size={16} color="white" />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  screenBase: {
    flex: 1,
    alignItems: 'center',
  },
  screenPortrait: {
    justifyContent: 'center',
  },
  screenLandscape: {
    justifyContent: 'space-around',
  },
  textContainer: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
  titleImageContainer: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').height * 0.3,
    alignItems: 'center',
    borderRadius: 200,
    borderColor: 'black',
    borderWidth: Dimensions.get('window').width < 360 ? 2 : 3,
    overflow: 'hidden',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    fontSize: Dimensions.get('window').width < 400 ? 14 : 20,
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
  },
  highlight: {
    color: Colors.primary,
  },
  button: {
    textTransform: 'uppercase',
  },
});

GameOverScreen.propTypes = {
  userNumber: PropTypes.number.isRequired,
  guessRounds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

export default GameOverScreen;
