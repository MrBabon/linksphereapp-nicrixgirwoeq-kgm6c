import { TouchableOpacity, View } from "react-native";
import { s } from "./Footer.style";
import { TxtInria } from "../TxtInria/TxtInria";
import Calendar from "../../assets/icons/Calendar";
import List from "../../assets/icons/List";
import Profil from "../../assets/icons/Profil";
import QrCode from "../../assets/icons/QrCode";

const Footer = ({ activePage, navigation }) => {
    
    return (
        <View style={s.footer_container}>
            <TouchableOpacity 
                style={activePage === 'Events' ? s.activeBtn : s.btn}
                onPress={() => {navigation.navigate('Events')}}>
                <Calendar color={activePage === 'Events' ? '#368FE6' : '#3A3A3A'}/>
                <TxtInria style={activePage === 'Events' ? s.activeTxt : s.txt}>Events</TxtInria>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activePage === 'Repertoire' ? s.activeBtn : s.btn}
                onPress={() => {navigation.navigate('Repertoire')}}>
                <List  color={activePage === 'Repertoire' ? '#368FE6' : '#3A3A3A'} />
                <TxtInria style={activePage === 'Repertoire' ? s.activeTxt : s.txt}>Groups</TxtInria>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activePage === 'Profil' ? s.activeBtn : s.btn}
                onPress={() => {navigation.navigate('Profil')}}>
                <Profil color={activePage === 'Profil' ? '#368FE6' : '#3A3A3A'}/>
                <TxtInria style={activePage === 'Profil' ? s.activeTxt : s.txt}>Profil</TxtInria>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activePage === 'Scan' ? s.activeBtn : s.btn}
                onPress={() => {navigation.navigate('Profil')}}>
                <QrCode color={activePage === 'Scan' ? '#368FE6' : '#3A3A3A'}/>
                <TxtInria style={activePage === 'Scan' ? s.activeTxt : s.txt}>Scan</TxtInria>
            </TouchableOpacity>
        </View>
    )
}

export default Footer;