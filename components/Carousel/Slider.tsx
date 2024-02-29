import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LogBox,
} from "react-native";

const Carousel = () => {
  const flatlistRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    },
     4000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const carouselData = [
    {
      id: "01",
      image: require('../../assets/images/logo.png'),
    },
    {
      id: "02",
      image: require('../../assets/images/favicon.png'),
    },
    {
      id: "03",
      image: require('../../assets/images/logo.png'),
    },
  ];

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 200, width: screenWidth }}
        />
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: activeIndex === index ? "green" : "red",
            height: 5,
            width: 5,
            borderRadius: 5,
            marginHorizontal: 6,
          }}
        />
      );
    });
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
