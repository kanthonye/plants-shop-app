

import React from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';

import ClickableIcon from './ClickableIcon';
import back_icon from './assets/back-button.png'
import AnimScreen from './AnimScreen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SettingsScreen({ navigate }) 
{
  return (
    <SafeAreaView style={ styles.container }>
        <AnimScreen>
            <ScrollView>
                <View style={ styles.section }>
                    <ClickableIcon image={ back_icon } callback={() => navigate( 'Dashboard' )} />
                    <Text style={ styles.page_title }>Settings</Text>
                </View>
            </ScrollView>
        </AnimScreen>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#edf2e8',
        minHeight: windowHeight,
        minWidth: windowWidth,
    },
    section: {
        backgroundColor: '#edf2e8',
        paddingLeft: 20,
        paddingRight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#00F',
    },
    page_title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#748376',
    },
});