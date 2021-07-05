import * as React from "react";
import { StyleSheet, Image, FlatList, SafeAreaView } from "react-native";

import { Text, View } from "../../components/Themed";
import styles from "./styles";
import categories from "../../assets/data/categories";
import HomeCategory from "../../components/HomeCategory";

// const firstCategory = categories.items[0];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* List of categories */}
      <FlatList
        data={categories.items}
        renderItem={({ item }) => <HomeCategory category={item} />}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

export default HomeScreen;
