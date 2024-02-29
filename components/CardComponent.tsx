import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  Dimensions,
} from "react-native";

export interface CardsProps {
  name?: string;
  id: string;
  description: string;
  mainphoto: string;
}

const Cards: React.FC<CardsProps> = ({ id, name, mainphoto }) => {
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={() => {
        /* Navigation logic here */ console.log("nav to " + id);
      }}
    >
      <Image source={{ uri: mainphoto }} style={styles.image} />
      {name && (
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 200, // Adjust as needed
    backgroundColor: "gray",
    borderRadius: 6,
    overflow: "hidden",
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
    // Additional styles for the name
  },
});

export default Cards;
