import { StyleSheet } from "react-native"


export const s = StyleSheet.create({ 

    // HEADER

    header: {
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#368FE6",
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
        backgroundColor: "#368FE6",
        height: "auto",
        paddingVertical: 130,
    },

    card: {
        backgroundColor: "#F4F4F4",
        marginHorizontal: 16,
        borderRadius: 18,
    },



    section_card:{
        marginVertical: 16,
        marginHorizontal: 14
    },

    lign: {
        height: 1,
        backgroundColor: "grey",
        opacity: 0.5
    },

    name: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 14,
    },

    username: {
        fontSize: 24,
        textTransform: "capitalize"
    },

    btn:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    title: {
        marginBottom: 10
    },

    txt: {
        fontSize: 21,
        marginVertical: 8
    },

    container_log_out:{
        alignItems: "center",
        marginBottom: 60,
        marginTop: 20
    },

    txt_log_out:{
        color: "#368FE6",
        fontSize: 25,
        marginLeft:3
    },

    btn_log_out: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFD115",
        padding: 7,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

})