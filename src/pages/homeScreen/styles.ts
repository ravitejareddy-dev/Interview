import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    catogeryTxt: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10
    },
    imageOrientation: {
        height: 80,
        width: 100,
        alignSelf: "center",
    },
    itemContiner: {
        margin: 8,
        alignItems: "center",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: 10,
        padding: 20,

    },
    itemTxt: {
        textAlign: "center"
    },
    searchBarBox: {
        width: "99%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 15,
        alignSelf: "center"
    },
    itemDiscountTxt: {
        fontSize: 12,

    },
    sortTxt: {
        marginRight: 10,
        fontWeight: '600'
    },
    sortContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    sortItemTxt: {
        marginRight: 15
    },
    courselConatiner: {
        marginVertical: 30
    },
    dottedValues: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    itemContainer:{
        marginBottom: 20 
    }
})