

import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text,StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Modal, StatusBar, Image, Pressable, FlatList } from 'react-native';

import CategoryList from './CategoryList';
// import SettingsModal from './Settings';
import Navbar from './Navbar';
// import Cart from './Cart';
import ProductList from './ProductList';
import AnimScreen from './AnimScreen'


const { height } = Dimensions.get('window');
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

function DashboardScreen
({ 
    navigate,
    cart, 
    products,
    category, 
    search_query,
    addToCart, 
    setItemFocus,
    searchProducts,
    setSearchQuery,
    setCurrentCategory, 
}) 
{
    return (
        <SafeAreaView>
            <AnimScreen>
                <View style={ styles.section }>
                    <Navbar 
                        navigate={ navigate }
                        search_query={ search_query }
                        searchProducts={ searchProducts }
                        setSearchQuery={ setSearchQuery }
                        cart={ cart }
                    />
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <CategoryList category={ category } setCategory={ setCurrentCategory } />
                    </View>
                    <ProductList 
                        navigate={ navigate } 
                        products={ products } 
                        addToCart={ addToCart } 
                        setItemFocus={ setItemFocus } 
                    />
                </View>
            </AnimScreen>
        </SafeAreaView>
    );
}

export default DashboardScreen;

const styles = StyleSheet.create({

    section: {
        backgroundColor: '#fff',
    },

    flatlist_container:{
        flexDirection: 'column',
        justifyContent: 'center',
        height: height - 180,
        
        // borderStyle: 'solid',
        // borderWidth: 4,
        // borderColor: '#F00',
    },

    flatlist:{
        flexDirection: 'column',
        paddingHorizontal: '4%',
        // paddingBottom: 30,
        gap: 8,
    },

    item:
    {
        flex: 1,
        height: 350,
        width: '47%',
        flexDirection: 'column',

        backgroundColor: '#E1E9D999',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 5,

        // marginHorizontal: 5,
        // marginVertical: '1%'
    },

    item_image:
    {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    image:
    {
        width: 150, 
        height: 150,
    },

    item_info:
    {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        gap: 5,
    },

    item_name:
    {
        color: '#4c7136',
        fontWeight: 'bold',
        height: 20,
    },

    item_snippet:
    {
        color: '#688661',
        fontSize: 14,
        height: 90,
    },

    item_footer:
    {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    item_price:
    {
        color: '#4c7136',
        fontWeight: 'bold',
        fontSize: 18,
    },

    buy_button:
    {
        backgroundColor: '#4c7136',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },

    button_pressed:
    {
        backgroundColor: '#028785',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },

    buy_button_text:
    {
        color: '#EEF2E9',
        fontWeight: 'bold',
        fontSize: 12,
    },

  footer: {
    height: 20, // Adjust this value as needed
  },
});
  