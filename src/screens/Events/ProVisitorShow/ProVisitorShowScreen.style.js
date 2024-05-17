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

    // BODY

    container: {
        marginTop: 120,
        justifyContent: "center",
        alignItems: "center",
    },

    avatar: {
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    name: {
        marginBottom: 8,
        fontSize: 35,
        color: "#A3A8AF",
        textTransform: "capitalize"
    },

    user_info: {
        flexDirection: "row",
        alignItems: "flex-end"
    },


    textContainer: {
        position: 'relative',
        
    },

    textflou: {
        zIndex: 0,
        position: "absolute",
        color: "#b4b3b3"
    },




})