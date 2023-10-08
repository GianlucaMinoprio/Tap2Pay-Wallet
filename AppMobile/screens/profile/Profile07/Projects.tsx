import React from "react";
import { View, FlatList, ImageBackground } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { Images } from "assets/images";
import Text from "components/Text";
import NavigationAction from "components/NavigationAction";
import AnimatedAppearance from "components/AnimatedAppearance";
import { Animation_Types_Enum } from "constants/Type";
interface Props {
  index: number;
}
const Projects = ({ index }: Props) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const wItem = (width - 63) / 2;
  return (
    <AnimatedAppearance type={Animation_Types_Enum.SlideBottom} index={index}>
      <FlatList
        numColumns={2}
        data={DATA}
        style={styles.flatList}
        keyExtractor={(i, _) => i.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <ImageBackground
              source={item.image}
              /* @ts-ignore */
              imageStyle={styles.imgStyle}
              style={{ width: wItem, height: wItem, alignItems: "flex-end" }}>
              <NavigationAction icon="heart" />
            </ImageBackground>
            <Text
              children={item.title}
              marginTop={12}
              marginBottom={4}
              category="headline"
            />
            <Text
              children={`${item.liked} Likes`}
              category="subhead"
              status="snow"
            />
          </View>
        )}
      />
    </AnimatedAppearance>
  );
};

export default Projects;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    marginRight: 15,
    marginBottom: 24,
  },
  flatList: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  imgStyle: {
    borderRadius: 12,
  },
});
const DATA = [
  {
    id: 1,
    image: Images.img01,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
  {
    id: 2,
    image: Images.img02,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
  {
    id: 3,
    image: Images.img03,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
  {
    id: 4,
    image: Images.img04,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
  {
    id: 5,
    image: Images.img05,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
  {
    id: 6,
    image: Images.img06,
    title: "Minimal ART NFT",
    liked: "12,048",
  },
];
