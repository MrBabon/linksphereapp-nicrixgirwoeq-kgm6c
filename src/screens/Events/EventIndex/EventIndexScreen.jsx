import { s } from "./EventIndexScreen.style";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold } from "../../../components/TxtInria/TxtInria";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import CalendarEvent from "../../../assets/icons/CalendarEvent";
import MapPin from "../../../assets/icons/MapPin";
import { EventSearch } from "../../../components/forms/EventSearch/EventSearch";


const EventIndexScreen = ({ navigation }) => {
    const { userInfo, userToken } = useContext(AuthContext)
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false);
    
    const toggleFilters = () => setVisible(!visible);
    const header = (
        <>
            <View style={s.header}>
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Events</TxtJost>
                </View>
            </View>
            <View style={s.header_nav}>
                <TouchableOpacity style={s.navContainer}>
                    <TxtJostBold style={s.nav_txt_active}>All Upcoming Events</TxtJostBold>
                    <View style={s.underline}></View>

                </TouchableOpacity>
                <TouchableOpacity>
                    <TxtJost style={s.nav_txt}>My Events</TxtJost>
                </TouchableOpacity>
            </View>
            <EventSearch onSearch={handleSearch}/>
        </>
    )

    const handleSearch = async (searchParams) => {
        try {
            const response = await axios.get(`${BASE_URL}events`, {
              params: searchParams,
              headers: { Authorization: userToken }
            });
            setEvents(response.data); // Assumez que la réponse contient les événements filtrés
        } catch (error) {
        console.error("Failed to fetch events:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}events`, {
                        headers: {
                            'Authorization': userToken
                        }
                    }).then(response => {
                        let allEvents = [];
                        for (const dateKey in response.data) {
                            // Assuming each date key directly contains an object with 'data' that is an array of events
                            const dayEvents = response.data[dateKey].data;
                            allEvents = [...allEvents, ...dayEvents.map(event => ({
                                ...event.attributes,
                                id: event.id,
                                month: format(parseISO(event.attributes.start_time), 'MMMM yyyy')
                            }))];
                        }
                        const groupedEvents = allEvents.reduce((acc, event) => {
                            acc[event.month] = acc[event.month] || [];
                            acc[event.month].push(event);
                            return acc;
                        }, {});
                        setEvents(groupedEvents);
                    })
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [userInfo, userToken])

    return (
        <>
            <Spinner/>
            {header}
                <ScrollView>
                    <View style={s.container}>
                        {Object.entries(events).map(([month, eventsOfMonth]) => (
                            <React.Fragment key={month}>
                                <TxtInria style={s.monthHeader}>{month}</TxtInria>
                                {eventsOfMonth.map(event => (
                                    <TouchableOpacity key={event.id}>
                                        <View style={s.card}>
                                            <View style={s.cardImg}>
                                                <Image source={{ uri: event.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
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
                                        </View>
                                        <View style={s.border}></View>
                                    </TouchableOpacity>
                                ))}
                        </React.Fragment>
                    ))}
                    </View>
                </ScrollView>
        </>
    )
}

export default EventIndexScreen;