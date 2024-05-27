import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { s } from "./UserContactGroupScreen.style";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import Send from "../../../assets/icons/Send";

const UserContactGroupScreen = ({ navigation }) => {
    const BackButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )

    const Delete = (
        <TouchableOpacity>
            <Send/>
        </TouchableOpacity>
    )

    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {BackButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Contact</TxtJost>
                </View>
                {Delete}
            </View>
        </View>
    )

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                <TxtInria>USERCONTACTGROUP</TxtInria>
            </ScrollView>
        </>
    )
}

export default UserContactGroupScreen;