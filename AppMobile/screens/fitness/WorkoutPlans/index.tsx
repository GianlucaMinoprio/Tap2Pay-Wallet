import React, { memo } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";

const WorkoutPlans = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Layout level="4" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction icon="happyFace" />}
          accessoryRight={<NavigationAction icon="calendar" />}
        />
        <Text category="title2" status="white" marginLeft={12} marginBottom={8}>
          WorkoutPlans
        </Text>
      </Layout>
      <Content contentContainerStyle={styles.content}>
        <Text
          children="Run with friends"
          category="title3"
          status="white"
          marginLeft={24}
          marginTop={24}
          marginBottom={16}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentRun}
        >
          {DATA.map((item, index) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={index}>
                <Layout style={[styles.item, { width: width - 155 }]} level="2">
                  <Button
                    status="transparent"
                    accessoryRight={<Icon pack="assets" name="heart" />}
                    style={styles.heart}
                  />
                  <Image
                    source={item.image}
                    /* @ts-ignore */
                    style={styles.image}
                  />
                  <Text
                    children={item.title}
                    category="title4"
                    status="white"
                    marginLeft={24}
                    marginBottom={4}
                    marginTop={24}
                  />
                  <Text
                    children={item.time}
                    category="subhead"
                    status="grey500"
                    marginLeft={24}
                  />
                </Layout>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text
          children="Collections"
          category="title3"
          status="white"
          marginLeft={24}
          marginTop={24}
          marginBottom={16}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentCollection}
        >
          {DATA_COLLECTION.map((item, _) => {
            return (
              <TouchableOpacity key={_}>
                <Layout
                  level={item.levelLayout}
                  style={[styles.itemCollect, { width: width - 95 }]}
                >
                  <Image
                    source={item.image}
                    /* @ts-ignore */
                    style={styles.image}
                  />
                  <Text
                    children={item.title}
                    marginLeft={24}
                    category="title4"
                  />
                  <Text
                    children={item.des}
                    marginBottom={16}
                    marginTop={4}
                    marginLeft={24}
                    category="subhead"
                    status="grey300"
                  />
                </Layout>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Content>
    </Container>
  );
});

export default WorkoutPlans;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 4,
  },
  content: {
    paddingBottom: 40,
  },
  heart: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  item: {
    marginRight: 16,
    borderRadius: 16,
    paddingVertical: 24,
  },
  image: {
    alignSelf: "center",
  },
  contentRun: {
    paddingHorizontal: 24,
  },
  contentCollection: {
    paddingHorizontal: 24,
  },
  itemCollect: {
    marginRight: 16,
    borderRadius: 16,
  },
});
const DATA = [
  { id: 0, image: Images.saly22, title: "Running Outdoor", time: "27 mins" },
  { id: 1, image: Images.saly21, title: "Ply on air", time: "27 mins" },
];
const DATA_COLLECTION = [
  {
    id: 0,
    title: "Running Outdoor",
    des: "12 Workouts - All Level",
    image: Images.saly35,
    levelLayout: "5",
  },
  {
    id: 0,
    title: "Running Outdoor",
    des: "12 Workouts - All Level",
    image: Images.saly35,
    levelLayout: "4",
  },
];
