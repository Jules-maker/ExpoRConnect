import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import SearchBarComponent from "@/components/SearchComponent";
import ListComponent from "@/components/ListComponent";
import Cards, { CardsProps } from "@/components/CardComponent";
import React, { useEffect, useState } from "react";
import { api } from "@/tools/Api";
import { Audio, ColorRing } from "react-loader-spinner";
import { useSession } from "@/components/Ctx";

export default function HostScreen() {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState<CardsProps[]>(list);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const { session } = useSession();
  const handleData = async () => {
    console.info("adding new data");
    try {
      const { data } = await api.get(
        `api/Host?page=${page}&searchValue=${searchQuery}`,
        { Authorization: session },
      );
      console.log("newData", data);
      setList(data.data);
      setPage(page + 1);
      setInitialLoading(false);
    } catch (e) {
      console.log("erreur", e);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleSearch = (searchQuery: string) => {
    setPage(1);
    console.log(searchQuery);
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (initialLoading) return;
    handleData();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchBarComponent disabled={initialLoading} onSearch={handleSearch} />
      {initialLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <ListComponent
            items={filteredData}
            renderItem={(item) => <Cards {...item} />}
            triggerRefresh={handleData}
            nbColumns={2}
          />
        </View>
      )}
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
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const createFalseData = (): CardsProps => {
  const randomTitle = Math.random().toString(36).substring(7);
  const randomImg = `https://source.unsplash.com/random/320x320?sig=${Math.random()}`;

  const newCard = {
    title: randomTitle,
    to: "/host/1",
    imgSrc: randomImg,
  };
  return newCard;
};
