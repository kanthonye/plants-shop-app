
import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Pressable } from 'react-native';

function ClickableIcon({ image, callback, size }) 
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
        icon: {
            width: icon_size,
            height: icon_size,
        },
        icon_button: {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
    });

    return (
        <Pressable style={ styles.icon_button } onPress={ callback }>
            <ImageBackground source={ image } resizeMode="cover" style={styles.icon}>
            </ImageBackground>
        </Pressable>
    );
}

export default ClickableIcon;


  