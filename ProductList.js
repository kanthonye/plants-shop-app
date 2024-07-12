

import React, {useState, useEffect} from 'react';
import { Text,StyleSheet, View, Dimensions, Image, Pressable, FlatList } from 'react-native';

import AddToCartButton from './AddToCartButton';

const { height } = Dimensions.get('window');
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

const PressableImage = ({ item, navigate, setItemFocus }) => 
{
    const [ pressed, setPressed ] = useState( false );

    useEffect(() => {
        setPressed( false );
    }, []);
    
    const style = (( pressed )? [ styles.item_image, {opacity:0.5} ] : styles.item_image);
    
    const displayItem = () => 
    {
        setItemFocus( item );
        navigate( 'ProductPage' );
    }

    return (
        <Pressable
            onPressIn={() => setPressed( true )}
            onPressOut={() => setPressed( false )}
            onPress={() => displayItem()}
        >
            <View style={ style }>
                <Image source={ item.image } resizeMode="contain" style={ styles.image } />
            </View>
        </Pressable>
    );
}

const Item = ({ navigate, item, addToCart, setItemFocus }) => 
{
    const [ pressed, setPressed ] = useState( false );

    useEffect(() => {
        setPressed( false );
    }, []);

    const butn_styl = (( pressed )? styles.button_pressed : styles.buy_button);

    return (
        <View key={ item.id } style={ styles.item }>
            <PressableImage navigate={ navigate } item={ item } setItemFocus={ setItemFocus } />
            <View style={ styles.item_info }>
                <Text style={ styles.item_name }>{ item.name }</Text>
                <Text style={ styles.item_snippet }>{ item.snippet }</Text>
                <View style={ styles.item_footer }>
                    <Text style={ styles.item_price }>${ item.price }</Text>
                    <AddToCartButton item={ item } callback={ addToCart } />
                </View>
            </View>
        </View>
    );
}

function ProductList({ products, navigate, addToCart, setItemFocus })
{
    const ItemSeparator = () => ( <View style={{ height: 8, }} /> );
    console.log("navigator " + navigate );
    return (
        <View style={ styles.flatlist_container }>
            <FlatList
                style={ styles.flatlist }
                horizontal={ false }
                data={ products }
                renderItem={({item}) => <Item navigate={ navigate } item={ item } addToCart={ addToCart } setItemFocus={ setItemFocus } />}
                keyExtractor={ item => item.id }
                numColumns={ 2 }
                initialNumToRender={ 4 }
                ItemSeparatorComponent={ ItemSeparator }
                columnWrapperStyle={{ gap:8 }}
            />
        </View>
    )
}
export default ProductList;

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

    footer: {
        height: 20, // Adjust this value as needed
    },
});
  