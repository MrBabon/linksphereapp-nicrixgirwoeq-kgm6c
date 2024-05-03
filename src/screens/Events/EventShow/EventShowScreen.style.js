import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    // HEADER

    container_header: {
        zIndex: 1
    },

    header: {
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#1AC1B9",
        height: 110,
        paddingTop: 60,
        paddingHorizontal: 14,
        zIndex: 3
    },

    header_texts: {
        flex: 1,
        alignItems: "center",
        
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },

    header_nav: {
        paddingTop: 120,
        borderBottomColor: "#cccccc",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
        zIndex: 2
    },

    navContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    underline: {
        height: 3, 
        backgroundColor: '#FCB8D9',
        width: '40%',
        marginTop: 2,
    },
    
    nav_txt_active: {
        fontSize: 18
    },

    nav_txt: {
        fontSize: 18
    },


    // BODY

})