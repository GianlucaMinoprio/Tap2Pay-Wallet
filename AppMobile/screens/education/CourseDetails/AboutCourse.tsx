import React, { memo } from "react";
import { View, Image } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";

import useLayout from "hooks/useLayout";

import Text from "components/Text";
import ReadMore from "components/ReadMore";
import { Images } from "assets/images";
import AnimatedAppearance from "components/AnimatedAppearance";

const AboutCourse = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const Item = React.useCallback(({ item }) => {
    return (
      <View style={styles.desView}>
        <Image
          source={item.image}
          /* @ts-ignore */
          style={styles.desIcon}
        />
        <View>
          <Text category="title4">{item.title}</Text>
          <Text
            category="caption1"
            opacity={0.5}
            marginRight={50 * (width / 375)}
          >
            {item.des}
          </Text>
        </View>
      </View>
    );
  }, []);
  return (
    <View style={styles.container}>
      <AnimatedAppearance>
        <View>
          <View style={styles.header}>
            <View>
              <Text category="headline">⭐</Text>
              <Text category="subhead"> 4/5</Text>
            </View>
            <Layout style={styles.line} level={"2"} />
            <View>
              <Text category="headline">🖥️</Text>
              <Text category="subhead"> 50+ videos</Text>
            </View>
            <Layout style={styles.line} level={"2"} />
            <View>
              <Text category="headline">⏰️</Text>
              <Text category="subhead"> 12 hours</Text>
            </View>
          </View>
          <ReadMore
            marginBottom={16}
            children="When an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <View style={styles.footer}>
            {DATA.map((item, _) => {
              return <Item item={item} key={_} />;
            })}
          </View>
        </View>
      </AnimatedAppearance>
    </View>
  );
});

export default AboutCourse;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  line: {
    width: 1,
  },
  desIcon: {
    marginRight: 16,
  },
  footer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "text-grey-700",
    paddingBottom: 0,
  },
  desView: {
    flexDirection: "row",
    marginBottom: 16,
  },
});
const DATA = [
  {
    id: 0,
    image: Images.flight,
    title: "100% online",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
  {
    id: 1,
    image: Images.profit,
    title: "Beginner Level",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
  {
    id: 2,
    image: Images.recycle,
    title: "Flexible deadlines",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
];
