import { s } from "./ProVisitorShowScreen.style";
import { useContext, useEffect, useState } from "react";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Spinner from "react-native-loading-spinner-overlay";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Send from "../../../assets/icons/Send";
import Avatar from "../../../assets/icons/Avatar";
import Phone from "../../../assets/icons/Phone";
import Mail from "../../../assets/icons/Mail";
import Globe from "../../../assets/icons/Globe";
import BlurredText from "../../../components/BlurredText";

const ProVisitorShowScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const { userInfo, userToken, isLoading } = useContext(AuthContext);
    const [user, setUser] = useState({})


    const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )
    const send = (
        <TouchableOpacity>
            <Send/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Meet contacts</TxtJost>
                </View>
                {send}
            </View>
        </View>
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}users/${userId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data;
                    const userAttributes = data.user.data.attributes;
                    console.log(userAttributes);

                    setUser(userAttributes);
                }
            } catch(e) {
                console.error('Error fetching user:', e);
            }
        }
        fetchData();
    }, [userId, userToken])
    return (
        <>
            <Spinner visible={isLoading} />
            {header}

            <ScrollView>
                <View style={s.container}>
                    <View style={s.avatar}>
                        <Avatar uri={user.avatar_url} />
                    </View>
                    <TxtInria style={s.name}>{user.first_name} {user.last_name}</TxtInria>
                    <View style={s.user_info}>
                        <Phone color={"#7F95E4"} />
                        <View>
                            <TxtInria style={s.textflou}>{user.phone}</TxtInria>
                            <BlurredText text={user.phone} style={s.blurContainer} />
                        </View>
                    </View>
                    <View style={s.user_info}>
                        <Mail color={"#7F95E4"} />
                        <View>
                            <TxtInria style={s.textflou}>{user.email}</TxtInria>
                            <BlurredText text={user.email} style={s.blurContainer} />
                        </View>
                    </View>
                    <View style={s.user_info}>
                        <Globe url={user.website} color={"#7F95E4"} />
                        <TxtInria style={s.info}>{user.website}</TxtInria>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default ProVisitorShowScreen;