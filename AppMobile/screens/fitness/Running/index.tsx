import React, { memo } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import useTimer from "hooks/useTimer";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { Audio } from "expo-av";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const track = {
  uri: "https://res.cloudinary.com/whisky131/video/upload/v1633324288/gym_tgfw0n.mp4",
};

const Running = memo(() => {
  const { goBack } = useNavigation();
  const { top, height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [km, setKm] = React.useState(2.56);
  const [step, setStep] = React.useState("3,246");
  const [state, setstate] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());

  React.useEffect(() => {
    LoadAudio();
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.current.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const PlayAudio = React.useCallback(async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {}
  }, []);

  const PauseAudio = React.useCallback(async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {}
  }, []);

  const Muted = React.useCallback(async (props) => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isMuted === true) {
          sound.current.setIsMutedAsync(false);
        } else {
          sound.current.setIsMutedAsync(true);
        }
      }
    } catch (error) {}
  }, []);
  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(track, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const formatTime = (timer: number) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };
  const { timer, isPlay, handleStart, handlePause } = useTimer(625);

  return (
    <Container style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={state}
        style={[StyleSheet.absoluteFill, { opacity: 0.25 }]}
      />
      <Content
        contentContainerStyle={styles.content}
        style={{ paddingTop: top }}
      >
        <View>
          <View style={styles.kilometer}>
            <Text category="extra-2">{km}</Text>
            <Text
              children="Km"
              category="body"
              status="grey500"
              marginTop={36}
              marginLeft={8}
            />
          </View>
          <Text category="roboto" status="white" marginTop={84}>
            {step}
          </Text>
          <Text
            category="body"
            children="Step"
            status="grey500"
            marginBottom={24}
          />
          <Text children={formatTime(timer)} category="roboto" status="white" />
          <Text category="body" children="Time" status="grey500" />
        </View>
        <View>
          <Image
            source={Images.girlRiding}
            style={[
              /* @ts-ignore */
              styles.image,
            ]}
            resizeMode="contain"
          />
          <Image
            source={Images.oval}
            /* @ts-ignore */
            style={styles.oval}
          />
        </View>
      </Content>

      <View style={styles.bottom}>
        <Button
          onPress={() => {
            goBack(), handlePause();
          }}
          size="48"
          status="danger"
          accessoryRight={<Icon pack="assets" name="camera" />}
        />
        {!isPlay ? (
          <Button
            onPress={() => {
              handleStart();
              PlayAudio();
            }}
            status="control"
            size="80"
            accessoryRight={<Icon pack="assets" name="play" />}
          />
        ) : (
          <Button
            onPress={() => {
              handlePause();
              PauseAudio();
            }}
            status="control"
            size="80"
            accessoryRight={<Icon pack="assets" name="pause" />}
          />
        )}
        <Button
          onPress={Muted}
          style={styles.btnMusic}
          size="48"
          accessoryRight={() => (
            <Icon pack="assets" name="music" style={styles.music} />
          )}
        />
      </View>
    </Container>
  );
});

export default Running;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  content: {
    flexDirection: "row",
    paddingLeft: 36,
  },
  kilometer: {
    flexDirection: "row",
    marginTop: 20,
  },
  image: {
    marginTop: 65,
    marginLeft: -24,
  },
  bottom: {
    marginBottom: 40,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 60,
    justifyContent: "space-between",
  },
  music: {
    width: 16.6,
    height: 24,
    tintColor: "text-blue-color",
  },
  btnMusic: {
    width: 48,
    height: 48,
  },
  oval: {
    marginTop: -16,
    marginLeft: -32,
  },
});
