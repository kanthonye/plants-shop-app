
import { StyleSheet, Text, View, ImageBackground, Pressable, Dimensions } from 'react-native';
import image from './assets/abstract-green-leaf-texture-tropical.jpg'
import AnimScreen from './AnimScreen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function LandingScreen({ navigate }) {
    return (
        <View style={{ backgroundColor: '#365425' }}>
            <AnimScreen>
                <View style={styles.section}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                        <View style={styles.box}>
                            <Text style={styles.text2}>Welcome to</Text>
                            <Text style={styles.text}>The Grove</Text>
                            <View style={styles.seperator}></View>
                            <Pressable style={styles.button} onPress={() => navigate( 'Dashboard' )} >
                                <Text style={styles.button_text}>Lets Shop</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>
                </View>
            </AnimScreen>
        </View>
    );
}

export default LandingScreen;

const styles = StyleSheet.create({
    section: {
      backgroundColor: '#2c481c',
      minHeight: windowHeight,
      minWidth: windowWidth,
      // borderStyle:'solid',
      // borderWidth:1
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    text2: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    text3: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
    box: {
      height:'25%',
      width:'95%',
      padding: 30,
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 30,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: '#4c7136',
      width: 150,
    },
    button_text: {
      color: '#DCFFC1',
      fontSize: 16,
      textAlign: 'center',
    },
    seperator:{
      height:20,
    }
  });
  