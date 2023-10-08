import React, { memo } from "react";
import { View, Image, ScrollView } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";

const Gallery = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text category="title3" marginBottom={16} status="white">
        Gallery
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((i, _) => {
          return (
            <Image
              key={_}
              source={i.image}
              /* @ts-ignore */
              style={styles.img}
            />
          );
        })}
      </ScrollView>
    </View>
  );
});

export default Gallery;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  img: {
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    paddingRight: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.gallery01,
  },
  {
    id: 1,
    image: Images.gallery02,
  },
  {
    id: 2,
    image: Images.gallery03,
  },
  {
    id: 3,
    image: Images.gallery01,
  },
];
