import { s } from "./ProfilScreen.style";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../../components/TxtInria/TxtInria";
import { Button, View, TouchableOpacity, ScrollView } from "react-native";
// LOGO
import Settings from '../../../assets/icons/Settings';
import Avatar from "../../../assets/icons/Avatar";
import Phone from "../../../assets/icons/Phone";
import Mail from "../../../assets/icons/Mail";
import Globe from "../../../assets/icons/Globe";
import Twitter from "../../../assets/icons/Twitter";
import Instagram from "../../../assets/icons/Instagram";
import Linkedin from "../../../assets/icons/Linkedin";
import Facebook from "../../../assets/icons/Facebook";
import Envelope from "../../../assets/icons/Envelope";


const ProfilScreen = ({ navigation }) => {
    const {userInfo, logout, isLoading} = useContext(AuthContext);

    const settingButton = (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Settings/>
        </TouchableOpacity>
    );

    const chatroomButton = (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Envelope/>
        </TouchableOpacity>
    )

    const header = (
        
        <View style={s.header}>
            {settingButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Your Account</TxtJost>
            </View>
            {chatroomButton}
        </View>
    );

    return (
        <>
            <Spinner visible={isLoading} />
                {header} 
                    <ScrollView>
                        <View style={s.container_avatar}>
                            <View style={s.avatar}>
                                <Avatar />
                            </View>
                        </View>
                        <View style={s.container}>
                            <TxtInria style={s.user_name}>{userInfo.first_name} {userInfo.last_name}</TxtInria>
                            <View style={s.user_info}>
                                <Phone />
                                <TxtInria style={s.info}>{userInfo.phone}</TxtInria>
                            </View>
                            <View style={s.user_info}>
                                <Mail />
                                <TxtInria style={s.info}>{userInfo.email}</TxtInria>
                            </View>
                            <View style={s.user_info}>
                                <Globe />
                                <TxtInria style={s.info}>{userInfo.website}</TxtInria>
                            </View>
                        </View>
                        <View style={s.social}>
                            <Twitter />
                            <Linkedin />
                            <Facebook />
                            <Instagram />
                        </View>
                        <View style={s.yellow}></View>
                        <View style={s.detail}>
                            <TxtInriaBold style={s.job}>Freelancer, Philanthropist (Job)</TxtInriaBold>
                            <TxtInriaLight style={s.industry}>Industry (Technology)</TxtInriaLight>
                            <TxtInria style={s.entreprise}>Nom de l'entreprise</TxtInria>
                            <TxtInria style={s.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. FIN</TxtInria>
                        </View>
                    </ScrollView>
            
        </>
    )
};

export default ProfilScreen;