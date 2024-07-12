

import React from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image } from 'react-native';

import AddToCartButton from './AddToCartButton';
import AnimScreen from './AnimScreen';
import ClickableIcon from './ClickableIcon';
import back_icon from './assets/back-button.png'
import { categories } from './db.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProductPage({ navigate, cart, item, addToCart, removeFromCart }) 
{
    const medium_text = [ styles.medium_text, styles.bold_text ];
    const ItemDetail = () => {
        return (
            <View style={ styles.section }>
                <View style={[ styles.image_container, styles.white_tint_bg, styles.curve_corners ]}>
                    <Image style={ styles.image }source={ item.image } resizeMode="contain" />
                </View>

                <View>
                    <Text style={[ styles.large_text, styles.bold_text ]}>{ item.name }</Text>
                </View>

                <View style={[ styles.col ]}>
                    <Text style={ styles.small_text }>family:</Text>
                    <Text style={ medium_text }>{ categories[ item.category ].title }</Text>
                </View>

                <View style={[ styles.row, styles.white_tint_bg, styles.curve_corners, styles.padding ]}>
                    <Text style={ styles.small_text }>{ item.description }</Text>
                </View>

                <View style={[ styles.row, styles.white_tint_bg, styles.curve_corners, styles.padding ]}>
                    <View>
                        <Text style={ styles.small_text }>size:</Text>
                        <Text style={ medium_text }>{ item.size }</Text>
                    </View>
                    <View>
                        <Text style={ styles.small_text }>humidity:</Text>
                        <Text style={ medium_text }>{ item.treatment.humidity }%</Text>
                    </View>
                    <View>
                        <Text style={ styles.small_text }>lighting:</Text>
                        <Text style={ medium_text }>{ item.treatment.lighting }</Text>
                    </View>
                    <View>
                        <Text style={ styles.small_text }>watering:</Text>
                        <Text style={ medium_text }>{ item.treatment.watering }</Text>
                    </View>
                </View>
                
                <View style={[ styles.row, styles.white_tint_bg, styles.curve_corners, styles.padding ]}>
                    <View>
                        <Text style={ styles.small_text }>width:</Text>
                        <Text style={ medium_text }>{ item.width }"</Text>
                    </View>
                    <View>
                        <Text style={ styles.small_text }>height:</Text>
                        <Text style={ medium_text }>{ item.height }"</Text>
                    </View>
                    <View>
                        <Text style={ styles.small_text }>depth:</Text>
                        <Text style={ medium_text }>{ item.depth }"</Text>
                    </View>
                </View>

                <View style={ styles.row }>
                    <View>
                        <Text style={ styles.small_text }>price:</Text>
                        <Text style={[ styles.large_text, styles.bold_text ]}>${ item.price }</Text>
                    </View>
                    <View style={ styles.col }>
                        <Text style={ styles.small_text }>quantity:</Text>
                        <Text style={ styles.small_text }>{ item.quantity }</Text>
                    </View>
                    <AddToCartButton item={ item } callback={ addToCart } />
                </View>
            </View>
        );
    }
    return (
        <SafeAreaView style={ styles.container }>
            <AnimScreen style={{ flex: 1}}>
                <View  style={{ flex: 1 }}>
                    <View style={[ styles.row, {paddingHorizontal:20} ]}>
                        <ClickableIcon image={ back_icon } callback={() => navigate( 'Dashboard' )} />

                        <View style={[ styles.col, styles.center ]}>
                            <Text style={ styles.small_text }>Subtotal:</Text>
                            <Text style={ styles.large_text }>${ cart.subtotal.toFixed(2) }</Text>
                        </View>
                    </View>

                    <View style={{ padding: 10 }} >
                        <View style={{ borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#74837655' }}/>
                    </View>
                    <ScrollView style={ styles.scroll_view }>  
                        <ItemDetail />
                    </ScrollView> 
                </View>
            </AnimScreen>
        </SafeAreaView>
    );
}

export default ProductPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2e8',
    },

    scroll_view:
    { 
        flex: 1,
        paddingHorizontal: 20,
    },

    section: 
    {
        gap: 20,
        minHeight: 100,
    },

    info:{ 
        // padding:20, 
        backgroundColor: '#edf2e8', 
        borderRadius: 20,
        
    },

    info_white:{ 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        padding:20,
        backgroundColor: '#FFF', 
        borderRadius: 20
    },

    image: {
        height: '100%',
        width: '100%',
    },

    image_container: {
        padding:20, 
        maxHeight: 350,
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#F00',
    },

    bold_text: {
        fontWeight: 'bold',
    },

    large_text: {
        fontSize: 20,
        color: '#748376',
    },

    medium_text:
    {
        color: '#688661',
        fontSize: 16,
    },

    small_text:
    {
        color: '#688661',
        fontSize: 14,
    },

    white_tint_bg:
    {
        backgroundColor: '#FFFFFF99', 
    },


    curve_corners:
    {
        borderRadius: 10,
    },

    row:
    { 
        flexDirection:'row', 
        justifyContent: 'space-between', 
    },

    center:
    { 
        alignItems:'center',
    },

    col:
    { 
        flexDirection:'column', 
    },

    padding:
    { 
        padding:20,
    },
});