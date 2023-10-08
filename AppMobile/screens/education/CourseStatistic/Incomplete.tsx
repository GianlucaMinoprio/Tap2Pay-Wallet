import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "components/Text";
import ProgressBar from "components/ProgressBar";
import { Images } from "assets/images";

interface Props {
  id: number;
  title: string;
  from: string;
  progress: number;
  image: ImageRequireSource;
}
interface IncompleteProps {
  item: Props;
}

const Incomplete = memo(({ item }: IncompleteProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={item.image}
          /* @ts-ignore */
          style={styles.image}
        />
        <Image
          source={Images.play}
          /* @ts-ignore */
          style={styles.iconPlay}
        />
      </View>
      <View style={styles.title}>
        <Text category="headline" marginBottom={4}>
          {item.title}
        </Text>
        <Text category="caption1">{item.from}</Text>
        <View style={styles.bar}>
          <ProgressBar
            didDone={item.progress}
            style={styles.progressBar}
            total={100}
            containColor={theme["background-basic-color-2"]}
          />
          <Text
            status={"placeholder"}
            category="subhead"
            marginLeft={11}
            marginBottom={-3}
            children={`${item.progress}%`}
          />
        </View>
      </View>
    </View>
  );
});

export default Incomplete;

const themedStyles = StyleService.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-2",
    paddingBottom: 16,
    flexDirection: "row",
    marginBottom: 16,
  },
  iconPlay: {
    position: "absolute",
    alignSelf: "center",
    top: 33 - 12,
    width: 24,
    height: 24,
  },
  bar: {
    flexDirection: "row",
  },
  progressBar: {
    flex: 1,
    alignSelf: "flex-end",
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    marginLeft: 14,
  },
});
