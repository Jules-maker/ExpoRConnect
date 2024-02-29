import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import SearchBarComponent from "@/components/SearchComponent";
import ListComponent from "@/components/ListComponent";
import Cards, { CardsProps } from "@/components/CardComponent";
import React, { useEffect, useState } from "react";
import { api } from "@/tools/Api";
import { Circles } from "react-loader-spinner";
import { useSession } from "@/components/Ctx";
import { tintColorLight } from "@/constants/Colors";
import { Host } from "@/models/hostModel";

export default function HostScreen() {
  const [list, setList] = useState<Host[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const { session } = useSession();
  const handleData = async () => {
    console.info("adding new data");
    try {
      const { data } = await api.get(
        `api/Host?page=${page}&searchValue=${searchQuery}`,
        { headers: { Authorization: session } },
      );
      setList(data.data);
      setTotalCount(data.totalCount);
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
        <Circles
          height="80"
          width="80"
          color={tintColorLight}
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <ListComponent
            items={list}
            renderItem={(item) => <Cards {...item} />}
            triggerRefresh={list.length < totalCount ? handleData : () => null}
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
