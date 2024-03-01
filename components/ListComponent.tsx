import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet } from 'react-native';

interface ListViewProps<T> {
    items: T[];
    renderItem: (item: T) => JSX.Element;
    triggerRefresh?: ()=>void;
    nbColumns?: 1 | 2;
}


const ListComponent = <T,>({ items, renderItem, triggerRefresh, nbColumns = 1 }: ListViewProps<T>) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        triggerRefresh && triggerRefresh();
        setIsLoading(false);
    }

    const ListEndLoader = () => {
        if (isLoading) {
          // Show loader at the end of list when fetching next page data.
          return <ActivityIndicator size={'large'} />;
        }
      };
    
    if (items.length < 1 && isLoading) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'small'} />;
    }

    if(nbColumns < 1) throw new Error('nbColumns must be greater than 0');

    if(nbColumns == 2) {
        return (
            <FlatList
                data={items}
                extraData={items}
                renderItem={({ item }) => (
                    renderItem(item)
                )}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={stylesMulti.columnWrapper}
                refreshing={isLoading}
                onRefresh={handleRefresh}
                numColumns={nbColumns}
                onEndReached={(x)=>handleRefresh()}
                onEndReachedThreshold={0.8}
                ListFooterComponent={ListEndLoader}
            />
        );
    } else if (nbColumns == 1){
        return (
            <FlatList
                data={items}
                extraData={items}
                renderItem={({ item }) => (
                    renderItem(item)
                )}
                keyExtractor={(item, index) => index.toString()}
                refreshing={isLoading}
                onRefresh={handleRefresh}
                columnWrapperStyle={styles.columnWrapper}
                onEndReached={(x)=>handleRefresh()}
                onEndReachedThreshold={0.8}
                ListFooterComponent={ListEndLoader}
            />
        );
    } else {
        throw new Error('nbColumns must be 1 or 2');
    }
};

export default ListComponent;

const styles = StyleSheet.create({
    columnWrapper: {
        marginBottom: 10,
    }
});

const stylesMulti = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10,
}
});
