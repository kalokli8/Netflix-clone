import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";

import { Storage } from "aws-amplify";
import { Text } from "../../components/Themed";
import styles from "./styles";
import categories from "../../assets/data/categories";
import { Category, Movie } from "../../src/models";
import { DataStore } from "aws-amplify";
import MovieItem from "../../components/MovieItem";

const firstCategory = categories.items[0];

interface HomeCategoryProps {
  category: Category;
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      //   const r = await DataStore.query(Movie);
      //   console.log(r);
      const result = (await DataStore.query(Movie)).filter(
        (movie) => movie.categoryID === category.id
      );
      setMovies(result);
      console.log(movies.length);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
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

export default HomeCategory;
