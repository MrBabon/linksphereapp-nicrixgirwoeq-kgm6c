import { ScrollView, TouchableOpacity, View } from "react-native";
import { s } from "./RepertoireScreen.style";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import PlusCircle from "../../../assets/icons/PlusCircle";
import Envelope from "../../../assets/icons/Envelope";
import Spinner from "react-native-loading-spinner-overlay";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { ContactGroupsContext, ContactGroupsProvider } from "../../../context/ContactGroupsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RepertoireScreen = ({ navigation }) => {
    const {userInfo, userToken, isLoading} = useContext(AuthContext)
    // const {  } = useContext(ContactGroupsContext)
    const [contactGroups, setContactGroups] = useState([])

    const addButton = (
        <TouchableOpacity>
            <PlusCircle/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.header}>
            {addButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Groups</TxtJost>
            </View>
        </View>
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire`, {
                        headers: {
                            'Authorization': userToken
                        }
                    }).then(response => {
                        const fetchedGroups = response.data.contact_groups;
                        setContactGroups(fetchedGroups);
                        AsyncStorage.setItem('contactGroups', JSON.stringify(fetchedGroups))

                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userInfo.id])
    return (
        <>
            <Spinner/>
            <ContactGroupsProvider>
                {header}
                <ScrollView>
                    <View style={s.container}>
                        <TxtInria>Repertoire</TxtInria>
                        {contactGroups.map(group => (
                            <View key={group.id}>
                                <TxtInria>{group.name}</TxtInria>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ContactGroupsProvider>
        </>
    )
};


export default RepertoireScreen;