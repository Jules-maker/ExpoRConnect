import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import SearchBarComponent from '@/components/SearchComponent';
import ListComponent from '@/components/ListComponent';
import Cards, { CardsProps } from '@/components/CardComponent';
import { useState } from 'react';


export default function HostScreen() {
  const cardsList = Array.from({length: 10}, createFalseData);
  const [list, setList] = useState<CardsProps[]>(cardsList);
  const [filteredData, setFilteredData] = useState<CardsProps[]>(list);
  const handleData = () => {
    console.info('adding new data');
    const randomTitle = Math.random().toString(36).substring(7);
    const randomImg = `https://source.unsplash.com/random/320x320?sig=${Math.random()}`;

    const newCard = {
      title: randomTitle,
      to: '/host/1',
      imgSrc: randomImg,
    }
    setList([...list, newCard]);
    console.info('new data added');
  }

  const handleSearch = (filteredData: CardsProps[]) => {
    setFilteredData(filteredData);
  };

  return (
    <View style={styles.container}>
      <SearchBarComponent data={list} onSearch={handleSearch} itemToFilter="title" />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ListComponent  items={filteredData} renderItem={(item) => <Cards {...item} />} triggerRefresh={handleData} nbColumns={2}/>
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