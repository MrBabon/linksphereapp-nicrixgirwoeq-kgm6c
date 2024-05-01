import { SvgXml } from 'react-native-svg';


const Envelope = ({ color = "#3A3A3A"}) => {
    
    const svgMarkup = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="800px" height="800px" viewBox="-0.6 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 6.5L14.38 12.46H14.37L12.32 14.18C12.13 14.33 11.86 14.33 11.68 14.18L2.5 6.5H21.5Z" stroke="${color}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.4999 18.5L15.9399 13.76" stroke="${color}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.07 13.75L2.5 18.5" stroke="${color}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.5 8.5V18.5H2.5V8.5" stroke="${color}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    return <SvgXml xml={svgMarkup} width="38" height="38" />;
}


export default Envelope;