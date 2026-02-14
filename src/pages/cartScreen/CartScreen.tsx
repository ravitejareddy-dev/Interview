import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import HeaderComponent from '../../Components/headerComponent/HeaderComponet'
import { globalStyles } from '../../utlis/global'

const CART_KEY = 'CART_ITEMS'
const FAV_KEY = 'FAV_ITEMS'

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [favItems, setFavItems] = useState<any[]>([])
 const navigation=useNavigation()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const cartData = await AsyncStorage.getItem(CART_KEY)
    const favData = await AsyncStorage.getItem(FAV_KEY)

    setCartItems(cartData ? JSON.parse(cartData) : [])
    setFavItems(favData ? JSON.parse(favData) : [])
  }

  const updateCartStorage = async (updatedCart: any[]) => {
    setCartItems(updatedCart)
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart))
  }

  const updateFavStorage = async (updatedFav: any[]) => {
    setFavItems(updatedFav)
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updatedFav))
  }

  const increaseQty = (id: number) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    updateCartStorage(updated)
  }

  const decreaseQty = (id: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id && item.quantity > item.minimumOrderQuantity) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })
    updateCartStorage(updated)
  }

  const removeItem = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id)
    updateCartStorage(updated)
  }

  const moveToFav = async (item: any) => {
    const existingIndex = favItems.findIndex(f => f.id === item.id)

    let updatedFav = [...favItems]
    if (existingIndex === -1) {
      updatedFav.push(item)
    }

    updateFavStorage(updatedFav)

    const updatedCart = cartItems.filter(i => i.id !== item.id)
    updateCartStorage(updatedCart)
    Alert.alert('Moved', 'Item moved to favourites')
  }

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <SafeAreaView style={globalStyles.container}>
       <HeaderComponent
      title={"My Cart"}
      />

      <Text style={styles.countText}>
        Total Items in Cart: {totalCartCount}
      </Text>

      <Text style={styles.countText}>
        Total Favourites: {favItems.length}
      </Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartEmptyTxt}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>Your cart is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.images && item.images.length > 0 && (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.courselImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.title}>{item.title}</Text>

            <Text>Price: ₹ {item.price}</Text>

            <Text>
              Subtotal: ₹ {item.price * item.quantity}
            </Text>

            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => decreaseQty(item.id)}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.cartQuantity}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => increaseQty(item.id)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.removeTxt}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favBtn}
                onPress={() => moveToFav(item)}
              >
                <Text>Move to Favourites</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {cartItems.length > 0 && (
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>
            Total Cart Price: ₹ {totalCartPrice.toFixed(2)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
