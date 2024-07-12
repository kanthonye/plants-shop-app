
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import ClickableIcon from './ClickableIcon';
import cart_icon from './assets/grocery-store.png'

function CartIconButton({ callback, cart, size }) 
{ 
    const [ icon_size, setSize ] = useState( 30 );

    useEffect(() => {
        switch( size )
        {
            default:
            case 3: setSize(30); break;
            case 1: setSize(20); break;
            case 2: setSize(25); break;
        }
    }, []);

    const styles = StyleSheet.create
    ({
        icon: 
        {
            width: icon_size,
            height: icon_size,
        },

        icon_button: 
        {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },

        view_count:
        {
            top: -8,
            left: -5,
            height: 25,
            width: 25,
            position: 'absolute',
            backgroundColor: '#4c7136',
            borderRadius: 50,
            paddingHorizontal: 6,
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    return (
        <Pressable style={ styles.icon_button } onPress={ callback }>
            <View>
                {
                    ( cart.count > 0 )
                    ?
                    <View style={ styles.view_count }>
                        <Text style={{ fontSize: 12, color:'#FFF' }}>{cart.count}</Text>
                    </View>
                    :
                    <View>
                    </View>
                }
                <ClickableIcon image={ cart_icon } callback={ callback } />
            </View>
        </Pressable>
    );
}

export default CartIconButton;