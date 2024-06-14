import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../../components/TxtInria/TxtInria";
import { s } from "./UserContactGroupScreen.style";
import * as Animatable from 'react-native-animatable';
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import Send from "../../../assets/icons/Send";
import Header from "../../../components/Header/Header";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import Share from "../../../assets/icons/Share";
import ChevronBottom from "../../../assets/icons/ChevronBottom";
import { ModalContactGroup } from "../../../components/Modal/ModalContactGroup/ModalContactGroup";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

const UserContactGroupScreen = ({ route, navigation }) => {
    const { userId, groupId } = route.params
    const { userInfo, userToken } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const [contactGroup, setContactGroup] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState([]);
    const [visible, setVisible] = useState(false);

    const hasFetchedData = useRef(false);

    const fetchData = useCallback(async () => {
        try {
            if (userInfo && userToken) {
                const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups/${groupId}/user_contact_groups/${userId}`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const groups = response.data.contact_group.data;
                if (Array.isArray(groups) && groups.length > 0) {
                    const deletableGroups = groups.filter(group => group.attributes.deletable);
                    const formattedGroups = deletableGroups.map(group => ({ id: group.id, ...group.attributes }));
                    setContactGroup(formattedGroups);
                }
                
                const user = response.data.user.data.attributes;
                const note = response.data.user_contact_group.data.attributes;
                setUser(user);
                setNote(note);
            }
        } catch(e) {
            console.error(e);
        }
    }, [userInfo, userToken, groupId, userId]);
    
        useEffect(() => {
            fetchData();
        }, [fetchData]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const addContactGroup = async (groupName) => {
        try {
            const payload = {
                contact_group: { name: groupName }
            };
            const response = await axios.post(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups`, payload, {
                headers: { Authorization: userToken }
            });
            console.log("Full response: => ",response.data);
            if (response.status === 201 && response.data) {
                const newGroup = { id: response.data.id, name: response.data.name, ...response.data.attributes };
                console.log('New group:', newGroup);
                setContactGroup(prevGroups => [...prevGroups, newGroup]);
            }
            showMessage({
                message: 'Group added',
                type: 'success',
                duration: 3000
            });
            setModalVisible(false);
        } catch (e) {
            console.error(e);
            showMessage({
                message: 'An error occured',
                type: 'danger',
                duration: 3000
            });
        }
    }

    const toggleMenu = () => {
        setVisible(!visible);
    };



    return (
        <>
            <Spinner/>
            <Header title="Contact"
                    showBackButton={true}
                    onBackPress={() => navigation.goBack()}
                    showChatroom={true}
                    onChatPress={() => navigation.navigate('ChatroomShow', {userId: user.id})}/>
            <View style={s.contactgroups}>
                <TouchableOpacity style={s.btngroup} onPress={toggleMenu}>
                    <TxtJost style={s.txtbtngroup}>Group</TxtJost>
                    <ChevronBottom style={[s.chevron, { transform: [{ rotate: visible ? '180deg' : '0deg' }] }]}/>
                </TouchableOpacity>
            </View>        
            <Animatable.View
                style={s.menu}
                animation={visible ? 'fadeInDown' : 'fadeOutUp'}
                duration={300}>
                    {visible && (
                        <View style={s.menuItems}>
                            {contactGroup.map(group => (
                                <TouchableOpacity key={group.id} onPress={() => navigation.navigate("ContactGroup", {userId: user.id, groupId: group.id})}>
                                    <TxtJost style={s.menuItem}>{group.name}</TxtJost>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <TxtJost style={s.menuItem}>+ Add New Group</TxtJost>
                            </TouchableOpacity>
                            <ModalContactGroup isVisible={modalVisible} 
                                            onClose={() => setModalVisible(false)} 
                                            onConfirm={addContactGroup}/>
                        </View>
                    )}
            </Animatable.View>    
            <ScrollView>
                <View style={s.container}>
                    <View style={s.share}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
                            <Share/>
                        </TouchableOpacity>
                    </View>
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
                    <View style={s.detail}>
                        <TxtInriaBold style={s.job}>{user.job ? user.job : "Job not specified"}</TxtInriaBold>
                        <TxtInriaLight style={s.industry}>{user.industry ? user.industry : "Industry not specified"}</TxtInriaLight>
                        <View style={s.company}>
                            {/* Rediriger vers l'entreprise en question */}
                            <TouchableOpacity>
                                <TxtInria style={s.at}>At <TxtInriaBold style={s.nameCompany}>DannaCode</TxtInriaBold></TxtInria>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TxtInria style={s.bio}>{user.biography}</TxtInria>
                </View>
            </ScrollView>
        </>
    )
}

export default UserContactGroupScreen;