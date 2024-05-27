import { s } from "./ContactGroupScreen.style";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria"
import ChevronLeft from "../../../assets/icons/ChevronLeft"
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { UserSearch } from "../../../components/forms/UserSearch/UserSearch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config";
import axios from "axios";
import Avatar from "../../../assets/icons/Avatar";
import { showMessage } from "react-native-flash-message";
import Garbage from "../../../assets/icons/Garbage";

const ContactGroupScreen = ({ route, navigation }) => {
    const { groupId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [contactGroup, setContactGroup] = useState([]);

    const onUserSearch = (userName) => {
        if (userName) {
            const queryString = `?search=${userName}`
            fetchUsers(queryString);
            console.log(queryString);
        } else {
            console.log("User pas trouvé");
            fetchUsers('');
        }
    }

    const fetchUsers = async (queryString) => {
        try {
            const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups/${groupId}${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allUsers = response.data.users;

            const user = allUsers.filter(item => item.type === 'user').map(user => ({
                id: user.id,
                first_name: user.attributes.first_name,
                last_name: user.attributes.last_name,
                avatar_url: user.attributes.avatar_url
            }))
            console.log("resultat",user);
            setUsers(user);
        } catch (e) {
            console.error(e);
        }
    }

    const BackButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )

    const Delete = (
        <TouchableOpacity>
            {contactGroup.deleted ? (
                <Garbage/>
            ) : (
                <View style={s.garbage}></View>
            )}
        </TouchableOpacity>
    )

    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {BackButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>{contactGroup.name}</TxtJost>
                </View>
                {Delete}
            </View>
            <View style={s.header_nav}>
                <UserSearch onUserSearch={onUserSearch} />
            </View>
        </View>
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups/${groupId}`, {
                        headers: {
                            'Authorization': userToken
                        }
                    });
                    const contactGroup = response.data.contact_group.data.attributes;
                    setContactGroup(contactGroup)
                    
                    const users = response.data.users.map(user => user.attributes);
                    setUsers(users)
                }
            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
    }, [userInfo.id, userToken, groupId])

    const deleteContactGroup = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups/${groupId}${queryString}`, {
                headers: { Authorization: userToken }
            });
            showMessage({
                message: "Groupe de contact bien supprimé",
                type: "success",
                duration: 4000
            });
            navigation.navigate('Repertoire')
        } catch(e) {
            console.error(e);
            showMessage({
                message: "Problème lors de la suppression du groupe",
                type: "alert",
                duration: 4000
            });
        }
    }

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                {users.map(user => (
                    <TouchableOpacity key={user.id} onPress={() => navigation.navigate("UserContactGroup", {userId: user.id})}>
                        <View style={s.contactGroup}>
                            <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                            <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                        </View>
                        <View style={s.border}></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    )
}


export default ContactGroupScreen;