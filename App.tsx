/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleStartGame = () => {
    setIsStart(true);
  };

  const handleOpenHighestRecord = () => {
    console.log('Open Highest Record');
  };

  const color = [
    'lightseagreen',
    'firebrick',
    'lightpink',
    'maroon',
    'cornflowerblue',
    'burlywood',
    'darkslateblue',
    'lightcoral',
    'orange',
    'darksalmon',
  ];
  return (
    <View style={[styles.parentContainer]}>
      {/* Top Part */}
      <View style={styles.topPart}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 32,
              textAlign: 'center',
              backgroundColor: 'maroon',
              padding: 32,
            }}>
            Timer: {milliseconds} milliseconds
          </Text>
        </View>

        {/* Highest Record. Pressable */}

        <Pressable
          onPress={handleOpenHighestRecord}
          style={({pressed}) => [
            {backgroundColor: 'lightpink', padding: 32},
            pressed && styles.pressedItem,
          ]}
          android_ripple={{color: '#dddddd'}}>
          <Text
            style={{
              color: 'black',
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 32,
              textAlign: 'center',
            }}>
            Highest Record
          </Text>
        </Pressable>
      </View>

      {/* Middle Part */}
      {isStart && (
        <View style={styles.colorContainer}>
          <View
            style={{
              backgroundColor: randomColor(),
              height: 150,
              width: 150,
            }}></View>
          <View
            style={{
              backgroundColor: randomColor(),
              height: 150,
              width: 150,
            }}></View>
          <View
            style={{
              backgroundColor: randomColor(),
              height: 150,
              width: 150,
            }}></View>
          <View
            style={{
              backgroundColor: randomColor(),
              height: 150,
              width: 150,
            }}></View>
        </View>
      )}

      {/* Bottom Part */}
      <Pressable
        style={({pressed}) => [
          pressed && styles.pressedItem,
          styles.startButton,
        ]}
        android_ripple={{color: '#dddddd'}}
        onPress={handleStartGame}>
        <Text
          style={{
            color: 'black',
            fontSize: 32,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Start Game
        </Text>
      </Pressable>
    </View>
  );
}

const randomColorGenerator = (() => {
  const colors = [
    'lightseagreen',
    'firebrick',
    'lightpink',
    'maroon',
    'cornflowerblue',
    'burlywood',
    'darkslateblue',
    'lightcoral',
    'orange',
    'darksalmon',
  ];

  //randomize the array on every new execution
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(colors);
  let availableColors = [...colors];
  let currentIndex = 0;

  return () => {
    //if reached the end already, assign colors the beginning again
    if (currentIndex >= availableColors.length) {
      availableColors = [...colors];
      currentIndex = 0;
    }

    const selectedColor = availableColors[currentIndex];
    currentIndex++;
    return selectedColor;
  };
})();

// this will return a random unjiquej color.
const randomColor = () => {
  return randomColorGenerator();
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  topPart: {
    flex: 1,
  },
  startButton: {
    padding: 32,
    backgroundColor: 'lightblue',
  },

  pressedItem: {
    backgroundColor: '#C3B0A2',
  },

  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 130,
  },
});

export default App;
