import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import Header from "./Header";
import ProgressBar from "components/ProgressBar";
import BottomBar from "./BottomBar";

const Profile10 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const DATA_Achieve = [
    {
      id: 0,
      image: Images.baby,
      color: theme["color-radical-600"],
    },
    {
      id: 1,
      image: Images.wale,
      color: theme["color-emerald-100"],
    },
    {
      id: 2,
      image: Images.avocado,
      color: theme["color-salmon-100"],
    },
    {
      id: 3,
      image: Images.medal,
      color: theme["color-patrick-blue-100"],
    },
  ];

  const [data, setData] = React.useState(DATA_Achieve);
  return (
    <Container style={[styles.container, { paddingTop: top }]}>
      <ImageBackground
        source={Images.frame01}
        style={{ width: width, height: height }}
      >
        <Header />
        <Content>
          <ImageBackground source={Images.union} style={styles.hiThere}>
            <Text children="Hi There 👋" />
          </ImageBackground>
          <Image
            source={Images.girlWithLaptop}
            /* @ts-ignore */
            style={styles.girl}
          />
          <View style={styles.achieve}>
            {data.map((item, index) => {
              return (
                <Button
                  key={index}
                  accessoryRight={() => <Image source={item.image} />}
                  activeOpacity={0.7}
                  style={[{ backgroundColor: item.color }, styles.button]}
                />
              );
            })}
          </View>
          <Text
            children="My Courses"
            category="title3"
            status="white"
            marginLeft={24}
            marginBottom={16}
          />
          <Layout level="4" style={styles.card01}>
            <Image
              source={Images.rectangle1}
              /* @ts-ignore */
              style={styles.imgCard}
            />
            <View style={styles.textCard}>
              <Text
                children="How to make UI Mobile App"
                category="headline"
                status="white"
              />
              <Text category="body" status="snow">
                Done:
                <Text category="headline" status="white" children=" 8" />
                /13
              </Text>
              <ProgressBar
                didDone={4}
                total={10}
                styleBar={styles.progressBar}
                style={styles.progressBar}
              />
            </View>
          </Layout>
          <Layout level="5" style={styles.card02}>
            <Image
              source={Images.rectangle1}
              /* @ts-ignore */
              style={styles.imgCard}
            />
            <View style={styles.textCard}>
              <Text
                children="Better Marketing Design?"
                category="headline"
                status="white"
              />
              <Text category="body" status="snow">
                Done:
                <Text category="headline" status="white" children=" 8" />
                /13
              </Text>
              <ProgressBar
                didDone={4}
                total={10}
                styleBar={styles.progressBar}
                style={styles.progressBar}
              />
            </View>
          </Layout>
        </Content>
        <BottomBar />
      </ImageBackground>
    </Container>
  );
});

export default Profile10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  card01: {
    borderRadius: 12,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingLeft: 11,
    flexDirection: "row",
  },
  girl: {
    alignSelf: "center",
    marginTop: 30,
  },
  card02: {
    borderRadius: 12,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingLeft: 11,
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 120,
  },
  progressBar: {
    height: 8,
  },
  textCard: {
    marginLeft: 16,
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  achieve: {
    marginTop: 44,
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 64,
    height: 64,
  },
  imgCard: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  hiThere: {
    width: 130,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 18,
    marginBottom: -44,
    marginRight: 20,
    paddingHorizontal: 12,
  },
});
