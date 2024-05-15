import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold } from "../../../components/TxtInria/TxtInria";
import { s } from "./ExhibitorShowScreen.style";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Image } from "react-native";
import Instagram from "../../../assets/icons/Instagram";
import Twitter from "../../../assets/icons/Twitter";
import Linkedin from "../../../assets/icons/Linkedin";
import Facebook from "../../../assets/icons/Facebook";
import Globe from "../../../assets/icons/Globe";
import ChevronRight from "../../../assets/icons/ChevronRight";

const ExhibitorShowScreen = ({ route, navigation }) => {
    const { eventId, exhibitorId } = route.params;
    
    const { userInfo, userToken } = useContext(AuthContext);
    const [entreprise, setEntreprise] = useState({})
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
                    <TxtJost style={s.txtheader}>Informations</TxtJost>
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
        

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}events/${eventId}/exhibitors/${exhibitorId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data.data
                    const entreprise = data.attributes
                    setEntreprise(entreprise)
                }
            } catch(e){
                console.error('Error fetching exhibitor:', e);
            }
        }
        fetchData();
    },[eventId, exhibitorId, userToken])

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                <View style={s.containerInfo}>
                    <Image source={{uri: entreprise.logo_url}}  style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                    <View>
                        <View style={s.containerSocial}>
                            <View style={s.viewIcon}>
                                <Twitter url={entreprise.twitter} color={"#FFFFFF"} />
                            </View>
                            <View style={s.viewIcon}>
                                <Linkedin url={entreprise.linkedin} color={"#FFFFFF"}  />
                            </View>
                            <View style={s.viewIcon}>
                                <Facebook url={entreprise.facebook} color={"#FFFFFF"} style={s.iconSocialF} />
                            </View>
                            <View style={s.viewIcon}>
                                <Instagram url={entreprise.instagram} color={"#FFFFFF"} style={s.iconSocialI} />
                            </View>
                        </View>
                        <View style={s.entrepriseInfo}>
                            <Globe url={entreprise.website} color="#FBD160" />
                            <TxtInriaBold style={s.website} >{entreprise.website}</TxtInriaBold>
                        </View>
                    </View>
                </View>
                <View style={s.container}>
                    <TxtJostBold style={s.name}>{entreprise.name}</TxtJostBold>
                    <TxtInria style={s.description}>{entreprise.description}</TxtInria>
                <TouchableOpacity style={s.linkShow} onPress={() => navigation.navigate('Entreprise', {entrepriseId: entreprise.id})}>
                    <ChevronRight color="#F9447F"/>
                    <TxtJostSemiBold style={s.linkTxt}>View business page</TxtJostSemiBold>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}


export default ExhibitorShowScreen;