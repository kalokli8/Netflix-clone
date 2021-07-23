import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import { DataStore } from "aws-amplify";
import { Text, View } from "../../components/Themed";
import styles from "./styles";
// import categories from "../../assets/data/categories";
import HomeCategory from "../../components/HomeCategory";
import { Category } from "../../src/models";
// const firstCategory = categories.items[0];

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category));
    };
    fetchCategories();
    console.log(categories);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* List of categories */}
      <FlatList
        data={categories}
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
