import axios from "axios";
import { useContext, useState } from "react"
import { Button, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { s } from "./EventSearch.style";
import { BASE_URL } from "../../../config";
import { TxtInria } from "../../TxtInria/TxtInria";
import Filter from "../../../assets/icons/Filter"


export const EventSearch = ({ onSearch }) => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [industry, setIndustry] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);

    const toggleFilters = () => setVisible(!visible);


    return (
        <View style={s.container}>
            <View style={s.searchBar}>
                <TextInput
                    style={s.input}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    placeholder="Search Event"
                />
                <Button title="Search" onPress={() => onSearch(searchQuery)} />
                <TouchableOpacity onPress={toggleFilters} style={s.toggleButton}>
                    <Filter/>
                </TouchableOpacity>
            </View>
            {visible && (
                <View style={s.filters}>
                    <TextInput
                        style={s.input}
                        onChangeText={setCountry}
                        value={country}
                        placeholder="Select Country"
                    />
                    <TextInput
                        style={s.input}
                        onChangeText={setRegion}
                        value={region}
                        placeholder="Select State"
                    />
                    <TextInput
                        style={s.input}
                        onChangeText={setCity}
                        value={city}
                        placeholder="Select City"
                    />
                    <TextInput
                        style={s.input}
                        onChangeText={setIndustry}
                        value={industry}
                        placeholder="Type an industry"
                    />
                    <Button
                        title="Apply Filters"
                        onPress={() => onSearch({ searchQuery, country, city, region, industry })}
                        color="#7F95E4"
                    />
                </View>
            )}
        </View>
    );
}