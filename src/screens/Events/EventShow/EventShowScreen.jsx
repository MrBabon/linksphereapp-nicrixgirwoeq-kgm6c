import axios from "axios";
import { s } from "./EventShowScreen.style";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { AuthContext } from "../../../context/AuthContext";
import { TxtInria, TxtInriaBold } from "../../../components/TxtInria/TxtInria";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Container } from "../../../components/Container/Container";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../../components/TxtJost/TxtJost";
import CalendarEvent from "../../../assets/icons/CalendarEvent";
import MapPin from "../../../assets/icons/MapPin";
import { format, parseISO } from "date-fns";
import Globe from "../../../assets/icons/Globe";

const EventShowScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext)
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${BASE_URL}events/${eventId}`, {
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
                    <View style={s.card}>
                        <View style={s.cardImg}>
                            <Image source={{ uri: event.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}/>
                        </View>
                        <View style={s.cardTitle}>
                            <TxtJostBold>{event.title}</TxtJostBold>
                        </View>
                        <View style={s.infoContainer}>
                            <View style={s.cardInfo}>
                                <CalendarEvent />
                                <TxtInria>{event.city}, {event.country}</TxtInria>
                            </View>
                            <View style={s.cardInfo}>
                                <MapPin />
                                <TxtInria>{format(parseISO(event.start_time), 'd')} to {format(parseISO(event.end_time), 'd MMMM')}</TxtInria>
                            </View>
                        </View>
                        <View style={s.cardLink}>
                            <Globe />
                            <TxtInriaBold style={s.txtLink}>{event.link}</TxtInriaBold>
                        </View>
                        <View style={s.cardDescription}>
                            <TxtInria>{event.description}</TxtInria>
                        </View>
                    </View>
                    <View style={s.viewbtn}>
                        <TouchableOpacity style={s.btn}>
                            <TxtJostSemiBold style={s.txtbtn}>Register</TxtJostSemiBold>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

        </>
    )
}

export default EventShowScreen