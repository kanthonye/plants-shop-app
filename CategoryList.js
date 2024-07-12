
import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';

import { categories } from './db.js'

function CategoryList({ category, setCategory }) 
{
    const Item = ({ item }) => 
    {
        
        return (
            (
                category == item.id 
                ?
                    <Pressable style={ styles.selected_category } onPress={() => setCategory( item.id )}>
                        <Text style={ styles.selected_category_text }>{ item.title }</Text>
                    </Pressable>
                :
                    <Pressable style={ styles.category } onPress={() => setCategory( item.id )}>
                        <Text style={styles.title}>{ item.title }</Text>
                    </Pressable>
            )
        );
    };

    return (
        <View style={ styles.categories }>
            <FlatList
                horizontal={ true }
                data={ categories }
                renderItem={({ item }) => <Item item={ item } />}
                keyExtractor={ item => item.id }
            />
        </View>
        
    );
}

export default CategoryList;

const styles = StyleSheet.create({

    title:
    {
        color: '#688661',
    },

    categories:
    {
        width: "95%",
        marginVertical: 5,
    },

    category:
    {
        backgroundColor: '#EEF2E9',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10
    },

    selected_category:
    {
        backgroundColor: '#4c7136',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10
    },

    selected_category_text:
    {
        color: '#dcfec1',
    },
});
  