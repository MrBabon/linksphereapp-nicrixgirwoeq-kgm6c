import { s } from "./ScanScreen.style";
import { TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import Envelope from "../../../assets/icons/Envelope";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";


const ScanScreen = () => {



    const header = (
        <View style={s.header}>
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>My Qr Code</TxtJost>
            </View>
        </View>
    )
    return (
        <>
            <Spinner/>
            {header}
            <View>
                <TxtInria>Event INDEX</TxtInria>
            </View>
        </>
    )
}

export default ScanScreen;