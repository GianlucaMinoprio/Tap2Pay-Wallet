import React, { memo } from "react";
import { ImageBackground, FlatList } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Container from "components/Container";
import BasicHeader from "../Component/BasicHeader";
import { Images } from "assets/images";
import DetailsCard from "../Component/DetailsCard";

import EduTabbar from "../Component/EduTabbar";
import AboutCourse from "./AboutCourse";
import ScheduleCourse from "./ScheduleCourse";
import keyExtractor from "utils/keyExtractor";
import Review from "./ReviewCourse";

const CourseDetails = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [selectIndex, setSelectIndex] = React.useState(0);
  const renderItem = React.useCallback(() => {
    return (
      <>
        <DetailsCard
          title="Participate in the Corra Finance Airdrop on CoinMarketCap"
          avatar={Images.avatar1}
          madeBy="John Billy"
          price={90}
          discount={45}
          style={styles.card}
        />
        <Layout style={styles.layout}>
          <EduTabbar
            selectedIndex={selectIndex}
            onChange={setSelectIndex}
            style={styles.tabBar}
            tabs={["about", "Schedule", "Review"]}
          />
          <ViewPager
            selectedIndex={selectIndex}
            onSelect={setSelectIndex}
            shouldLoadComponent={(i) => i == selectIndex}
            style={{ height: height }}
          >
            <AboutCourse />
            <ScheduleCourse />
            <Review />
          </ViewPager>
        </Layout>
      </>
    );
  }, [selectIndex]);
  return (
    <Container style={styles.container}>
      <BasicHeader
        appearance={"control"}
        iconLeft={{ icon: "leftArrow", _onPress: goBack }}
        iconRight={{ icon: "heart", _onPress: goBack }}
      />
      <ImageBackground
        source={Images.ggCourse01}
        style={[styles.background, { width: width, height: height / 1.8 }]}
      />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
      <Layout style={styles.footer}>
        <Button children="Buy Now" onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default CourseDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {},
  tabBar: {
    marginTop: 84,
    marginBottom: 8,
    marginHorizontal: 24,
  },
  card: {
    marginBottom: -60,
    zIndex: 10,
  },
  content: {
    marginTop: 64,
    paddingBottom: 62,
  },
  background: {
    position: "absolute",
    top: 0,
    zIndex: -10,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});
