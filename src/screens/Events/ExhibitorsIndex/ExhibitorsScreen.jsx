import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold, TxtInriaItalic } from "../../../components/TxtInria/TxtInria";
import { s } from "./ExhibitorsScreen.style";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Spinner from "react-native-loading-spinner-overlay";
import { ModalVisiblePro } from "../../../components/Modal/ModalVisiblePro/ModalVisiblePro";
import Danger from "../../../assets/icons/Danger";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const ExhibitorsScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [exhibitors, setExhibitors] = useState([]);
    const [events, setEvents] = useState([]);
    const [participationId, setParticipationId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [modalVisiblePro, setModalVisiblePro] = useState(false);


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
                <TouchableOpacity style={s.navContainer}>
                    <TxtJostBold style={s.nav_txt_active}>Exhibitors</TxtJostBold>
                    <View style={s.underline}></View>
                </TouchableOpacity>
                {!isChecked ? (
                    <TouchableOpacity  onPress={() => setModalVisiblePro(true)}>
                        <TxtJost>Professional Visitors</TxtJost>
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('ProVisitors', { eventId: eventId })}>
                        <TxtJost>Professional Visitors</TxtJost>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity>
                {/* Mettre une search bar pour chercher une entreprise */}
            </TouchableOpacity>
        </View>
    )

    const toggleCheckbox = async () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        
        // Sauvegarder l'état dans AsyncStorage
        await AsyncStorage.setItem(`event_${eventId}_visible_in_participants`, newCheckedState ? 'true' : 'false');
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}events/${eventId}/exposant`, {
                        header: { Authorization: userToken }
                    });
                    const event = response.data.data
                    const includedData = response.data.included;
                    const exhibitorCompanies = includedData.filter(item => item.type === "entreprise");
                    const storedCheckedState = await AsyncStorage.getItem(`event_${eventId}_visible_in_participants`);
                    setIsChecked(storedCheckedState === 'true');
                    setExhibitors(exhibitorCompanies);
                    setEvents(event);
                }

            } catch(e) {
                console.error('Error fetching exhibitors:', e);
            }
        }
        fetchData();
    }, [eventId, userToken]);

    const updateParticipation = async () => {
        if (!isChecked) {
            showMessage({
                message: "The checkbox is not checked, update aborted.",
                type: "warning",
                duration: 4000
            });
            setModalVisiblePro(false)
            return; 
        }
        
        let participationId = await AsyncStorage.getItem(`event_${eventId}_participation_id`)
        setParticipationId(participationId)
        try {
            const payload = {
                visible_in_participants: isChecked
            };
            const response = await axios.patch(`${BASE_URL}events/${eventId}/participations/${participationId}`, payload, {
                headers: { Authorization: userToken }
            });
            if (response.status === 200) {
                showMessage({
                    message: "Participation update successfully",
                    type: "success",
                    duration: 4000
                });
            }
        } catch(e) {
            console.error('Error updating participation:', e);
            showMessage({
                message: "Error updating participation.",
                type: "danger",
                duration: 4000
            });
        }
        setModalVisiblePro(false)
    }

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                {exhibitors.map(exhibitor => (
                        <View key={exhibitor.id}>
                            <TouchableOpacity style={s.card}>
                                <View style={s.cardImg}>
                                    <Image source={{ uri: exhibitor.attributes.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                                </View>
                                <View style={s.containerInfo}>
                                    <TxtInriaBold style={s.name}>{exhibitor.attributes.name}</TxtInriaBold>
                                    <TxtInria style={s.headline}>{exhibitor.attributes.headline}</TxtInria>
                                    <TxtInria style={s.industry}>{exhibitor.attributes.industry}</TxtInria>
                                </View>
                                <View style={s.standView}>
                                    <TxtInriaBold style={s.stand}>Stand 04.09</TxtInriaBold>
                                </View>
                            </TouchableOpacity>
                            <View style={s.border}></View>
                        </View>
                ))}
            </ScrollView>
            <ModalVisiblePro isVisible={modalVisiblePro} onClose={() => setModalVisiblePro(false)}>
                <View>
                    <Danger/>
                </View>

                <View>
                    <TxtInria style={s.infoNotAccess}>You do not have access to the room list .</TxtInria>
                </View>
                <TouchableOpacity style={s.checkboxView}
                    onPress={toggleCheckbox}
                    activeOpacity={0.7}>
                    <Checkbox 
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#FBD160" : undefined}
                        style={s.checkbox} />
                    <TxtInriaItalic style={{marginLeft: 10, color: "#FFFFFF", fontSize: 14}}>I accept to appear in the list of people present at the event. If you check this box, you will also have access to the list of registered people.</TxtInriaItalic>
                </TouchableOpacity>
                <View style={s.viewBtn}>
                    <TouchableOpacity style={s.btnConfirm} onPress={updateParticipation}>
                        <TxtJostBold style={s.btntxt}>Confirm</TxtJostBold>
                    </TouchableOpacity>
                </View>
            </ModalVisiblePro>
        </>
    )
}

export default ExhibitorsScreen;