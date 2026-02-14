import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
    curoselImage: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    dataContainer: {
        padding: 15
    },
    titleTxt: {
        fontSize: 22, fontWeight: 'bold'
    },
    brandtxt: {
        fontSize: 16, color: 'grey', marginVertical: 4
    },
    priceTxt: {
        fontSize: 20, fontWeight: '600', marginVertical: 6
    },
    addToCartBtn: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    addToCartTxt: {
        color: 'white', fontWeight: '600'
    },
    favourtieValues: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    addFavouriteTxt: {
        fontWeight: '600'
    },
    reviewTxt: {
        marginTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
    },
    ratingContainer: {
        marginTop: 12,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    reviewContent: {
        marginTop: 4
    },
    reviewContext: {
        fontWeight: '600'
    },
    addtoCartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    descriptionTxt:{
        marginTop: 10, fontSize: 15
    },
    warantyTxt:{
        marginTop: 12, fontSize: 15 
    },
    returnPolicy:{
        marginTop: 6,
         fontSize: 15
    },
    minimumOrder:{
        marginTop: 6, 
        fontSize: 15 
    },
    showMoreLess:{
         color: 'blue', marginTop: 4 
    }

})