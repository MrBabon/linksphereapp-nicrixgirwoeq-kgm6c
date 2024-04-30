import { s } from "./SettingsScreen.style";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Settings from '../../../assets/icons/Settings';
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import ChevronRight from "../../../assets/icons/ChevronRight";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold } from "../../../components/TxtInria/TxtInria";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import DoorExit from "../../../assets/icons/Doorexit";


const SettingsScreen = ({ navigation }) => {
    const {userInfo, logout, isLoading} = useContext(AuthContext);

    const settingButton = (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Settings/>
        </TouchableOpacity>
    );
    const BackButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    );
    const header = (

        <View style={s.header}>
            {BackButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Settings</TxtJost>
            </View>
            {settingButton}
        </View>
    )




    return (
        <>
            {header}
            <ScrollView>
                <View style={s.container}>
                    <View style={s.card}>
                        <View style={s.name}>
                            <TxtInriaBold style={s.username}>{userInfo.first_name} {userInfo.last_name}</TxtInriaBold>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Account Settings</TxtInria>
                            <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('Edit')}>
                                <TxtInriaBold style={s.txt}>Edit Profile</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                            <TxtInriaBold style={s.txt}>Add a payment method</TxtInriaBold>
                            <TxtInriaBold style={{ marginBottom: 3, marginRight: 2 }}>+</TxtInriaBold>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                            <TxtInriaBold style={s.txt}>Push notifications</TxtInriaBold>
                            <TxtInriaBold style={{ marginBottom: 3, marginRight: 2 }}>+</TxtInriaBold>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from contacts</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from everyone</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Company</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Create/modify a business page</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Events</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Create an event</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>More</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>About us</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Privacy policy</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Terms and conditions</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Manage blocked profil</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Delete your account</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.container_log_out}>
                            <TouchableOpacity style={s.btn_log_out} onPress={logout}>
                                <DoorExit />
                                <TxtInriaBold style={s.txt_log_out}>LOG OUT</TxtInriaBold>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}


export default SettingsScreen;