import React, { memo } from "react";
import { FlatList } from "react-native";
import { StyleService, useStyleSheet, ViewPager } from "@ui-kitten/components";

import Container from "components/Container";
import CourseSearch from "components/CourseSearch";
import CourseTab from "../Component/CourseTab";
import PageDesign from "./PageDesign";
import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import BasicHeader from "../Component/BasicHeader";
import { useNavigation } from "@react-navigation/native";

const HomePage = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  const [activeTab, setActiveTab] = React.useState(0);
  const _onSearch = () => {};

  const renderItem = React.useCallback(() => {
    return (
      <CourseTab
        activeIndex={activeTab}
        onChange={setActiveTab}
        style={styles.tabStyle}
      />
    );
  }, [activeTab]);
  const renderHeader = React.useCallback(() => {
    return <CourseSearch _onSearch={_onSearch} style={styles.input} />;
  }, []);

  return (
    <Container style={styles.container}>
      <BasicHeader
        iconLeft={{ icon: "drawMenu", _onPress: goBack }}
        iconRight={{ icon: "notification", _onPress: goBack }}
        title="Homepage"
        notification={3}
      />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <ViewPager
            selectedIndex={activeTab}
            onSelect={setActiveTab}
            swipeEnabled={false}
            shouldLoadComponent={(index) => index === activeTab}
          >
            <PageDesign dataCourse={DATA_COURSE} dataTeacher={DATA_TEACHER} />
            <PageDesign dataCourse={DATA_COURSE} dataTeacher={DATA_TEACHER} />
            <PageDesign dataCourse={DATA_COURSE} dataTeacher={DATA_TEACHER} />
          </ViewPager>
        )}
      />
      
    </Container>
  );
});

export default HomePage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
  },
  input: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  tabStyle: {
    marginBottom: 24,
    marginLeft: 24,
  },
});
const DATA_TEACHER = [
  { id: 0, avatar: Images.avatar5, name: "Alex Turboe", course: "25+" },
  { id: 1, avatar: Images.avatar5, name: "Slimb Huoldin", course: "45+" },
  { id: 2, avatar: Images.avatar5, name: "Alex Turboe", course: "25+" },
];
const DATA_COURSE = [
  {
    id: 0,
    image: Images.ggCourse01,
    title: "User interface design",
    type: "google course",
    price: 48,
    time: "12 hours",
    videoCount: "50+",
    rate: 4,
  },
  {
    id: 0,
    image: Images.ggCourse02,
    title: "User interface design",
    type: "google course",
    price: 58,
    time: "12 hours",
    videoCount: "100+",
    rate: 4,
  },
  {
    id: 0,
    image: Images.ggCourse03,
    title: "User interface design",
    type: "google course",
    price: 48,
    time: "12 hours",
    videoCount: "50+",
    rate: 4,
  },
];
