import { StyleSheet } from "react-native";


export const s = StyleSheet.create({
    container: {
        paddingTop: 150,
        position: "absolute",
        width: "100%",
        backgroundColor: "#FFFFFF",
        zIndex: 1
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
    },
    toggleButton: {
        padding: 10,
    },
    filters: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    }
})

