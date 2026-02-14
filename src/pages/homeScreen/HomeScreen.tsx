import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../utlis/global'
import { truncateString } from '../../utlis/truncation'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import HeaderComponent from '../../Components/headerComponent/HeaderComponet'

const { width } = Dimensions.get('window')

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const [sortType, setSortType] = useState('default')
  const [activeIndex, setActiveIndex] = useState(0)

  const navigation = useNavigation()
  const carouselRef = useRef<FlatList>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        console.log('Error:', err)
      }
    }
    fetchData()
  }, [])


  const sortedProducts = useMemo(() => {
    let data = [...products]

    if (sortType === 'az') {
      data.sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sortType === 'lowHigh') {
      data.sort((a, b) => a.price - b.price)
    }

    if (sortType === 'highLow') {
      data.sort((a, b) => b.price - a.price)
    }

    return data
  }, [products, sortType])


  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return sortedProducts

    return sortedProducts.filter(
      item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [searchText, sortedProducts])


  const categorizedProducts = useMemo(() => {
    const result: any = {}

    sortedProducts.forEach(item => {
      if (!result[item.category]) {
        result[item.category] = []
      }
      result[item.category].push(item)
    })

    return result
  }, [sortedProducts])
  const groceriesData = categorizedProducts['groceries'] || []


  useEffect(() => {
    if (groceriesData.length === 0) return

    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1
      if (nextIndex >= groceriesData.length) {
        nextIndex = 0
      }

      carouselRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      })

      setActiveIndex(nextIndex)
    }, 3000)

    return () => clearInterval(interval)
  }, [activeIndex, groceriesData])

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContiner}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen' as never, {
          productData: item,
        } as never)
      }
    >
      <Image
        style={styles.imageOrientation}
        source={{ uri: item.images[0] }}
      />
      <Text style={styles.itemTxt}>
        {truncateString(item.title, 8)}
      </Text>
      <Text style={styles.itemTxt}>Price:- {item.price}</Text>
      <Text style={styles.itemDiscountTxt}>
        Discount {item.discountPercentage}%
      </Text>
      <Text style={styles.itemTxt}>Rating:- {item.rating}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={globalStyles.container}>

      <HeaderComponent
        title={"HomeScreen"}
      />

      <View style={styles.searchBarBox}>
        <TextInput
          placeholder="Search by title or category..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortTxt}>
          Sort:
        </Text>

        <TouchableOpacity onPress={() => setSortType('az')}  >
          <Text style={styles.sortItemTxt}>A–Z</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortType('lowHigh')}>
          <Text style={styles.sortItemTxt}>Price ↑</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortType('highLow')}>
          <Text>Price ↓</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        {!searchText.trim() && groceriesData.length > 0 && (
          <View style={styles.courselConatiner} >
            <FlatList
              ref={carouselRef}
              data={groceriesData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.images[0] }}
                  style={{
                    width: width,
                    height: 200,
                  }}
                  resizeMode="cover"
                />
              )}
              onMomentumScrollEnd={event => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                )
                setActiveIndex(index)
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              {groceriesData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dottedValues
                    , {
                      backgroundColor:
                        activeIndex === index ? 'black' : '#ccc',
                    }
                  ]}
                />
              ))}
            </View>
          </View>
        )}
        {searchText.trim() ? (
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(categorizedProducts).map(category => (
              <View key={category} style={styles.itemContainer}>
                <Text style={styles.catogeryTxt}>
                  {category.toUpperCase()}
                </Text>

                <FlatList
                  data={categorizedProducts[category]}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
