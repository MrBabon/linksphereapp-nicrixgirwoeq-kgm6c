import { useContext, useEffect, useState } from "react";
import { TxtInria, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { s } from "./EntrepriseScreen.style";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TxtJost, TxtJostBold } from "../../components/TxtJost/TxtJost";
import Header from "../../components/Header/Header";

const EntrepriseScreen = ({ route, navigation }) => {
    const { entrepriseId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [entreprise, setEntreprise] = useState({})

    const addEntreprise = async() => {
        try {
            const response = await api.post(`/entreprises/${entrepriseId}/add_to_repertoire`, {}, {
                headers: { Authorization: userToken }
            });
            const data = response.data.data;
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/entreprises/${entrepriseId}`, {
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
            <Header
                title="Entreprise"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
                showAddEntreprise={true}
                onAddEntreprisePress={() => addEntreprise()}>
                <View style={s.viewBanner}>
                    <Image source={{uri: entreprise.banner_url}} style={s.banner}  onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                    <View style={s.standView}>
                            <TouchableOpacity style={s.btnsend}>
                                <TxtInria style={s.send}>Send us your details</TxtInria>
                            </TouchableOpacity>
                    </View>
                </View>
            </Header>
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