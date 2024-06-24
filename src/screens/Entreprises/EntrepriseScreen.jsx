import { useContext, useEffect, useState } from "react";
import { TxtInria, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { s } from "./EntrepriseScreen.style";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import Spinner from "react-native-loading-spinner-overlay";
import { TxtJost, TxtJostBold } from "../../components/TxtJost/TxtJost";
import PlusCircle from "../../assets/icons/PlusCircle";

const EntrepriseScreen = ({ route, navigation }) => {
    const { entrepriseId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [entreprise, setEntreprise] = useState({})

    const backbutton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )
    const plusButton = (
        <TouchableOpacity>
            <PlusCircle/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backbutton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Entreprise</TxtJost>
                </View>
                {plusButton}
            </View>
            <View style={s.viewBanner}>
                <Image source={{uri: entreprise.banner_url}} style={s.banner}  onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                <View style={s.standView}>
                        <TouchableOpacity style={s.btnsend}>
                            <TxtInria style={s.send}>Send us your details</TxtInria>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}entreprises/${entrepriseId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data.data
                    const entreprise = data.attributes
                    setEntreprise(entreprise)
                }
            } catch(e) {

            }
        }
        fetchData();
    }, [entrepriseId, userToken])
    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                <View style={s.container}>
                    <TxtJostBold style={s.name}>{entreprise.name}</TxtJostBold>
                    <TxtInria style={s.headline}>{entreprise.headline}</TxtInria>
                    <TxtInriaLight style={s.industry}>{entreprise.industry}</TxtInriaLight>
                    <View style={s.containerDetail}>
                        <TxtInria>{entreprise.description}</TxtInria>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}


export default EntrepriseScreen;