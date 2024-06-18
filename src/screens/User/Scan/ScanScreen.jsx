import { s } from "./ScanScreen.style";
import { Alert, Button, Image, Linking, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { TxtJost } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import QRCode from 'react-native-qrcode-svg';
import { CameraView, useCameraPermissions } from "expo-camera";


const ScanScreen = ({ navigation }) => {
    const {userInfo, userToken, isLoading} = useContext(AuthContext);
    const [qrCode, setQrCode] = useState('');
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {   
        (async () => {
            if (permission && !permission.granted) {
              await requestPermission();
            }
          })();
    }, [permission]);

    const header = (
        <View style={s.header}>
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>My Qr Code</TxtJost>
            </View>
        </View>
    )

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {          
                const response = await axios.get(`${BASE_URL}users/${userInfo.id}/profil`, {
                    headers: {
                        'Authorization': `${userToken}`
                    }
                });
                const data = response.data.user.qr_code;
                setQrCode(data);
            } else {
                console.error('No user info available');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [userInfo, userToken]);


    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        const urlPattern = /http:\/\/192\.168\.1\.13:3000\/users\/(\d+)/;
        const match = data.match(urlPattern);
        if (match) {
            const userId = match[1];
            navigation.navigate('ProVisitor', { userId });
        } else {
            Alert.alert('QR Code Scanné (else)', `Data: ${data}`);
        }
    };
    
    if (!permission) {
        // Les permissions de la caméra sont toujours en cours de chargement.
        return <View />;
    }

    if (!permission.granted) {
        // Les permissions de la caméra ne sont pas encore accordées.
        return (
            <View style={styles.container}>
            <TxtInria style={{ textAlign: 'center' }}>We need your permission to show the camera</TxtInria>
            <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    const base64Logo = `data:image/png;base64, ${qrCode}` 

    return (
        <>
            <Spinner visible={isLoading}/>
            {header}
            <View style={s.container}>
                <View style={s.qr}>
                    {qrCode ? (
                        <QRCode 
                            
                            logo={{uri: base64Logo}}
                            backgroundColor="transparent"
                            logoSize={350}
                            logoBackgroundColor="transparent"
                            size={220} />
                    ) : (
                        <TxtInria>Qr Code not available</TxtInria>
                    )}
                </View>
                <CameraView 
                        style={s.camera}
                        facing={facing}
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barcodeScannerSettings={{ 
                            barcodeTypes: ["qr"],
                        }} 
                />
            </View>
        </>
    )
}

export default ScanScreen;