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
  PixelRatio,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
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

  // this is to get the font size based on the device's font scale. it makes the fonts responsive.
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;

  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);

  // modals' useState variables
  const [startModalIsVisible, setStartModalIsVisible] =
    useState<boolean>(false);
  const [highestRecordModalIsVisible, setHighestRecordModalIsVisible] =
    useState<boolean>(false);

  // the required color that the user needs to click.
  const [requiredColor, setRequiredColor] = useState<string>('');

  const [arrColors, setArrColors] = useState<string[]>([]);

  //when one of the records were pressed in the highest record modal, this keeps track of the record that was pressed.

  // when the user is playing the game, this keeps track of their record.
  const [record, setRecord] = useState<number>(0);

  // dummy data will be used for testing purposes.
  const DUMMY_DATA = [];

  for (let i = 0; i < 20; i++) {
    DUMMY_DATA.push({key: i + 1, record: Math.floor(Math.random() * 1000)});
  }

  // when the user is checking the highest record, this keeps track of the highest record. It shall be stored in an array.
  const [highestRecords, setHighestRecords] = useState<
    Array<{key: number; record: number}>
  >([]);

  const fourBlockColors = (requiredColor: string) => {
    /*
    Ensure that this function is executed when start modal is executed so that the requiredColor can be generated. 

    when the game is initialized, the 4 blocks of color should have been given based on randomColor()'s given result and be remained as such throughout the game. 
    the requiredColor must be within one of the 4 blocks of color. 
    the requiredColor must alternate between the 4 blocks of color. 

    */

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

    if (colors.includes(requiredColor)) {
      const filteredColors = colors.filter(color => color !== requiredColor);

      const randomizeColor = randomColor(filteredColors);

      setArrColors([
        requiredColor,
        randomizeColor.randomItem(),
        randomizeColor.randomItem(),
        randomizeColor.randomItem(),
      ]);
    }
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffleTheColors = (array: string[], index: number) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[index], array[j]] = [array[j], array[index]];
    }
  };

  // timer and color blocks constantly changing logic
  useEffect(() => {
    let intervalColors: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;

    console.log(arrColors);

    if (isStart) {
      intervalColors = setInterval(() => {
        shuffleTheColors(arrColors, arrColors.indexOf(requiredColor));
      }, 400);

      intervalTimer = setInterval(() => {
        setMilliseconds(currentTime => currentTime + 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalColors);
      clearTimeout(intervalTimer);
    };
  }, [isStart]);

  // this is triggered to check what the user has chosen between starting the game or cancelling it.
  const handleModalChoice = (status: string) => {
    if (status === 'Start') {
      fourBlockColors(requiredColor);
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

    const randomizeColor = randomColor(colors);

    setRequiredColor(randomizeColor.randomItem());
    setStartModalIsVisible(true);
  };

  // bring up the highest record modal
  const handleOpenHighestRecord = () => {
    //if it is in the start status, this disables the button.
    if (isStart) {
      return;
    }

    if (highestRecordModalIsVisible) {
      setHighestRecordModalIsVisible(false);
      return;
    }

    setHighestRecordModalIsVisible(true);
  };

  // adding the new record handler
  const addNewRecord = (newRecord: number) => {
    setHighestRecords(currentRecords => [
      ...currentRecords,
      {key: Math.random(), record: newRecord},
    ]);
  };

  // alert result. this is triggered when the user clicks on one of the color blocks. will also stop the game.
  const alertResult = (chosenColor: string) => {
    setIsStart(false);

    if (chosenColor === requiredColor) {
      addNewRecord(milliseconds);

      Alert.alert(
        'Congratulations!',
        `You had used ${milliseconds} to click ${chosenColor} color.`,
        [{text: 'OK'}],
      );
    } else {
      Alert.alert('Sorry', `This is ${chosenColor}`, [{text: 'OK'}]);
    }

    setMilliseconds(0);
  };

  return (
    <View style={[styles.parentContainer]}>
      {/* Top Part. Timer and Highest Record Display */}
      <View style={styles.topPart}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: getFontSize(20),
              textAlign: 'center',
              backgroundColor: 'maroon',
              padding: 32,
            }}>
            Timer: {milliseconds} milliseconds
          </Text>
        </View>

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
              fontSize: getFontSize(20),
              textAlign: 'center',
            }}>
            Highest Record
          </Text>
        </Pressable>
        {/* End of Highest Record and Timer Display */}

        {/*  Modal Highest Record. */}
        <Modal
          transparent={true}
          visible={highestRecordModalIsVisible}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, styles.modalViewHighestRecords]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: getFontSize(15),
                  color: 'black',
                  textAlign: 'center',
                }}>
                Highest Score
              </Text>

              {highestRecords.length === 0 ? (
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: getFontSize(18),
                      color: 'black',
                      padding: 45,
                      textAlign: 'center',
                    }}>
                    No records yet
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={highestRecords.sort((a, b) => a.record - b.record)}
                  renderItem={({item}) => (
                    <View
                      style={[
                        {
                          backgroundColor:
                            item === highestRecords[0]
                              ? 'lightgrey'
                              : 'transparent',
                          borderRadius: 15,
                        },
                        {padding: 5, marginTop: 10, width: '100%'},
                      ]}>
                      <Text style={{fontSize: getFontSize(15), color: 'black'}}>
                        {`${item.record} ms`}
                      </Text>
                    </View>
                  )}
                />
              )}

              <Pressable
                style={({pressed}) => [
                  pressed && styles.pressedItem,
                  styles.closeButton,
                ]}
                onPress={handleOpenHighestRecord}>
                <Text style={{textAlign: 'center', fontSize: getFontSize(15)}}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {/* End of HighestRecord Modal */}

      {/* Start Game Modal */}
      <Modal
        transparent={true}
        visible={startModalIsVisible}
        animationType="slide">
        <View style={[styles.modalContainer]}>
          <View style={styles.modalView}>
            <View style={{paddingBottom: 10}}>
              <Text style={{fontSize: getFontSize(20), color: 'black'}}>
                Start Playing!
              </Text>
            </View>
            <View style={{}}>
              <Text style={{fontSize: getFontSize(15), color: 'black'}}>
                Tap the{'    '}
                <View style={{backgroundColor: requiredColor, padding: 8}}>
                  <Text style={{fontSize: getFontSize(20), color: 'white'}}>
                    {requiredColor}
                  </Text>
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
      {/* End of Start Game Modal */}

      {/* Middle Part. Color Blocks Appears Here. */}
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
            fontSize: getFontSize(20),
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Start Game
        </Text>
      </Pressable>
      {/* End of Bottom Part */}
    </View>
  );
}

const randomColor = (colors: string[]) => {
  let data = [...colors];
  let chosenColors: string[] = [];

  const getRandomColor = () => {
    if (data.length === 0) {
      data = chosenColors;
      chosenColors = [];
    }

    const index = Math.floor(Math.random() * data.length);
    const chosenColor = data.splice(index, 1)[0];

    chosenColors.push(chosenColor);
    return chosenColor;
  };

  return {
    randomItem: getRandomColor,
  };
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

  closeButton: {
    padding: 15,
    width: '50%',
    borderRadius: 30,
    backgroundColor: '#AA336A',
    marginTop: 10,
  },

  pressedItem: {
    backgroundColor: '#C3B0A2',
  },

  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 100,
  },

  modalContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },

  modalViewHighestRecords: {
    alignItems: 'center',
    height: '30%',
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
