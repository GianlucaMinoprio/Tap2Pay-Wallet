import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, ViewPager } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ProgressCard from "./ProgressCard";
import BasicHeader from "../Component/BasicHeader";
import EduTabbar from "../Component/EduTabbar";
import Incomplete from "./Incomplete";

const CourseStatistic = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <BasicHeader
        iconLeft={{ icon: "drawMenu", _onPress: goBack }}
        iconRight={{ icon: "notification", _onPress: goBack }}
        title="Course Statistic"
      />
      <Content
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 80 }]}
      >
        <ProgressCard
          title="Your Course’s Progress Almost Done!"
          progress={80}
          completed={16}
          uncompleted={4}
        />
        <EduTabbar
          selectedIndex={activeTab}
          onChange={setActiveTab}
          tabs={["Incomplete", "Complete"]}
          style={styles.tabBar}
        />
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          shouldLoadComponent={(i) => i === activeTab}
        >
          <View>
            {DATA.map((item, i) => {
              return <Incomplete item={item} key={i} />;
            })}
          </View>
          <View>
            {DATA.map((item, i) => {
              return <Incomplete item={item} key={i} />;
            })}
          </View>
        </ViewPager>
      </Content>
    </Container>
  );
});

export default CourseStatistic;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginBottom: 24,
  },
  content: { paddingHorizontal: 24, marginTop: 24 },
});

const DATA = [
  {
    id: 0,
    title: "Motion Design Pro",
    from: "Google",
    progress: 53,
    image: Images.ggCourse01,
  },
  {
    id: 0,
    title: "UI/UX Designer",
    from: "Google",
    progress: 53,
    image: Images.ggCourse02,
  },
  {
    id: 0,
    title: "Typography Pro",
    from: "Google",
    progress: 53,
    image: Images.ggCourse03,
  },
];
