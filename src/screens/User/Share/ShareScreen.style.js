import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    container: {
    },
    contactShare: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FBD160",
        margin: 20,
        borderRadius: 20,
    },

    avatar_url: {
        width: 50,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    info: {
        alignItems: "center",
    },

    detailTxt: {
        alignItems: "center",
        width: "auto",
    },

    userName: {
        fontSize: 18,
        color: "#3A3A3A",
    },
});