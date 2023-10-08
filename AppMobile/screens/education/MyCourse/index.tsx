import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Content from "components/Content";
import Container from "components/Container";
import CourseSearch from "components/CourseSearch";
import { Transition } from "react-native-reanimated";
import AnimatedAppearance from "components/AnimatedAppearance";
import { DATA_MY_COURSE } from "constants/Data";
import CourseItem from "../Component/CourseItem";
import BasicHeader from "../Component/BasicHeader";
import { useNavigation } from "@react-navigation/native";
import LinearBottom from "components/LinearBottom";

const MyCourse = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  const [data, setDate] = React.useState(DATA_MY_COURSE);
  const transition = (
    <Transition.Sequence>
      <Transition.In durationMs={1500} type="fade" />
      <Transition.Change durationMs={1500} interpolation="easeInOut" />
      <Transition.Out durationMs={1500} type="fade" />
    </Transition.Sequence>
  );
  return (
    <Container style={styles.container}>
      <BasicHeader
        iconLeft={{ icon: "drawMenu", _onPress: goBack }}
        iconRight={{ icon: "notification", _onPress: goBack }}
        title="My Course"
        notification={3}
      />
      <Content contentContainerStyle={styles.content}>
        <AnimatedAppearance>
          <View>
            <CourseSearch />
            <View style={styles.middle}>
              <View>
                {data
                  .filter((_, i) => i % 2 === 0)
                  .map((item, _) => {
                    return (
                      <CourseItem item={item} key={_} transition={transition} />
                    );
                  })}
              </View>
              <View>
                {data
                  .filter((_, i) => i % 2 !== 0)
                  .map((item, _) => {
                    return (
                      <CourseItem item={item} key={_} transition={transition} />
                    );
                  })}
              </View>
            </View>
          </View>
        </AnimatedAppearance>
      </Content>
      <LinearBottom
        leftButton={{ icon: "house" }}
        rightButton={{ icon: "user" }}
      />
    </Container>
  );
});

export default MyCourse;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },

  content: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  notification: {
    position: "absolute",
    right: 16,
    top: 8,
    borderRadius: 99,
    backgroundColor: "red",
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
