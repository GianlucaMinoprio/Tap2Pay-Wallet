import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  id: number;
  image: ImageSourcePropType;
  level: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  title: string;
  description: string;
  titleButton: string;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}

const PlanItem = ({ item, onPress }: ItemProps) => {
  const { id, image, level, title, titleButton, description } = item;
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Layout
        style={[
          styles.container,
          { height: 194 * (height / 812), width: 327 * (width / 375) },
        ]}
        level={level}
      >
        <View style={styles.leftView}>
          <TouchableOpacity style={styles.btn}>
            <Text status="blue" category="subhead">
              {titleButton}
            </Text>
          </TouchableOpacity>
          <View>
            <Text category="title4" status="white" marginBottom={8}>
              {title}
            </Text>
            <Text category="subhead" status="white" opacity={0.5}>
              {description}
            </Text>
          </View>
        </View>
        <Image
          source={image}
          /* @ts-ignore */
          style={styles.image}
        />
      </Layout>
    </TouchableOpacity>
  );
};

export default PlanItem;

const themedStyles = StyleService.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "color-basic-1300",
    flexDirection: "row",
    paddingLeft: 24,
    paddingBottom: 24,
    marginBottom: 24,
    marginHorizontal: 24,
  },
  leftView: {
    justifyContent: "space-between",
  },
  btn: {
    height: 32,
    borderRadius: 16,
    width: 128,
    backgroundColor: "color-primary-100",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 160,
    height: 160,
  },
});
