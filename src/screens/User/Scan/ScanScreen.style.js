import { StyleSheet } from "react-native";


export const s = StyleSheet.create({
    // HEADER

    header: {
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#1AC1B9",
        height: 110,
        paddingTop: 60,
        paddingHorizontal: 14,
        zIndex: 1
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
    
    // BODY

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
    },
})