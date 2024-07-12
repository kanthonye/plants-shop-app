import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import ClickableIcon from './ClickableIcon';
import CartIconButton from './CartIconButton';

import leaf_icon from './assets/leaf-icon.png'
import search_icon from './assets/setting.png'
import settings_icon from './assets/gear.png'

function Navbar({ navigate, cart, search_query, searchProducts, setSearchQuery }) 
{
    return (
        <View style={styles.banner}>
            <ClickableIcon image={ leaf_icon } callback={() => navigate( 'LandingScreen' )} />
            <TextInput style={ styles.search_bar } placeholder='search...' 
                onChangeText={(text) => setSearchQuery( text )}
                onBlur={(text) => searchProducts( text )}
                value={ search_query }
            />

            <View style={styles.row_aligned}>
            {/* <ClickableIcon image={ search_icon   } callback={ hideStoreFront } /> */}
                <Text style={ styles.text }>${ cart.subtotal.toFixed(2) }</Text>
                <CartIconButton cart={ cart } callback={() => navigate( 'Cart' )} />
                <ClickableIcon image={ settings_icon } callback={() => navigate( 'Settings' )} />
            </View>
        </View>
    );
}

export default Navbar;

const styles = StyleSheet.create({
    banner: {
        // flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:20,
        paddingLeft:20,
    },
    row_aligned: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    search_bar: {
        backgroundColor: '#EEF2E9',
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 30,
        flex: '100%',
        minWidth: 100,
        maxWidth: 200,
        color: '#748376',
        fontSize: 12,
    },
    text: {
        color: '#748376',
        fontSize: 16,
        fontWeight:'bold',
    },
});
  