
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, useColorScheme } from 'react-native';

interface SearchBarProps<T extends object> {
    data: T[];
    onSearch: (filteredData: T[]) => void;
    itemToFilter: keyof T;
}

const SearchBarComponent = <T extends object>({ data, onSearch, itemToFilter }: SearchBarProps<T>) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filteredData = data.filter((item) =>
            (item[itemToFilter] as string)
                .toLowerCase()
                .includes(term.toLowerCase())
        );
        onSearch(filteredData);
    };

    return (
        <View style={styles.container}>
            <FontAwesome name="search" size={20} color={colors.tint} />
            <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                value={searchTerm}
                placeholder="Rechercher ..."
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:  1,
        borderColor: 'primary',
        borderRadius:  5,
        padding:  10,
        backgroundColor: 'white',
        gap:  10,
    },
    input: {
        flex:  1,
        fontSize:  16,
        color: 'gray',
    },
});

export default SearchBarComponent;
