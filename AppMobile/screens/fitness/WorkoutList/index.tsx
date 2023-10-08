import React, { memo } from "react";
import { Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import WorkoutItem from "components/WorkoutItem";

const WorkoutList = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Layout level={"4"} style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryRight={<NavigationAction icon="crown" marginRight={4} />}
          accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
        />
        <Text
          category="title2"
          status="white"
          marginVertical={8}
          marginLeft={16}
        >
          Warm Up
        </Text>
      </Layout>

      <Content
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Image source={Images.warmup} style={{ width: width }} />
        <Text category="title4" status="white" marginLeft={24} marginTop={24}>
          12 Asseessment
        </Text>
        {DATA.map((item, index) => {
          return <WorkoutItem data={item} key={index} />;
        })}
      </Content>
    </Container>
  );
});

export default WorkoutList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {},
  content: {
    paddingBottom: 40,
  },
});
const DATA = [
  {
    id: 0,
    title: "Begin Assessment",
    times: 20,
    rep: 3,
    image: Images.workList1,
  },
  {
    id: 1,
    title: "Begin Assessment",
    times: 20,
    rep: 3,
    image: Images.workList2,
  },
  {
    id: 2,
    title: "Begin Assessment",
    times: 20,
    rep: 3,
    image: Images.workList3,
  },
  {
    id: 3,
    title: "Begin Assessment",
    times: 20,
    rep: 3,
    image: Images.workList4,
  },
];
