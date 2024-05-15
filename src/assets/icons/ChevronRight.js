import { SvgXml } from 'react-native-svg';




const ChevronRight = ({ color = "#3A3A3A" }) => {
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="-5.5 0 26 26"><path fill="${color}" fill-rule="evenodd" d="M14.404 11.36 3.637 1.6a2.11 2.11 0 0 0-3.008 0 2.117 2.117 0 0 0 0 3L9.885 13 .629 21.4a2.117 2.117 0 0 0 0 3c.83.84 2.177.84 3.008 0l10.767-9.76c.45-.45.648-1.05.611-1.64a2.115 2.115 0 0 0-.611-1.64"/></svg>`

    return <SvgXml xml={svgMarkup} width="16" height="16" />;
}
export default ChevronRight;