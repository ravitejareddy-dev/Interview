import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    countText: {
        fontSize: 14,
        marginBottom: 5,
    },
    card: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    qtyBtn: {
        backgroundColor: '#ddd',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
    },
    removeBtn: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 6,
    },
    favBtn: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 6,
    },
    totalBox: {
        padding: 15,
        borderTopWidth: 1,
        marginTop: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    courselImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    cartQuantity:{
        marginHorizontal: 10
    },
    removeTxt:{
        color: 'white'
    },
    cartEmptyTxt:{
        paddingBottom: 20 
    }

})