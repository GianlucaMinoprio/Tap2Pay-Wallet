import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
  Layout,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Content from "components/Content";
import Container from "components/Container";
import { Video } from "expo-av";

import NavigationAction from "components/NavigationAction";
import CustomSlider from "./CustomSlider";
import { Images } from "assets/images";
import WorkoutItem from "components/WorkoutItem";
import { TouchableHighlight, View } from "react-native";

const TrainingCount = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const videoPlayer = React.useRef<Video>(null);
  const [time, setTime] = React.useState("");
  const [minutes, setMinutes] = React.useState(0);
  const [second, setSecond] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [showPlayPause, setShowPlayPause] = React.useState(false);
  const [playPause, setPlayPause] = React.useState(false);

  const video = {
    uri:
      "https://res.cloudinary.com/whisky131/video/upload/v1633324283/gym_ml8gjg.mp4",
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
  React.useEffect(() => {
    let y = duration - (duration % 60000);
    let x = Math.floor(y / 60000);
    let z = (duration % 60000) / 1000;
    setMinutes(x);
    setSecond(z.toFixed(0));
    return setTime(
      `${minutes >= 10 ? `${minutes.toFixed(0)}` : `0${minutes}`}:${
        (duration % 60000) / 1000 <= 10 ? "0" : ""
      }${second}`
    );
  }, [duration, second, minutes]);
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
    <Container style={styles.container}>
      <TopNavigation
        style={[styles.topNav, { top: top }]}
        appearance="control"
        accessoryRight={<NavigationAction icon="leftArrow" />}
      />
      <TouchableHighlight onPress={() => setShowPlayPause(!showPlayPause)}>
        <View>
          <View>
            {showPlayPause ? (
              <Layout
                level="2"
                style={[
                  {
                    width: width,
                    height: height / 1.85,
                    marginTop: -((width * 1.25) / 6.5),
                  },
                  styles.playPause,
                ]}
              >
                <Button
                  onPress={PauseAndPlay}
                  status="success"
                  style={{ opacity: 2 }}
                  size="80"
                  accessoryRight={
                    <Icon pack="assets" name={playPause ? "play" : "pause"} />
                  }
                />
              </Layout>
            ) : null}
          </View>
          <Video
            source={video}
            resizeMode="stretch"
            style={{
              width: width,
              height: height / 1.85,
              marginTop: -((width * 1.25) / 6.5),
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
        </View>
      </TouchableHighlight>

      <CustomSlider
        value={duration}
        maxValue={currentTime}
        time={time}
        style={{ marginTop: -width / 8.5 }}
      />
      <Content style={{ marginTop: width / 15 }}>
        {DATA.map((item, index) => {
          return <WorkoutItem data={item} key={index} />;
        })}
      </Content>
    </Container>
  );
});

export default TrainingCount;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  backgroundVideo: {
    height: 250,
    width: "100%",
  },
  content: {
    marginTop: 28,
  },
  slider: {
    marginTop: -36,
  },
  topNav: {
    position: "absolute",
    zIndex: 10,
  },
  playPause: {
    opacity: 0.8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    left: 0,
  },
});
const DATA = [
  {
    id: 1,
    title: "Jump Jump",
    times: 20,
    rep: 3,
    image: Images.workList2,
  },
  {
    id: 2,
    title: "One legs",
    times: 20,
    rep: 3,
    image: Images.workList3,
  },
  {
    id: 3,
    title: "Yoga Time",
    times: 20,
    rep: 3,
    image: Images.workList4,
  },
];
