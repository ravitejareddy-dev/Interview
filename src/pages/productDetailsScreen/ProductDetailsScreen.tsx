import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { globalStyles } from '../../utlis/global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CART_KEY, FAV_KEY } from '../../utlis/constants'
import { styles } from './styles'
import HeaderComponent from '../../Components/headerComponent/HeaderComponet'





export default function ProductDetailsScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { productData } = route?.params as any

  const [expanded, setExpanded] = useState(false)
  const [quantity, setQuantity] = useState(productData.minimumOrderQuantity)


  const handleAddToCart = async () => {
    try {
      if (quantity < productData.minimumOrderQuantity) {
        Alert.alert(
          'Minimum Order Required',
          `You must order at least ${productData.minimumOrderQuantity} items.`
        )
        return
      }

      const existingCart = await AsyncStorage.getItem(CART_KEY)
      const cartItems = existingCart ? JSON.parse(existingCart) : []

      const existingIndex = cartItems.findIndex(
        (item: any) => item.id === productData.id
      )

      if (existingIndex !== -1) {
        cartItems[existingIndex].quantity += quantity
      } else {
        cartItems.push({
          ...productData,
          quantity: quantity,
        })
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems))
      navigation.navigate("CartScreen" as never)

    } catch (error) {
      console.log('Cart Error:', error)
    }
  }

  const handleAddToFav = async () => {
    try {
      const existingFav = await AsyncStorage.getItem(FAV_KEY)
      const favItems = existingFav ? JSON.parse(existingFav) : []

      const existingIndex = favItems.findIndex(
        (item: any) => item.id === productData.id
      )

      if (existingIndex !== -1) {
          navigation.navigate("FavouritesScreen")

        return
      }

      favItems.push(productData)

      await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favItems))

      navigation.navigate("FavouritesScreen")

      Alert.alert('Success', 'Product added to favourites!')

    } catch (error) {
      console.log('Fav Error:', error)
    }
  }

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={['top', 'bottom', 'left', 'right']}
    >
       <HeaderComponent
      title={"Product details"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

        <FlatList
          data={productData.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.curoselImage}
            />
          )}
        />

        <View style={styles.dataContainer}>

          <Text style={styles.titleTxt}>
            {productData.title}
          </Text>

          <Text style={styles.brandtxt}>
            Brand: {productData.brand}
          </Text>

          <Text style={styles.priceTxt}>
            ₹ {productData.price}
          </Text>

          <Text style={{ fontSize: 16 }}>
            ⭐ {productData.rating} / 5
          </Text>

          <Text
            style={styles.descriptionTxt}
            numberOfLines={expanded ? undefined : 3}
          >
            {productData.description}
          </Text>

          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.showMoreLess}>
              {expanded ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.warantyTxt}>
            Warranty: {productData.warrantyInformation}
          </Text>

          <Text style={styles. returnPolicy}>
            Return Policy: {productData.returnPolicy}
          </Text>

          <Text style={styles.minimumOrder}>
            Minimum Order Quantity: {productData.minimumOrderQuantity}
          </Text>

          <View
            style={styles.addtoCartContainer}
          >
            <TouchableOpacity
              onPress={handleAddToCart}
              style={styles.addToCartBtn}
            >
              <Text style={styles.addToCartTxt}>
                Add to Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddToFav}
              style={styles.favourtieValues}
            >
              <Text style={styles.addFavouriteTxt}>
                Add to Favourites
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.reviewTxt}
          >
            Reviews
          </Text>

          {productData.reviews.map((review: any, index: number) => (
            <View
              key={index}
              style={styles.ratingContainer}
            >
              <Text style={styles.reviewContext}>
                {review.reviewerName}
              </Text>
              <Text>⭐ {review.rating}</Text>
              <Text style={styles.reviewContent}>
                {review.comment}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
