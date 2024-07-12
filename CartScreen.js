

import React from 'react';
import { Image, Text, TextInput, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Pressable } from 'react-native';

import AnimScreen from './AnimScreen'
import ClickableIcon from './ClickableIcon';
import back_icon from './assets/back-button.png'
import minus_icon from './assets/minus.png'
import plus_icon from './assets/plus.png'
import cross_icon from './assets/cross.png'

const windowWidth  = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const { height } = Dimensions.get('window');

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

function CartScreen
({ 
    navigate,
    setItemQuantity, 
    removeFromCart, 
    addToCart, 
    cart
}) 
{
    const Item = ({ item }) => 
    {
        const [value, setValue] = React.useState('' + item.quantity);

        const handleQuantityChange = ( quantity ) => 
        {
            setValue( quantity );
        };

        const handleQuantitySubmit = () => 
        {
            const parsed_quantity = parseInt( value );
            if (!isNaN( parsed_quantity ) && parsed_quantity >= 0) {
                setItemQuantity(item.id, parsed_quantity);
            } else {
                // Reset to previous valid quantity if the input is invalid
                setValue('' + item.quantity);
            }
        };

        return (
            <View key={ item.id } style={ styles.item }>
                <View style={ styles.item_image }>
                    <Image source={ item.image } resizeMode="contain" style={ styles.image } />
                </View>
                <View style={ styles.item_info }>
                    <View style={ styles.row }>
                        <Text style={ styles.title }>{ item.name }</Text>
                    </View>
                    <View style={ styles.sample }>
                        <View style={ styles.row }>
                            <Text style={ styles.description }>quantity:</Text>

                            {/* 
                                To ensure that the TextInput allows users to enter multi-digit numbers without 
                                automatically updating the state on every key press, you can debounce the state 
                                update or update the state only when the input loses focus (onBlur event). This 
                                way, users can enter the full number before it updates the item quantity.
                            */}
                            <TextInput
                                style={ styles.numeric_input }
                                value={ value }
                                onChangeText={ handleQuantityChange }
                                onBlur={ handleQuantitySubmit }
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={ styles.row }>
                            <Text style={ styles.description }>size:</Text>
                            <Text style={ styles.description }>{ item.size }</Text>
                        </View>
                        <View style={ styles.row }>
                            <Text style={ styles.description }>Price</Text>
                            <Text style={ styles.description }>${ item.price }</Text>
                        </View>
                    </View>

                    <View style={ styles.item_footer }>
                        <ClickableIcon image={ minus_icon } callback={() => removeFromCart( item )} size={1} />
                        <ClickableIcon image={ plus_icon } callback={() => addToCart( item )} size={1} />
                    </View>
                </View>
                {/* <View style={ styles.stretch_row }>
                    <ClickableIcon image={ cross_icon } callback={() => removeItemFromCart( item )} size={1} />
                </View> */}
            </View>
        );
    }

    const RenderSummary = () => 
    {
        return (
            ( cart.items.length === 0 )
            ? 
            (
                <View style={{ alignItems:'center'}}>
                    <Text style={{ paddingVertical: '50%', fontWeight:'bold', fontSize:32, color:'#688661' }}> Empty Cart </Text>
                </View>
            )
            :
            (
                <View style={ styles.summary }>
                    <View style={ styles.payment_info }>
                        <View style={ styles.payment_row }>
                            <Text style={ styles.payment_text }>Tax:</Text>
                            <Text style={ styles.payment_value }>${parseFloat(cart.tax)}</Text>
                        </View>
                        <View style={ styles.payment_row }>
                            <Text style={ styles.payment_text }>Shipping:</Text>
                            <Text style={ styles.payment_value }>${parseFloat(cart.shipping)}</Text>
                        </View>
                        <View style={ styles.payment_row }>
                            <Text style={ styles.payment_text }>Sub Total:</Text>
                            <Text style={ styles.payment_value }>${parseFloat(cart.subtotal)}</Text>
                        </View>
                    </View>
                    <View style={ styles.total }>
                        <Text style={ styles.subtotal_text }>Total:</Text>
                        <Text style={ styles.subtotal_value }>${parseFloat(cart.total, 2)}</Text>
                    </View>
                    <View style={ styles.checkout }>
                        <Text style={ styles.checkout_text }>Checkout</Text>
                    </View>
                </View>
            )
        );
    }

    const ItemSeparator = () => ( <View style={{ height: 8, }} /> );
    
    return (
        <SafeAreaView style={ styles.container }>
            <AnimScreen>
                <View style={ styles.section }>
                    <View style={ styles.head }>
                        <ClickableIcon image={ back_icon } callback={() => navigate( 'Dashboard' )} />
                        <Text style={ styles.page_title }>My Cart</Text>
                    </View>

                    <FlatList
                        style={ styles.flatlist }
                        horizontal={ false }
                        data={ cart.items }
                        renderItem={ ({ item }) => <Item item={ item } /> }
                        keyExtractor={ item => generateUniqueId() }
                        ListFooterComponent={() => <RenderSummary />}
                        ItemSeparatorComponent={ ItemSeparator }
                    />
                </View>
            </AnimScreen>
        </SafeAreaView>
    );
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },

    section:
    {
        // flexDirection: 'column',
        // alignItems: 'center',
        // paddingVertical: 20,

        height: windowHeight - 80,
    },

    head:
    {
        paddingHorizontal: '4%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    flatlist: {
        flexDirection: 'column',
        width: '100%',
        gap: 10,
        paddingHorizontal: '4%',
    },

    summary:{
        marginTop: 10,
        marginBottom: 20,
        // width: '100%',
        padding: '5%',
        backgroundColor: '#EEF2E9',
        borderRadius: 20,
    },

    page_title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#748376',
    },

    payment_info: {
        borderRadius: 10,
        padding: '5%',
    },

    payment_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#BECDBF',
    },

    payment_text: {
        fontWeight: 'bold',
        color: '#748376',
        fontSize: 16,
    },

    payment_value: {
        color: '#748376',
    },

    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5%',
    },

    subtotal_text: {
        fontWeight: 'bold',
        color: '#748376',
        fontSize: 24,
    },

    subtotal_value: {
        color: '#748376',
        fontSize: 24,
    },

    checkout:{
        padding: '2%',
        backgroundColor: '#4c7136',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    checkout_text:{
        color: '#DCFFC1',
        fontSize: 24,
    },

    item:
    {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',

        backgroundColor: '#E1E9D999',
        borderRadius: 20,
        padding: 15,
        
    },

    item_image:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    image:
    {
        width: 120, 
        height: 120,
    },

    item_info:
    {
        flex:1,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },

    title:
    {
        color: '#4c7136',
        fontWeight: 'bold',
        fontSize: 16,
    },

    sub_title:
    {
        color: '#4c7136',
        fontWeight: 'bold',
        fontSize: 14,
    },

    description:
    {
        color: '#748376',
        fontSize: 12,
    },

    numeric_input:
    {
        backgroundColor: '#FFF',
        minWidth: 50,
        fontSize: 14,
        color: '#748376',
        textAlign: 'right',
        borderRadius: 5,
    },

    item_footer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
    },

    row:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    stretch_row:{
        maxWidth: 35,
    },

    sample:{ paddingHorizontal: 15, paddingVertical: 15, }
});