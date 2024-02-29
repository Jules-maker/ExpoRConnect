import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import ListComponent from '@/components/ListComponent';
import Cards, { CardsProps } from '@/components/CardComponent';
import { useState } from 'react';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  const cardsList = Array.from({length: 10}, createFalseData);
  const [list, setList] = useState<CardsProps[]>(cardsList);
  const handleData = () => {
    console.info('adding new data');
    const randomTitle = Math.random().toString(36).substring(7);
    const randomImg = `https://source.unsplash.com/random/320x320?sig=${Math.random()}`;

    const newCard = {
      title: randomTitle,
      to: '/host/1',
      imgSrc: randomImg
    };
    setList([...list, newCard]);
    console.info('new data added');
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: `Accueil` }} />
      <ListComponent  items={list} renderItem={(item) => <Cards {...item} />} triggerRefresh={handleData} nbColumns={2}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const createFalseData = (): CardsProps => {
  const randomTitle = Math.random().toString(36).substring(7);
  const randomImg = `https://source.unsplash.com/random/320x320?sig=${Math.random()}`;

  const newCard = {
    title: randomTitle,
    to: '/host/1',
    imgSrc: randomImg,
  }
  return newCard;
}