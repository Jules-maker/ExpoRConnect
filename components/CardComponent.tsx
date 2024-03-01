import { Host } from '@/models/hostModel';
import { router } from 'expo-router';
import {
    View,
    Image,
    StyleSheet,
    Pressable
} from "react-native";
import { Text } from './Themed';


const Cards: React.FC<Host> = ({ id, name, mainphoto }: Host) => {
    return (
        <Pressable
            style={[styles.card]}
            onPress={()=> router.push({
                pathname: "/(tabs)/host/[id]/",
                params: {
                    id: id
                }
            })}
        >
            <Image
                source={{ uri: mainphoto }}
                style={styles.image}
            />
            <View style={styles.overlay}>
                <Text style={styles.name}>{name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "100%",
        height: 200, // Adjust as needed
        backgroundColor: "gray",
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: 200, // Adjust as needed
      },
      overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.5)", // Gradient effect can be achieved with linear-gradient
      },
    name: {
        color: "white",
        height: 30,
        fontSize: 18,
        fontWeight: "bold",
        width: "100%",
        // Additional styles for the name
    },
});

export default Cards;
