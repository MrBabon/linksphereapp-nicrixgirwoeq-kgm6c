import { SvgXml } from 'react-native-svg';
import { Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';



const Avatar = React.memo(({ uri, style, svgStyle }) => {
    const { userInfo } = useContext(AuthContext);
    const avatarUrl = uri || userInfo.avatar_url ;
    const imageStyle = [styles.avatar, style];
    const defaultSvgStyle = [styles.avatar, svgStyle];
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="" height="" viewBox="-27 24 100 100"><defs><circle id="a" cx="23" cy="74" r="50"/></defs><use xlink:href="#a" fill="#F5EEE5" overflow="visible"/><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><g clip-path="url(#b)"><defs><path id="c" d="M36 95.9c0 4 4.7 5.2 7.1 5.8 7.6 2 22.8 5.9 22.8 5.9 3.2 1.1 5.7 3.5 7.1 6.6v9.8H-27v-9.8c1.3-3.1 3.9-5.5 7.1-6.6 0 0 15.2-3.9 22.8-5.9 2.4-.6 7.1-1.8 7.1-5.8V85h26v10.9z"/></defs><use xlink:href="#c" fill="#E6C19C" overflow="visible"/><clipPath id="d"><use xlink:href="#c" overflow="visible"/></clipPath><path fill="#D4B08C" d="M23.2 35h.2c3.3 0 8.2.2 11.4 2 3.3 1.9 7.3 5.6 8.5 12.1 2.4 13.7-2.1 35.4-6.3 42.4-4 6.7-9.8 9.2-13.5 9.4h-.6c-3.7-.2-9.5-2.7-13.5-9.4-4.2-7-8.7-28.7-6.3-42.4 1.2-6.5 5.2-10.2 8.5-12.1 3.2-1.8 8.1-2 11.4-2h.2z" clip-path="url(#d)"/></g><path fill="#F2CEA5" d="M22.6 40c19.1 0 20.7 13.8 20.8 15.1 1.1 11.9-3 28.1-6.8 33.7-4 5.9-9.8 8.1-13.5 8.3h-.5c-3.8-.3-9.6-2.5-13.6-8.4-3.8-5.6-7.9-21.8-6.8-33.8C2.3 53.7 3.5 40 22.6 40z"/></svg>`;

    const isValidUrl = (url) => {
        return /^(https?|blob|file):/.test(url);
    };
    
    return isValidUrl(avatarUrl) ? (
        <Image source={{ uri: avatarUrl }} style={imageStyle} onError={(e) => {
            console.log('Error loading image:', e.nativeEvent.error);
        }}/>
    ) : (
        <SvgXml xml={svgMarkup} style={defaultSvgStyle} />

    );

});

const styles = StyleSheet.create({
    avatar: {
        width: 120,       // Définis la largeur
        height: 120,      // Définis la hauteur
        borderRadius: 100, // La moitié de la largeur et de la hauteur pour rendre l'image ronde
    },
});

export default Avatar;