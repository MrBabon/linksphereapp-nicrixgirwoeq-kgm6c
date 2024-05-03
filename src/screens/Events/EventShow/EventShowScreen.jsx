import axios from "axios";
import { s } from "./EventShowScreen.style";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { AuthContext } from "../../../context/AuthContext";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Container } from "../../../components/Container/Container";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";

const EventShowScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext)
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/events/${eventId}`, {
                    header: { Authorization: userToken }
                });
                const data = response.data.data
                const event = data.attributes
                setEvent(event);
            } catch (e) {
                console.error('Failed to fetch event details: ', e);
            }
        };
        fetchEvent();
    }, [eventId]);


    if (!event) {
        return <TxtInria>Loading...</TxtInria>;
    }

    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Events</TxtJost>
                </View>
            </View>
            <View>
                <View style={s.header_nav}>
                    <TouchableOpacity style={s.navContainer}>
                        <TxtJostBold style={s.nav_txt_active}>All Upcoming Events</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TxtJost style={s.nav_txt}>My Events</TxtJost>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    return (
        <>
            {header}
                <ScrollView>
                    <View>
                        <TxtInria>{event.title}</TxtInria>
                        <TxtInria>TEXT</TxtInria>
                    </View>
                </ScrollView>

        </>
    )
}

export default EventShowScreen