import React, { memo } from "react";
import {
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";

const VideoCall = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const renderVideo = React.useCallback(({ item }) => {
    return (
      <View style={{ marginBottom: 12 }}>
        <Image
          source={item.image}
          style={{ width: 64, height: 80, borderRadius: 8 }}
        />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.rectangle4}
        resizeMode="cover"
        style={{
          width: width,
          height: height,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <NavigationAction icon="leftArrow" marginTop={top} marginLeft={12} />
        <View style={{ marginTop: top, marginRight: 16 }}>
          <FlatList
            data={DATA}
            renderItem={renderVideo}
            scrollEnabled={false}
            keyExtractor={(i, _) => i.id.toString()}
          />
        </View>
      </ImageBackground>
      <Layout level="2" style={styles.btn}>
        <Button
          status="transparent"
          style={styles.button}
          accessoryRight={<Icon pack="assets" name="volume" />}
        />
        <Button
          style={styles.btnCall}
          status="danger"
          onPress={goBack}
          accessoryRight={<Icon pack="assets" name="phoneCall" />}
        />
        <Button
          status="transparent"
          style={styles.button}
          accessoryRight={<Icon pack="assets" name="menu" />}
        />
      </Layout>
    </Container>
  );
});

export default VideoCall;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  button: {
    marginLeft: 12,
  },
  topNav: {
    backgroundColor: "transparent",
  },
  btnCall: {
    borderRadius: 8,
  },
  btn: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    borderRadius: 8,
    marginHorizontal: 24,
  },
});
const DATA = [
  {
    id: 0,
    image: Images.rectangle1,
  },
  {
    id: 1,
    image: Images.rectangle3,
  },
  {
    id: 2,
    image: Images.rectangle5,
  },
];
