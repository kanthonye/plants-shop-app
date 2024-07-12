import React, {useState, useEffect} from 'react';
import { Text,StyleSheet, Pressable } from 'react-native';

const AddToCartButton = ({ item, callback }) => 
{
    const [ pressed, setPressed ] = useState( false );

    useEffect(() => {
        setPressed( false );
    }, []);
    
    const butn_styl = (( pressed )? styles.pressed_button : styles.idle_button);
    
    return (
        <Pressable style={ butn_styl } 
            onPressIn={() => setPressed( true )}
            onPressOut={() => setPressed( false )}
            onPress={() => callback( item )}
        >
            <Text style={ styles.text }>Add To Cart</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({

    text:
    {
        color: '#EEF2E9',
        fontWeight: 'bold',
        fontSize: 12,
    },

    idle_button:
    {
        backgroundColor: '#4c7136',
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressed_button:
    {
        backgroundColor: '#028785',
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AddToCartButton;