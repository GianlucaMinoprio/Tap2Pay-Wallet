import React, { memo } from "react";
import { Image, View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";
import Dots from "components/Dots";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const Header = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Button
        children={"Discount 10% first time"}
        size="large"
        style={styles.btnDiscount}
      />
      <Layout level="4" style={styles.layout}>
        <View style={styles.leftLayout}>
          <Dots
            data={DATA}
            widthDot={8}
            heightDot={8}
            widthInterpolate={8}
            translationValue={translationX}
            status="white"
            style={styles.dots}
          />
        </View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          horizontal
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width, zIndex: -10 }}
          contentContainerStyle={{ width: width * 3.9 }}
        >
          {DATA.map((i, _) => {
            return (
              <Animated.View
                style={[{ width: width, flexDirection: "row" }]}
                key={_}
              >
                <Text
                  children={"Discount\n10%\nfirst time"}
                  category="title2"
                  marginRight={55}
                  marginLeft={32}
                />
                <Animated.Image
                  source={Images.guyRiding}
                  /* @ts-ignore */
                  style={styles.img}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </Layout>

      <Image
        source={Images.eRec01}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
      <Image
        source={Images.eRec02}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
      <Image
        source={Images.eRec03}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
    </View>
  );
});

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 4,
  },
  btnDiscount: {
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  layout: {
    flexDirection: "row",
    paddingVertical: 20,
    borderRadius: 8,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftLayout: {
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 12,
  },
  discountImg: {
    borderRadius: 4,
    marginVertical: 8,
  },
  dots: {
    position: "absolute",
    bottom: 0,
    left: 32,
    zIndex: 10,
  },
  img: {
    alignSelf: "flex-start",
  },
});
const DATA = [
  {
    id: 0,
    image: Images.guyRiding,
  },
  {
    id: 1,
    image: Images.guyRiding,
  },
  {
    id: 2,
    image: Images.guyRiding,
  },
  {
    id: 3,
    image: Images.guyRiding,
  },
];
