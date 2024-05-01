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
        zIndex: 2
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
        paddingBottom: 10,
        borderBottomColor: "#cccccc",
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
        zIndex: 1
    },

    navContainer: {
        alignItems: 'center',  // Centre les éléments horizontalement
        justifyContent: 'center',  // Centre les éléments verticalement
    },

    underline: {
        height: 3, // Hauteur de la ligne
        backgroundColor: '#FCB8D9', // Couleur rose
        width: '40%', // Largeur relative à la taille du texte
        marginTop: 2, // Un peu d'espace entre le texte et la ligne
    },
    
    nav_txt_active: {
        fontSize: 18
    },

    nav_txt: {
        fontSize: 18
    },

    // BODY

    container: {
        marginTop: 200,
        marginBottom: 130
    },

    card: {
        padding: 20,
        
    },

    cardImg: {
        alignItems: "center"
    },

    logo: {
        width: "100%",
        maxWidth: 200,
        height: 90,
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

    border: {
        height: 1,
        backgroundColor: "#cccccc80"
    }
})