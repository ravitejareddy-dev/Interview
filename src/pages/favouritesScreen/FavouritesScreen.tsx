import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    Dimensions,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { globalStyles } from '../../utlis/global'
import HeaderComponent from '../../Components/headerComponent/HeaderComponet'

const FAV_KEY = 'FAV_ITEMS'
const CART_KEY = 'CART_ITEMS'
const { height } = Dimensions.get('window')

export default function FavouritesScreen() {
    const [favItems, setFavItems] = useState<any[]>([])
    const [filteredItems, setFilteredItems] = useState<any[]>([])
    const [searchText, setSearchText] = useState('')
    const [sortType, setSortType] = useState('default')

    const flatListRef = useRef<FlatList>(null)

    useEffect(() => {
        loadFavourites()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [searchText, sortType, favItems])


    const loadFavourites = async () => {
        const data = await AsyncStorage.getItem(FAV_KEY)
        const items = data ? JSON.parse(data) : []
        setFavItems(items)
        setFilteredItems(items)
    }

    const removeFromFav = async (id: number) => {
        const updated = favItems.filter(item => item.id !== id)
        setFavItems(updated)
        await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated))
    }
    const addToCart = async (item: any) => {
        const existingCart = await AsyncStorage.getItem(CART_KEY)
        const cartItems = existingCart ? JSON.parse(existingCart) : []

        const existingIndex = cartItems.findIndex(
            (cartItem: any) => cartItem.id === item.id
        )

        if (existingIndex !== -1) {
            cartItems[existingIndex].quantity += 1
        } else {
            cartItems.push({ ...item, quantity: 1 })
        }

        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems))

        Alert.alert('Success', 'Product added to cart')
    }
    const applyFilters = () => {
        let data = [...favItems]

        if (searchText) {
            data = data.filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
            )
        }

        if (sortType === 'az') {
            data.sort((a, b) => a.title.localeCompare(b.title))
        }

        if (sortType === 'lowHigh') {
            data.sort((a, b) => a.price - b.price)
        }

        if (sortType === 'highLow') {
            data.sort((a, b) => b.price - a.price)
        }

        setFilteredItems(data)
    }


    useEffect(() => {
        if (filteredItems.length === 0) return

        let scrollIndex = 0

        const interval = setInterval(() => {
            if (!flatListRef.current) return

            scrollIndex++

            if (scrollIndex >= filteredItems.length) {
                scrollIndex = 0
            }

            flatListRef.current.scrollToIndex({
                index: scrollIndex,
                animated: true,
            })
        }, 4000)

        return () => clearInterval(interval)
    }, [filteredItems])

    return (
        <SafeAreaView style={globalStyles.container}>
            <HeaderComponent
                title={"FavouritesScreen"}
            />
            <TextInput
                placeholder="Search favourites..."
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchBar}
            />
            <View style={styles.sortContainer}>
                <TouchableOpacity
                    onPress={() => setSortType('az')}
                    style={sortBtnStyle}
                >
                    <Text>A–Z</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSortType('lowHigh')}
                    style={sortBtnStyle}
                >
                    <Text>Price ↑</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSortType('highLow')}
                    style={sortBtnStyle}
                >
                    <Text>Price ↓</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.favouriteScreen}>
                        No favourites added.
                    </Text>
                }
                getItemLayout={(data, index) => ({
                    length: 250,
                    offset: 250 * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <View
                        style={styles.addremoveConatiner}
                    >
                        <Image
                            source={{ uri: item.images[0] }}
                            style={styles.coursoleImage}
                            resizeMode="cover"
                        />

                        <Text style={styles.titleTxt}>
                            {item.title}
                        </Text>

                        <Text style={styles.priceTxt}>
                            ₹ {item.price}
                        </Text>

                        <View
                            style={styles.removeConatiner}
                        >
                            <TouchableOpacity
                                onPress={() => removeFromFav(item.id)}
                                style={styles.removeBtn}
                            >
                                <Text style={styles.removeTxt}>
                                    Remove
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => addToCart(item)}
                                style={styles.addtoCartTxt}
                            >
                                <Text style={styles.addtoCart}>
                                    Add to Cart
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const sortBtnStyle = {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
}
