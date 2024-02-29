import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, useColorScheme } from "react-native";
import { useDebounce } from "use-debounce";

interface SearchBarProps<T extends object> {
  onSearch: (searchQuery: string) => void;
  disabled: boolean;
}

const SearchBarComponent = <T extends object>({
  onSearch,
  disabled = false,
}: SearchBarProps<T>) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    console.log("debounce", debouncedSearch);
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color={colors.tint} />
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Rechercher ..."
        readOnly={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "primary",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
});

export default SearchBarComponent;
