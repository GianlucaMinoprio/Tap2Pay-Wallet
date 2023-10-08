import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import ProgressSchedule from "../Component/ProgressSchedule";
import AnimatedAppearance from "components/AnimatedAppearance";

const ScheduleCourse = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <AnimatedAppearance>
        <ProgressSchedule
          step={3}
          timeStep={["Week 1", "Week 2", "Week 3", "Week 4"]}
        />
      </AnimatedAppearance>
    </View>
  );
});

export default ScheduleCourse;

const themedStyles = StyleService.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    flex: 1,
  },
});
