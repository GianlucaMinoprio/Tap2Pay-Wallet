import React, { memo } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  ImageRequireSource,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { isEmpty } from "lodash";
import AnimatedAppearance from "components/AnimatedAppearance";

interface TeacherProps {
  id: number;
  name: string;
  course: string;
  avatar: ImageRequireSource;
}
interface CourseProps {
  id: number;
  title: string;
  price: number;
  image: ImageRequireSource;
  type: string;
  time: string;
  videoCount: string;
  rate: number;
}

interface PageDesignProps {
  dataCourse: CourseProps[];
  dataTeacher: TeacherProps[];
}
const PageDesign = memo(({ dataCourse, dataTeacher }: PageDesignProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const refCarousel = React.useRef(null);
  const wItem = 253 * (width / 375);
  const hItem = 334 * (height / 812);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = React.useCallback(({ item, index }) => {
    return (
      <ImageBackground
        resizeMode="cover"
        source={item.image}
        style={{
          width: wItem,
          height: hItem,
        }}
      >
        <LinearGradient
          colors={["#41B3FA", "#0085D6"]}
          style={[styles.price, { width: 49 * (width / 375) }]}
        >
          <Text category="headline">${item.price}</Text>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0)"]}
          style={styles.linear}
        >
          <Text category="title4" capitalize marginBottom={4}>
            {item.title}
          </Text>
          <Text category="caption1" capitalize marginBottom={8} opacity={0.6}>
            {item.type}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text category="caption2">⭐️ {item.rate}/5</Text>
            <Text category="caption2" marginHorizontal={16}>
              🖥️ {item.videoCount} videos
            </Text>
            <Text category="caption2">⏰️ {item.time}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }, []);
  return (
    <AnimatedAppearance>
      <ScrollView
        contentContainerStyle={styles.container}
        snapToEnd={false}
        decelerationRate="fast"
      >
        <View style={styles.title}>
          <Text category="title3">Most Popular</Text>
          <Button
            children="View all"
            size={"28"}
            style={styles.viewAll}
            status={"disable"}
          />
        </View>
        {/* <Carousel
          data={dataCourse}
          ref={refCarousel}
          layout="stack"
          sliderWidth={width}
          onSnapToItem={(index) => setActiveIndex(index)}
          itemWidth={wItem}
          itemHeight={hItem}
          renderItem={renderItem}
          firstItem={activeIndex}
          layoutCardOffset={width / 9.5}
          activeAnimationType={"spring"}
          activeSlideAlignment={"start"}
          loop
          contentContainerCustomStyle={styles.contentCarousel}
        /> */}
        <View style={styles.title}>
          <Text category="title3">Top Teacher</Text>
          <Button
            children="View all"
            size={"28"}
            style={styles.viewAll}
            status={"disable"}
          />
        </View>
        <View style={styles.teacherView}>
          {isEmpty(dataTeacher)
            ? null
            : dataTeacher.map((item, _) => {
                return (
                  <View style={styles.teacherItem} key={_}>
                    <Avatar source={item.avatar} shape="square" size={"48"} />
                    <View>
                      <Text category="title4" marginBottom={4} marginLeft={16}>
                        {item.name}
                      </Text>
                      <Text category="caption1" marginLeft={16}>
                        {item.course} Courses
                      </Text>
                    </View>
                    <Button
                      status={"disable"}
                      style={styles.btnMenu}
                      accessoryRight={<Icon pack="assets" name="menu" />}
                    />
                  </View>
                );
              })}
        </View>
      </ScrollView>
    </AnimatedAppearance>
  );
});

export default PageDesign;

const themedStyles = StyleService.create({
  container: {},
  contentCarousel: {
    paddingLeft: 24,
    marginBottom: 32,
  },
  teacherView: {
    marginHorizontal: 24,
  },
  btnMenu: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  teacherItem: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-2",
    padding: 10,
    flexDirection: "row",
    marginBottom: 16,
  },
  linear: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 24,
  },
  viewAll: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  price: {
    borderRadius: 12,
    alignItems: "center",
    margin: 16,
  },
});
