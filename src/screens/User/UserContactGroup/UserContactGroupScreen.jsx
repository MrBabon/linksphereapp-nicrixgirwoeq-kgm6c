import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { s } from "./UserContactGroupScreen.style";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import Send from "../../../assets/icons/Send";
import Header from "../../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Avatar from "../../../assets/icons/Avatar";
import Phone from "../../../assets/icons/Phone";
import Mail from "../../../assets/icons/Mail";
import Globe from "../../../assets/icons/Globe";
import Twitter from "../../../assets/icons/Twitter";
import Linkedin from "../../../assets/icons/Linkedin";
import Facebook from "../../../assets/icons/Facebook";
import Instagram from "../../../assets/icons/Instagram";

const UserContactGroupScreen = ({ route, navigation }) => {
    const { userId, groupId } = route.params
    const { userInfo, userToken } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const [note, setNote] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups/${groupId}/user_contact_groups/${userId}`, {
                        headers: {
                            'Authorization': userToken
                        }
                    });
                    const user = response.data.user.data.attributes;
                    const note = response.data.user_contact_group.data.attributes;
                    setUser(user);
                    setNote(note);
                }
            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
    }, [userInfo.id, userToken, userId, groupId])


    return (
        <>
            <Spinner/>
            <Header title="Contact"
                    showBackButton={true}
                    onBackPress={() => navigation.goBack()}
                    showChatroom={true}
                    onChatPress={() => navigation.navigate('ChatroomShow', {userId: user.id})}/>
            <View style={s.contactgroups}>
                <TouchableOpacity style={s.btngroup}>
                    <TxtJost>Group</TxtJost>
                </TouchableOpacity>
            </View>            
            <ScrollView>
                <View style={s.container}>
                    <View style={s.avatar}>
                        <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url}/>
                    </View>
                    <View style={s.contact}>
                        <TxtInria style={s.name}>{user.first_name} {user.last_name}</TxtInria>
                        <View style={s.user_info}>
                            <Phone color="#7F95E4" />
                            <TxtInria style={s.info}>{user.phone}</TxtInria>
                        </View>
                        <View style={s.user_info}>
                            <Mail color="#7F95E4" />
                            <TxtInria style={s.info}>{user.email}</TxtInria>
                        </View>
                        <View style={s.user_info}>
                            <Globe color="#7F95E4" url={user.website} />
                            <TxtInria style={s.info}>{user.website}</TxtInria>
                        </View>
                    </View>
                    <View style={s.social}>
                        <Twitter color="#FBD160"  url={userInfo.twitter} />
                        <Linkedin color="#FBD160" url={userInfo.linkedin} />
                        <Facebook color="#FBD160" url={userInfo.facebook} />
                        <Instagram color="#FBD160" url={userInfo.instagram} />
                    </View>
                    <View style={s.border}></View>
                </View>
            </ScrollView>
        </>
    )
}

export default UserContactGroupScreen;