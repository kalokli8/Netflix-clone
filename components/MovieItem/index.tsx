import React, { useState, useEffect } from "react";
import { Image, Pressable } from "react-native";
import { Movie } from "../../src/models";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "aws-amplify";
import styles from "./styles";

const MovieItem = ({ movie }: { movie: Movie }) => {
  const navigation = useNavigation();

  const [imageUrl, setImageUrl] = useState("");
  const onMoviePress = () => {
    navigation.navigate("MovieDetailsScreen", { id: movie.id });
  };

  useEffect(() => {
    if (movie.poster.startsWith("http")) {
      setImageUrl(movie.poster);
      return;
    }
    Storage.get(movie.poster) // for listing ALL files without prefix, pass '' instead
      .then((url) => setImageUrl(url));
  }, []);
  return (
    <Pressable onPress={onMoviePress}>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
    </Pressable>
  );
};

export default MovieItem;
