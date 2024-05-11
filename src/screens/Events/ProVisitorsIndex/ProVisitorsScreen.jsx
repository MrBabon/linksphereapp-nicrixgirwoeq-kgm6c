import { TouchableOpacity, View, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.js";
import { BASE_URL } from "../../../config.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { s } from "./ProVisitorsScreen.style";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import Avatar from "../../../assets/icons/Avatar.js"

const ProVisitorsScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
      // Header
      const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft />
        </TouchableOpacity>
    );
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Meet contacts</TxtJost>
                </View>
            </View>
            <View style={s.header_nav}>
                <TouchableOpacity onPress={() => navigation.navigate('Exhibitors', { eventId: eventId })}>
                    <TxtJost>Exhibitors</TxtJost>
                </TouchableOpacity>
                <TouchableOpacity style={s.navContainer} onPress={() => navigation.navigate('ProVisitors')}>
                    <TxtJostBold style={s.nav_txt_active}>Professional Visitors</TxtJostBold>
                    <View style={s.underline}></View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                {/* Mettre une search bar pour chercher un user */}
            </TouchableOpacity>
        </View>
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedCheckedState = await AsyncStorage.getItem(`event_${eventId}_visible_in_participants`);
                const isVisible = storedCheckedState === 'true';
                if (userInfo && userToken && isVisible) {
                    const response = await axios.get(`${BASE_URL}events/${eventId}/visitor`, {
                        header: { Authorization: userToken }
                    });
                    const userParticipant = response.data.included;
                    setUsers(userParticipant);
                } else {
                    console.warn("User does not have permission or is not visible in participants.");
                }
            } catch (e) {
                console.error('Error fetching exhibitors:', e);
            }
        }
        fetchData();
    }, [eventId, userToken]);

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                {users.map(user => (
                    <View key={user.id}>
                        <TouchableOpacity style={s.card}>
                            <View style={s.containerInfo}>
                                <TxtInria>{user.attributes.first_name} {user.attributes.last_name}</TxtInria>
                                <TxtInria style={s.job}>{user.attributes.job ? user.attributes.job : "Job not specified"}</TxtInria>
                                <TxtInria style={s.industry}>{user.attributes.industry ? user.attributes.industry : "Industry not specified"}</TxtInria>
                            </View>
                            <View style={s.cardAvatar}>
                                <Avatar uri={user.attributes.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default ProVisitorsScreen;