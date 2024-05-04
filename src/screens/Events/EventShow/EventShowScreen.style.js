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
    card: {
        padding: 10,
        
    },

    cardImg: {
        alignItems: "center"
    },

    logo: {
        width: "100%",
        maxWidth: 230,
        height: 130,
        resizeMode: 'contain',
    },

    cardTitle: {
        alignItems: "center",
        paddingVertical: 10
    },

    infoContainer: {
        width: "100%",
        maxWidth: 440,
        alignSelf: 'center',
        marginHorizontal: "auto",
    },

    cardInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        justifyContent: "center"
    },

    cardLink: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
    },

    txtLink: {
        fontSize: 16,
        marginLeft: 4
    },
    cardDescription: {
        margin: 4
    },

    viewbtn: {
        marginHorizontal: 110
    },

    btn: {
        marginBottom: 170,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBD160",
        borderRadius: 16,
        paddingVertical: 4,         
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },

    txtbtn: {
        textTransform: "uppercase",
        color: "#1AC1B9"
    }

})