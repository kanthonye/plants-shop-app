
import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
// import LandingPage from './LandingScreen.js';

import DashboardScreen from './DashboardScreen';
import LandingScreen from './LandingScreen';
import SettingsScreen from './SettingsScreen';
import ProductPage from './ProductPage';
import CartScreen from './CartScreen';
import AnimScreen from './AnimScreen';

import { productlist } from './db.js'

const newCart = () => ({
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    count: 0,
    tax: 0
});

export default function App() 
{
    const status_bar_styles = ['default', 'light-content', 'dark-content'];
    const [status_bar_style, setStatusBarStyle] = useState( 0 );
    const [dashboard_visiblility, setDashboardVisiblility] = useState(false);
    const [category, setCategory] = useState( 0 );
    const [cart, setCart] = useState( newCart() );
    const [products, setProducts] = useState( productlist );
    const [search_query, setSearchQuery] = useState('');
    const [selected_item, setSelectedItem] = useState('LandingScreen');
    const [current_screen, setCurrentScreen] = useState('LandingScreen');
     
    const navigate = ( screen ) => { setCurrentScreen( screen ); };



    useEffect(() => {
        setDashboardVisiblility( false );
        setCategory( 0 );
        setCart( newCart() );
        setProducts( productlist );
    }, []);

    const showDashboard = () => { setDashboardVisiblility( true ); };
    const hideDashboard = () => { setDashboardVisiblility( false ); };

    const setCurrentCategory = ( index ) => 
    { 
        setCategory( index ); 
        if( index === 0)
        {
            setProducts( productlist );
            return;
        }
        const updated_items = productlist.filter(item => item.category === index);
        setProducts( updated_items );
    };

    const searchProducts = () => 
    {
        const query = search_query.toLowerCase();
        if( query.length === 0)
        {
            setProducts( productlist );
            return;
        }

        const updated_items = productlist.filter(item => 
            item.name.toLowerCase().includes( query )
        );
        setProducts(updated_items);
    };

    const calcCartSummary = ( items ) => 
    { 
        let new_subtotal = 0;
        let new_shipping = 0;
        let new_count = 0;
        let new_tax = 0;
        let price = 0;

        items.forEach(item => {
            price = parseFloat(item.price, 2) * item.quantity;
            new_subtotal += price;
            new_shipping += parseFloat(item.shipping, 2);
            new_tax += parseFloat(price * 0.05, 2);
            new_count += parseInt(item.quantity);
        });

        // Update cart state with new values
        setCart({
            ...cart,
            items: items,
            subtotal: new_subtotal,
            shipping: new_shipping,
            total: parseFloat( new_subtotal + new_shipping + new_tax, 2),
            count : new_count,
            tax: new_tax
        });
    }
    
    const removeFromCart = ( item ) => 
    { 
        const updated_items = cart.items.map(itm => {
            if (itm.id === item.id) {
                return { ...itm, quantity: itm.quantity - 1 };
            }
            return itm;
        }).filter(item => item.quantity > 0);

        calcCartSummary( updated_items );
    }

    const addToCart = (item) => 
    {
        var array = [...cart.items];
        var index = array.findIndex((itm) => itm.id === item.id);
        if (index !== -1) {
            array[index].quantity++;
            calcCartSummary(array);
        } else {
            item.quantity = 1; // Set initial count if item is not found
            calcCartSummary([...cart.items, item]);
        }
        console.log(index);
    }
    
    const setItemQuantity = ( item_id, quantity ) => 
    {
        const updated_items = cart.items.map(item => 
        {
            if ( item.id === item_id ) 
                {
                return { ...item, quantity: quantity };
            }
            return item;
        }).filter(item => item.quantity > 0);;
        calcCartSummary( updated_items );
    };

    const screen_components = 
    {
        LandingScreen: <LandingScreen navigate={ navigate } /> ,

        Settings: <SettingsScreen navigate={ navigate } />,

        ProductPage: <ProductPage 
            navigate={ navigate }
            item={ selected_item } 
            cart={ cart }
            setItemQuantity={ setItemQuantity }
            removeFromCart={ removeFromCart } 
            addToCart={ addToCart }
        />,

        Cart: <CartScreen
            navigate={ navigate }
            setItemQuantity={ setItemQuantity }
            removeFromCart={ removeFromCart } 
            addToCart={ addToCart }
            cart={ cart }
        />,

        Dashboard: <DashboardScreen 
            navigate={ navigate }
            cart={ cart }
            products={ products }
            category={ category }
            search_query={ search_query }
            addToCart={ addToCart }
            setItemFocus={ setSelectedItem }
            searchProducts={ searchProducts }
            setSearchQuery={ setSearchQuery }
            setCurrentCategory={ setCurrentCategory }
        />,
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={ status_bar_styles[ status_bar_style ] } />
            { screen_components[ current_screen ] }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#070f06',
  },
});
