import { StyleSheet } from "react-native";


export const s = StyleSheet.create({
    header_nav: {
        paddingTop: 7,
        borderBottomColor: "#cccccc",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
        paddingBottom: 10,
        zIndex: 2
    },

    navContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    underline: {
        height: 2, 
        backgroundColor: '#FCB8D9',
        width: '70%',
        marginTop: 2,
    },

    nav_txt_active: {
        fontSize: 18
    },

    nav_txt: {
        fontSize: 18
    },
});