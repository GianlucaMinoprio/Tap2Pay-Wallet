import React, { memo } from "react";
import {
  View,
  Image,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Transitioning, TransitioningView } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "components/ProgressBar";

interface ItemProps {
  id: number;
  title: string;
  description: string;
  lesson?: number;
  totalLesson?: number;
  icon: ImageRequireSource;
  fill: string[];
}
interface DataProps {
  item: ItemProps;
  transition: React.ReactNode;
}

const CourseItem = memo(({ item, transition }: DataProps) => {
  const { width } = useLayout();
  const theme = useTheme();
  const WIDTH_ITEM = 152 * (width / 375);
  const styles = useStyleSheet(themedStyles);
  const courseRef = React.useRef<TransitioningView>(null);
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Transitioning.View ref={courseRef} transition={transition}>
        <LinearGradient
          colors={item.fill}
          style={[styles.item, { width: WIDTH_ITEM }]}
        >
          <Text category="title4" marginBottom={8} marginRight={12}>
            {item.title}
          </Text>
          <Text category="subhead" opacity={0.5} marginBottom={32}>
            {item.description}
          </Text>
          {item.lesson && item.totalLesson ? (
            <View>
              <View style={styles.lesson}>
                <Text category="caption2" opacity={0.5}>
                  {item.lesson}/{item.totalLesson} lesson
                </Text>
                <Text category="caption2">
                  {(item.lesson / item.totalLesson) * 100}%
                </Text>
              </View>
              <ProgressBar
                style={styles.progressBar}
                didDone={item.lesson}
                total={item.totalLesson}
                progressColor={theme["color-basic-100"]}
                containColor={"rgba(255, 255, 255, 0.2)"}
              />
            </View>
          ) : null}
          <View style={styles.footerItem}>
            <Image
              source={item.icon}
              /* @ts-ignore */
              style={styles.icon}
            />
            <Icon pack="assets" name="rightArrow" style={styles.arrRight} />
          </View>
        </LinearGradient>
      </Transitioning.View>
    </TouchableOpacity>
  );
});

export default CourseItem;

const themedStyles = StyleService.create({
  lesson: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  item: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 24,
  },
  progressBar: {
    marginBottom: 32,
  },
  icon: {
    width: 40,
    height: 40,
  },
  arrRight: {
    width: 16,
    height: 16,
    tintColor: "text-basic-color",
  },
  footerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
