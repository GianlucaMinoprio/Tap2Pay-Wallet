import React, { memo } from "react";
import { View, TouchableOpacity, TouchableHighlight } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Video } from "expo-av";
import SliderEdu from "./SliderEdu";
import { Images } from "assets/images";
import EduTabbar from "../Component/EduTabbar";
import { LinearGradient } from "expo-linear-gradient";
import Lectures from "./Lectures";

const VideoCourse = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const videoPlayer = React.useRef<Video>(null);
  const [minutes, setMinutes] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [showPlayPause, setShowPlayPause] = React.useState(false);
  const [playPause, setPlayPause] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(0);
  const video = {
    uri: "https://res.cloudinary.com/whisky131/video/upload/v1633324283/gym_ml8gjg.mp4",
  };
  React.useEffect(() => {
    let timer1 = setTimeout(() => {
      if (showPlayPause === true) {
        setShowPlayPause(false);
      }
      return () => {
        clearTimeout(timer1);
      };
    }, 5.8 * 1000);
  }, [showPlayPause]);
  const convertTime = React.useCallback((duration: number) => {
    let y = duration - (duration % 60000);
    let x = Math.floor(y / 60000);
    let z = (duration % 60000) / 1000;

    return `${x >= 10 ? `${z}` : `0${x}`}:${
      (duration % 60000) / 1000 <= 10 ? "0" : ""
    }${z.toFixed(0)}`;
  }, []);
  const PauseAndPlay = React.useCallback(async () => {
    try {
      /* @ts-ignore */
      const result = await videoPlayer.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          /* @ts-ignore */
          videoPlayer.current.pauseAsync();
          setPlayPause(true);
        }
      }
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          videoPlayer.current?.playAsync();
          setPlayPause(false);
        }
      }
    } catch (error) {}
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TouchableHighlight onPress={() => setShowPlayPause(!showPlayPause)}>
        <View>
          {showPlayPause ? (
            <Layout
              level="2"
              style={[
                {
                  width: width,
                  height: 364 * (height / 812),
                },
                styles.playPause,
              ]}
            >
              <LinearGradient
                style={styles.btnPlayPause}
                colors={[
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.4)",
                ]}
              >
                <TouchableOpacity
                  onPress={PauseAndPlay}
                  style={styles.btnPlayPause}
                >
                  <Icon
                    pack="assets"
                    style={styles.iconPlayPause}
                    name={playPause ? "rightChevron" : "pause"}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </Layout>
          ) : null}
          <Video
            source={video}
            resizeMode="stretch"
            style={{
              width: width,
              height: 364 * (height / 812),
              zIndex: -10,
            }}
            focusable={false}
            useNativeControls={false}
            ref={videoPlayer}
            volume={0.5}
            shouldPlay={true}
            onPlaybackStatusUpdate={(status) => {
              /* @ts-ignore */
              setDuration(status.positionMillis),
                setMinutes(duration % 6000),
                /* @ts-ignore */
                setCurrentTime(status.durationMillis);
            }}
          />
          {showPlayPause ? (
            <SliderEdu
              value={duration}
              maxValue={currentTime}
              time={`${convertTime(duration)}`}
              totalTime={`${convertTime(currentTime)}`}
              style={{ position: "absolute", bottom: 68, left: 0, right: 0 }}
              _onFullScreen={() => videoPlayer.current?._setFullscreen(true)}
            />
          ) : null}
        </View>
      </TouchableHighlight>

      <Content
        level="2"
        style={styles.content}
        contentContainerStyle={{ paddingBottom: bottom + 40 }}
      >
        <View style={styles.top}>
          <Avatar source={Images.avatar2} size="24" />
          <Text category="headline" status={"placeholder"} marginLeft={8}>
            by John Billy
          </Text>
        </View>
        <Text category="title3" marginBottom={24}>
          Week 1: Motion Design Pro: Become a designer
        </Text>
        <EduTabbar
          selectedIndex={activeTab}
          onChange={setActiveTab}
          tabs={["Lectures", "Discussion"]}
        />
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          shouldLoadComponent={(i) => i === activeTab}
        >
          <Lectures />
          <Lectures />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default VideoCourse;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: -44,
    padding: 24,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  playPause: {
    opacity: 0.8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  btnPlayPause: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlayPause: {
    tintColor: "text-basic-color",
    width: 24,
    height: 24,
  },
});
