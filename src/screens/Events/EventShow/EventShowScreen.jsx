import axios from "axios";
import { s } from "./EventShowScreen.style";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { AuthContext } from "../../../context/AuthContext";
import { TxtInria, TxtInriaBold, TxtInriaItalic } from "../../../components/TxtInria/TxtInria";
import { Image, ScrollView, TextInput, TouchableOpacity, View, Linking, Switch } from "react-native";
import { Container } from "../../../components/Container/Container";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../../components/TxtJost/TxtJost";
import CalendarEvent from "../../../assets/icons/CalendarEvent";
import MapPin from "../../../assets/icons/MapPin";
import { format, parseISO } from "date-fns";
import Globe from "../../../assets/icons/Globe";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { ModalEvent } from "../../../components/Modal/ModalEvent/ModalEvent";
import Checkbox from 'expo-checkbox';


const EventShowScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [event, setEvent] = useState(null);
    const [registrationCode, setRegistrationCode] = useState('');
    const [isChecked, setIsChecked] = useState(false);


    const openURL = () => {

        const url = 'https://www.cannesticket.com/fr/activites/festival-international-des-jeux';

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        }).catch(err => console.error('An error occured', err));
    }


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
    
    const handleParticipation = async () => {
        try {
            const payload = {
                visible_in_participants: isChecked,
                registration_code: registrationCode
            };
            const response = await axios.post(`${BASE_URL}events/${eventId}/participations`, payload, {
                headers: { Authorization: userToken }
            });
            if (response.status === 201) {
                console.log('Participation recorded successfully');
            } else {
                console.error('Failed to record participation');
            }
        } catch (e) {
            console.error('Error submitting participation:', e);
        }
    };
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
      };

    const handleTextChange = (text) => {
        setRegistrationCode(text.toUpperCase());
    };
    const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
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
            <View>
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
                                <MapPin />
                                <TxtInria>{event.city}, {event.country}</TxtInria>
                            </View>
                            <View style={s.cardInfo}>
                                <CalendarEvent />
                                <TxtInria>{format(parseISO(event.start_time), 'MMMM d')} to {format(parseISO(event.end_time), 'd')}</TxtInria>
                            </View>
                        </View>
                        <View style={s.cardLink}>
                            <Globe />
                            <TxtInriaBold style={s.txtLink}>{event.link}</TxtInriaBold>
                        </View>
                        <View style={s.cardDescription}>
                            <TxtInria style={s.txtdescription}>{event.description}</TxtInria>
                        </View>
                    </View>
                    <View style={s.viewbtn}>
                        <TouchableOpacity style={s.btn} onPress={() => setModalVisible(true)}>
                            <TxtJostSemiBold style={s.txtbtn}>Register</TxtJostSemiBold>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ModalEvent isVisible={modalVisible} onClose={() => setModalVisible(false)}>   
                    <Image source={{ uri: event.logo_url }} style={s.logoModal} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}/>
                    <TxtInriaBold style={s.confirmModal}>Please confirm you attendance at the {event.title}</TxtInriaBold>
                    <View style={s.infoContainer}>
                        <View style={s.cardInfo}>
                            <MapPin color="#F9447F" />
                            <TxtInriaBold style={s.txtinfo}>{event.city}, {event.country}</TxtInriaBold>
                        </View>
                        <View style={s.cardInfo}>
                            <CalendarEvent color="#F9447F" />
                            <TxtInriaBold style={s.txtinfo}>{format(parseISO(event.start_time), 'MMMM d')} to {format(parseISO(event.end_time), 'd')}</TxtInriaBold>
                        </View>
                    </View>
                    <View style={s.wraper}>
                        <TextInput
                            style={s.input}
                            placeholder="REGISTRATION CODE"
                            placeholderTextColor="#ccc"
                            value={registrationCode}
                            onChangeText={handleTextChange} />
                    </View>
                    <View style={s.infoAcces}>
                        <TxtInriaItalic style={s.infoTxt}>Your DigiCard registration code is provided to you in the confirmation email with your badge/ticket which gives you access to the event.</TxtInriaItalic>
                        <TxtInriaItalic style={s.infoQuestion}>Don’t have your badge yet ?</TxtInriaItalic>
                        <View style={s.link}>
                            <TxtInriaItalic style={s.infoTxt}>Get it here: </TxtInriaItalic>
                            <TouchableOpacity onPress={openURL}>
                                <TxtInriaItalic style={s.linkTxt}>{event.link}</TxtInriaItalic>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.ligne}></View>
                    <TouchableOpacity style={s.checkboxView}
                        onPress={toggleCheckbox}
                        activeOpacity={0.7}>
                        <Checkbox 
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? "#FBD160" : undefined}
                            style={s.checkbox} />
                        <TxtInriaItalic style={{marginLeft: 10, color: "#FFFFFF"}}>I accept to appear in the list of people present at the event. If you check this box, you will also have access to the list of registered people.</TxtInriaItalic>
                    </TouchableOpacity>
                    <View style={s.viewBtn}>
                        <TouchableOpacity style={s.btnConfirm} onPress={handleParticipation}>
                            <TxtJostBold style={s.btntxt}>Confirm</TxtJostBold>
                        </TouchableOpacity>
                    </View>
                </ModalEvent>
            </View>

        </>
    )
}

export default EventShowScreen