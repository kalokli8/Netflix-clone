import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Episode } from "../../types";
import { Video } from "expo-av";
import { Storage } from "aws-amplify";
import { Playback } from "expo-av/build/AV";
import styles from "./styles";
import { unloadAsync } from "expo-font";

interface VideoPlayerProps {
  episode: Episode;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { episode } = props;
  const [videoURL, setVideoURL] = useState("");
  const [status, setStatus] = useState({});
  const video = useRef(null);

  //   whenever episodeItem change, unload and load the new episodeItem video
  console.log(episode.video);

  useEffect(() => {
    if (episode.video.startsWith("http")) {
      setVideoURL(episode.video);
      return;
    }
    Storage.get(episode.video).then(setVideoURL);
    // Storage.get("movies/sample1.mp4").then((url) => console.log(url));
  }, [episode]);

  useEffect(() => {
    if (!video) {
      return;
    }
    (async () => {
      await video?.current?.unloadAsync();
      await video?.current?.loadAsync({ uri: videoURL }, {}, false);
    })();
  }, [videoURL]);

  if (videoURL == "") {
    return null;
  }

  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoURL,
        }}
        posterSource={{
          uri: episode.poster,
        }}
        posterStyle={{
          resizeMode: "cover",
        }}
        usePoster={false}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default VideoPlayer;
