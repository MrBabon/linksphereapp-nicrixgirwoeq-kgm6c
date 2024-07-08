import { s } from "./EntrepriseContactScreen.style";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../../components/Header/Header";
import { TxtJost, TxtJostBold } from "../../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { EntrepriseSearch } from "../../../../components/forms/EntrepriseSearch/EntrepriseSearch";
import api from "../../../../config";
import { set } from "date-fns";

const EntrepriseContactScreen = ({ navigation }) => {
    const {userInfo, userToken} = useContext(AuthContext);
    const [entreprises, setEntreprises] = useState([]);
    const [entreprisesSearch, setEntreprisesSearch] = useState([]);

    const onEntrepriseSearch = (entrepriseName) => {
        if (entrepriseName) {
            const queryString = `?search=${entrepriseName}`
            fetchEntreprises(queryString);
            console.log(queryString);
        } else {
            console.log("Entreprise pas trouvé");
            setEntreprisesSearch([]);
        }
    }

    const fetchEntreprises = async (queryString) => {
        try {
            const response = await api.get(`/users/${userInfo.id}/entreprise_contact${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allEntreprises = response.data.entreprises.map(entreprise => entreprise.attributes);

            setEntreprisesSearch(allEntreprises);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {
                const response = await api.get(`/users/${userInfo.id}/entreprise_contact`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const data = response.data.entreprises.map(entreprise => entreprise.attributes);
                setEntreprises(data);
                
            }
        } catch(e) {

        }
    }
    useEffect(() => {
        fetchData();
    }, [userInfo, userToken])

  return (
    <>
        <Spinner />
        <Header
            title={"Groups"}>
            <View>
                <View style={s.header_nav}>
                    <TouchableOpacity style={s.navContainer} onPress={() => navigation.navigate('Repertoire')}>
                        <TxtJost style={s.nav_txt_active}>My Cards</TxtJost>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.navContainer}>
                        <TxtJostBold style={s.nav_txt}>Entreprises</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                </View>
                <EntrepriseSearch onEntrepriseSearch={onEntrepriseSearch} />
            </View>
        </Header>
        <ScrollView>
            <View>
                {entreprisesSearch.length > 0 ? (
                    entreprisesSearch.map(entreprise => (
                        <View key={entreprise.id}>
                            <Text>{entreprise.name}</Text>
                        </View>
                    ))
                ) : (
                    entreprises.map(entreprise => (
                        <View key={entreprise.id}>
                            <Text>{entreprise.name}</Text>
                        </View>
                    ))
                )
                }
                
            </View>
        </ScrollView>
    </>
  );
}

export default EntrepriseContactScreen;