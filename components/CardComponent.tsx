import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StyleProp, Dimensions } from 'react-native';

export interface CardsProps {
    title?: string;
    to: string;
    imgSrc: string;
}

const Cards: React.FC<CardsProps> = ({title, to, imgSrc }) => {
    return (
        <TouchableOpacity style={[styles.card]} onPress={() => {router.navigate({ pathname: '/(tabs)/host/[id]', params: { id: to, title: title, img: imgSrc } })}}>
            <Image source={{ uri: imgSrc }} style={styles.image} />
            {title && (
                <View style={styles.overlay}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height:  200, // Adjust as needed
        backgroundColor: 'gray',
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height:  200, // Adjust as needed
    },
    overlay: {
        position: 'absolute',
        bottom:  0,
        left:  0,
        right:  0,
        padding:  10,
        backgroundColor: 'rgba(0,0,0,0.5)', // Gradient effect can be achieved with linear-gradient
    },
    title: {
        color: 'white',
        // Additional styles for the title
    },
});

export default Cards;
