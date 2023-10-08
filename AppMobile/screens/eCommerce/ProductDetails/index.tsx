import React, { memo } from "react";
import { Image, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  Input,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Container from "components/Container";
import Text from "components/Text";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Dots from "components/Dots";
import StarRate from "components/StarRate";
import { RefreshControl } from "react-native-web-refresh-control";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ProductDetails = memo(() => {
  const theme = useTheme();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const [rate, setRate] = React.useState(4);
  const [value, setValue] = React.useState<number>(3);

  const RenderItem = React.useCallback(({ item, index }) => {
    const styleAni = useAnimatedStyle(() => {
      let input = [
        (item.id - 1) * width,
        item.id * width,
        (item.id + 1) * width,
      ];
      const scale = interpolate(
        translationX.value,
        input,
        [0.61, 1, 0.61],
        Extrapolate.CLAMP
      );
      const opacity = interpolate(translationX.value, input, [-1, 1, -1]);
      return {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 44,
        transform: [{ scale: scale }],
        opacity: withTiming(opacity, {
          duration: 350,
          easing: Easing.linear,
        }),
      };
    });
    return (
      <Animated.View style={[{ width: width }, styleAni]}>
        <Image
          source={item.image}
          style={{ width: width - 160, height: width - 203.8 }}
        />
      </Animated.View>
    );
  }, []);
  return (
    <Container style={styles.container} level="2">
      <Layout
        level="1"
        style={{
          position: "absolute",
          height: height / 2,
          top: 0,
          width: width,
        }}
      />
      <TopNavigation
        appearance="control"
        accessoryRight={<NavigationAction icon="shopping" />}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        style={styles.topNav}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={-bottom + 20}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{
            width: width,
            backgroundColor: theme["background-basic-color-1"],
          }}
          contentContainerStyle={{ width: width * 4 }}
        >
          {data.map((item, index) => {
            return <RenderItem item={item} index={index} key={index} />;
          })}
        </Animated.ScrollView>

        <View
          style={{
            height: height / 1.9,
            backgroundColor: theme["background-basic-color-1"],
          }}
        >
          <Dots
            data={data}
            widthDot={8}
            widthInterpolate={8}
            translationValue={translationX}
            style={styles.dot}
          />
          <Layout style={styles.layout} level={"2"}>
            <View style={styles.topLayout}>
              <Text category="title2" status="white">
                Donnut 3D
              </Text>
              <Button
                status="transparent"
                accessoryRight={<Icon pack="assets" name="heart" />}
              />
            </View>
            <Text children="123ETH" status="primary" category="title4" />
            <StarRate
              style={styles.starRate}
              defaultRate={rate}
              setDefaultRate={setRate}
              reviewer={214}
            />
            <Text
              status="snow"
              category="body"
              children="Occaecat ipsum magna veniam proident aliquip irure enim mollit cillum esse. Dolore eu amet Lorem est quis reprehenderit eu. Aute incididunt magna voluptate incididunt irure tempor amet est quis ullamco..."
            />
            <View style={styles.qty}>
              <Text children="qty" uppercase status="white" category="title4" />
              <View style={styles.card}>
                <Button
                  status="transparent"
                  children="-"
                  size="tiny"
                  disabled={value === 0}
                  onPress={() => setValue(value - 1)}
                />
                <Input
                  onChangeText={(nextValue) => {
                    let x = parseInt(nextValue);
                    return setValue(x);
                  }}
                  value={value >= 0 ? `${value}` : "0"}
                  status="disableFill"
                  keyboardType="numeric"
                />
                <Button
                  status="transparent"
                  children="+"
                  size="tiny"
                  onPress={() => setValue(value + 1)}
                />
              </View>
            </View>
          </Layout>
        </View>
      </KeyboardAwareScrollView>
      <View style={[styles.bottom, { paddingBottom: bottom + 8 }]}>
        <Button
          children="Add to cart"
          status="disable"
          style={styles.addCard}
        />
        <Button children="Buy Now" style={styles.buyNow} />
      </View>
    </Container>
  );
});

export default ProductDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  dot: {
    alignSelf: "center",
    marginBottom: 20,
  },
  layout: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: "transparent",
  },
  starRate: {
    marginVertical: 16,
  },
  bottom: {
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 8,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    borderRadius: 12,
    borderColor: "color-basic-1500",
    borderWidth: 1,
    flexDirection: "row",
    height: 56,
    minWidth: 124,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  topLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  qty: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  addCard: {
    flex: 1,
  },
  buyNow: {
    flex: 1,
    marginLeft: 16,
  },
  content: {
    paddingBottom: 60,
  },
});
const data = [
  { id: 0, image: Images.donut },
  { id: 1, image: Images.donut },
  { id: 2, image: Images.donut },
  { id: 3, image: Images.donut },
];
