import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import ListComponent from '@/components/ListComponent';
import Cards, { CardsProps } from '@/components/CardComponent';
import { useEffect, useState } from 'react';
import { useSession } from '@/components/Ctx';
import { api } from '@/tools/Api';

export default function HomeScreen() {
  const { session } = useSession();

  const [list, setList] = useState<CardsProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const handleData = async  () => {
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