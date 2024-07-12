

import React, {useEffect, useRef} from 'react';
import { Animated, Easing } from 'react-native';

const AnimScreen = props => 
{
    const slideAnim = useRef( new Animated.Value( 0 ) ).current;
    const duration = 800;

    useEffect(() => {
        
        Animated.timing(slideAnim, {
            toValue: 1,
            friction: 4, // Lower friction value leads to smoother spring
            tension: 30, // Higher tension value leads to more springy animation
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    return (
        <Animated.View
            style=
            {[
                {
                    flex:0,
                    transform: 
                    [
                        // {
                        //     translateX: slideAnim.interpolate({
                        //         inputRange: [0, 1],
                        //         outputRange: [100, 0], // Adjust the translation distance as needed
                        //     }),
                        // },
                        {
                            scaleX: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.98, 1], // Adjust the scale as needed
                            }),
                        },
                        {
                            scaleY: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.98, 1], // Adjust the scale as needed
                            }),
                        },
                    ],
                    opacity: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.75, 1], // Adjust the scale as needed
                    }),
                },
                props.style, // Add the passed style here
            ]}
        >
        {
            props.children
        }
        </Animated.View>
    );
}
export default AnimScreen;