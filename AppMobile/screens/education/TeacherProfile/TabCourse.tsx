import React, { memo } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";

interface Props {
  id: number;
  title: string;
  image: any;
}
interface DataProps {
  data: Props[];
}

const TabCourse = memo(({ data }: DataProps) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [collection, setCollection] = React.useState(1);
  return (
    <AnimatedAppearance>
      <View style={styles.course}>
        {data.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={() => setCollection(i)}
            >
              <ImageBackground
                source={item.image}
                style={{
                  width: 159 * (width / 375),
                  height: 128 * (height / 812),
                  marginBottom: 8,
                  padding: 20,
                }}
                imageStyle={{
                  borderRadius: 16,
                  borderWidth: collection === i ? 4 : 0,
                  borderColor: theme["color-primary-100"],
                }}
              >
                {collection === i ? (
                  <Icon pack="assets" name="exclude" />
                ) : null}
                <Text category="call-out" style={styles.textCollection}>
                  The{"\n"}
                  {item.title}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    </AnimatedAppearance>
  );
});

export default TabCourse;

const themedStyles = StyleService.create({
  course: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  textCollection: {
    bottom: 20,
    left: 20,
    position: "absolute",
  },
});
