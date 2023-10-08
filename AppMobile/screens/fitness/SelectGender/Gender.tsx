import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
interface Props {
  isChoose: boolean;
  onPress: (num: number) => void;
  image: ImageSourcePropType;
  num: number;
  title: string;
}
const Gender = ({ isChoose, onPress, num, image, title }: Props) => {
  const onSelect = React.useCallback(() => {
    onPress && onPress(num);
  }, [num, onPress]);
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
      <Layout
        style={[
          styles.container,
          {
            width: (width - 88) / 2,
          },
        ]}
      >
        <View
          style={[
            styles.content,
            {
              backgroundColor: isChoose
                ? theme["color-primary-100"]
                : theme["color-basic-2200"],

              width: (width - 88) / 2,
              height: "60%",
            },
          ]}
        />
        <Image source={image} style={{ zIndex: 10 }} />
        <Text
          category="title3"
          capitalize
          marginTop={8}
          center
          marginBottom={14}
          status={isChoose ? "black" : "placeholder"}
        >
          {title}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default Gender;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "transparent",
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
