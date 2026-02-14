import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    sortContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    favouriteScreen: {
        marginTop: 20
    },
    addremoveConatiner: {
        marginBottom: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 10,
    },
    coursoleImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    titleTxt: {
        fontWeight: '600', fontSize: 16
    },
    priceTxt: {
        marginVertical: 4
    },
    removeConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    removeBtn: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 6,
    },
    addtoCartTxt: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 6,
    },
    headerTxt:{
        fontSize: 22, fontWeight: 'bold', marginBottom: 10
    },
    removeTxt:{
         color: 'white' 
    },
    addtoCart:{
        color: 'white'
    }   

})