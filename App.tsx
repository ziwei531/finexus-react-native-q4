/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
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
  Alert,
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
  const [startModalIsVisible, setStartModalIsVisible] =
    useState<boolean>(false);
  const [color, setColor] = useState<string>(randomColor());
  const [arrColors, setArrColors] = useState<string[]>([]);
  const [highestRecord, setHighestRecord] = useState<number>(0);

  // this is where the color changing logic is
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isStart) {
      intervalId = setInterval(() => {
        setArrColors([
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
        ]);
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isStart]);

  const handleModalChoice = (status: string) => {
    if (status === 'Start') {
      setIsStart(true);
      setStartModalIsVisible(false);
    } else {
      setIsStart(false);
      setStartModalIsVisible(false);
    }
  };
  const handleStartModal = () => {
    //if it is in the start status, this disables the button.
    if (isStart) {
      return;
    }
    setColor(randomColor());
    setStartModalIsVisible(true);
  };

  // bring up the highest record modal
  const handleOpenHighestRecord = () => {
    //if it is in the start status, this disables the button.
    if (isStart) {
      return;
    }
  };

  // alert result
  const alertResult = (chosenColor: string) => {
    //for now, set it to false as temporary measure.
    setIsStart(false);
    if (chosenColor === color) {
      Alert.alert(
        'Congratulations!',
        `You had used ${milliseconds} to click ${chosenColor} color.`,
        [{text: 'OK'}],
      );
    } else {
      Alert.alert('Sorry', `This is ${chosenColor}`, [{text: 'OK'}]);
    }
  };

  return (
    <View style={[styles.parentContainer]}>
      {/* Top Part */}
      <View style={styles.topPart}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
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
            isStart && styles.gameStartedStyle,
          ]}
          android_ripple={{color: '#dddddd'}}>
          <Text
            style={{
              color: 'black',
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
            }}>
            Highest Record
          </Text>
        </Pressable>
      </View>

      {/* Start Game Modal */}
      <Modal
        transparent={true}
        visible={startModalIsVisible}
        animationType="slide">
        <View style={[styles.modalContainer]}>
          <View style={styles.modalView}>
            <View style={{paddingBottom: 10}}>
              <Text style={{fontSize: 24, color: 'black'}}>Start Playing!</Text>
            </View>
            <View style={{}}>
              <Text style={{fontSize: 21, color: 'black'}}>
                Tap the{'    '}
                <View style={{backgroundColor: color, padding: 8}}>
                  <Text style={{fontSize: 21, color: 'white'}}>{color}</Text>
                </View>
                {'    '}
                color.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                padding: 10,
              }}>
              <Pressable onPress={() => handleModalChoice('Cancel')}>
                <Text
                  style={{
                    fontSize: 21,
                    marginRight: 35,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable onPress={() => handleModalChoice('Start')}>
                <Text
                  style={{fontSize: 21, color: 'black', fontWeight: 'bold'}}>
                  Start
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Middle Part */}
      {isStart && (
        <View style={styles.colorContainer}>
          <Pressable onPress={() => alertResult(arrColors[0])}>
            <View
              style={{
                backgroundColor: arrColors[0],
                height: 150,
                width: 150,
              }}
            />
          </Pressable>
          <Pressable onPress={() => alertResult(arrColors[1])}>
            <View
              style={{
                backgroundColor: arrColors[1],
                height: 150,
                width: 150,
              }}
            />
          </Pressable>
          <Pressable onPress={() => alertResult(arrColors[2])}>
            <View
              style={{
                backgroundColor: arrColors[2],
                height: 150,
                width: 150,
              }}
            />
          </Pressable>
          <Pressable onPress={() => alertResult(arrColors[3])}>
            <View
              style={{
                backgroundColor: arrColors[3],
                height: 150,
                width: 150,
              }}
            />
          </Pressable>
        </View>
      )}

      {/* Bottom Part */}
      <Pressable
        style={({pressed}) => [
          pressed && styles.pressedItem,
          styles.startButton,
          isStart && styles.gameStartedStyle,
        ]}
        android_ripple={{color: '#dddddd'}}
        onPress={handleStartModal}>
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

  modalContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 40,
    borderRadius: 35,
    padding: 25,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: '#fff',
  },
  gameStartedStyle: {
    backgroundColor: 'grey',
  },
});

export default App;
