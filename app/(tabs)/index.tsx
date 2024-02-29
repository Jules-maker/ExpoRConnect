import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import ListComponent from '@/components/ListComponent';
import Cards, { CardsProps } from '@/components/CardComponent';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useSession } from '@/components/Ctx';
import { api } from '@/tools/Api';
import { Host } from '@/models/hostModel';

export default function HomeScreen() {
  const { session } = useSession();

  const [list, setList] = useState<Host[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const handleData =async  () => {
    console.info("adding new data");
    try {
      const { data } = await api.get(
        `api/Host?page=${page}`,
        { headers: { Authorization: session } },
      );
      console.log(data);
      setList(data.data);
      setTotalCount(data.totalCount);
      setPage(page + 1);
    } catch (e) {
      console.log("erreur", e);
    }
  }

  useEffect(() => {
    handleData();
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: `Accueil` }} />
      <ListComponent  items={list} renderItem={(item) => <Cards {...item} />} triggerRefresh={list.length < totalCount ? handleData : () => null} nbColumns={2}/>
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

// const createFalseData = (): CardsProps => {
//   const randomTitle = Math.random().toString(36).substring(7);
//   const randomImg = `https://source.unsplash.com/random/320x320?sig=${Math.random()}`;

//   const newCard = {
//     name: randomTitle,
//     id: Math.random().toString(36).substring(7),
//     description: 'lorem ipsum',
//     mainphoto: randomImg,
//   }
//   return newCard;
// }