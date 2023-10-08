import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import DeliveryHeader from "../Component/DeliveryHeader";
import { Images } from "assets/images";
import OrderItem from "./OrderItem";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const MyOrder = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const progress = useSharedValue(0);
  const [promo, setPromo] = React.useState("");
  const bottomSheet = useAnimatedStyle(() => {
    const heightBottom = interpolate(
      progress.value,
      [0, 1],
      [24, 292 * (height / 812)],
      Extrapolate.EXTEND
    );
    const opacity = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, 0.8, 1],
      Extrapolate.CLAMP
    );
    return {
      height: heightBottom,
      position: "absolute",
      zIndex: 10,
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      opacity: opacity,
    };
  });
  return (
    <Container style={styles.container}>
      <DeliveryHeader title="My Order" iconLeft="leftArrow" iconRight="menu" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        {DATA.map((item, i) => {
          return <OrderItem item={item} key={i} />;
        })}
        <View style={{ marginTop: 76 * (height / 812) }}>
          <Input
            placeholder="Promo Code"
            value={promo}
            onChangeText={(t) => setPromo(t)}
            status={"outline"}
            accessoryLeft={<Icon pack="assets" name="creditCard" />}
          />
          <TouchableOpacity activeOpacity={0.54} style={styles.btnApply}>
            <Text category="caption1" marginHorizontal={24} marginVertical={15}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.total}>
        <Text category="title3">Total:</Text>
        <Text category="title2" status={"primary"}>
          $12.13
        </Text>
      </View>
      <View style={styles.bottom}>
        <Button children="Check out" style={styles.checkOut} size={"50"} />
        <Button
          children="Details"
          style={styles.details}
          status={"white"}
          size={"50"}
          onPress={() => (progress.value = withSpring(1))}
        />
      </View>
      <Animated.View style={bottomSheet}>
        <TouchableOpacity
          style={styles.indicatorBottom}
          onPress={() => (progress.value = withTiming(0))}
        >
          <Icon pack="assets" name="downChevron" style={styles.iconChevron} />
        </TouchableOpacity>
        <BlurView intensity={100} style={styles.blurView}>
          <View style={styles.bottomSheet}>
            <View>
              <Text category="title4" status={"grey500"} marginBottom={12}>
                Item total
              </Text>
              <Text category="title4" status={"grey500"} marginBottom={12}>
                Delivery Charge
              </Text>
              <Text category="title4" status={"grey500"} marginBottom={16}>
                Tax
              </Text>
              <Text category="title3">Total</Text>
            </View>
            <View style={styles.rightBottomSheet}>
              <Text category="title4" status={"grey500"} marginBottom={12}>
                $70.19
              </Text>
              <Text category="title4" status={"grey500"} marginBottom={12}>
                $10.49
              </Text>
              <Text category="title4" status={"grey500"} marginBottom={16}>
                $2.49
              </Text>
              <Text category="title2" status={"primary"}>
                $84.27
              </Text>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    </Container>
  );
});

export default MyOrder;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingTop: 0,
  },
  content: {
    marginHorizontal: 24,
    paddingTop: 24,
  },
  btnApply: {
    backgroundColor: "color-patrick-blue-100",
    position: "absolute",
    borderRadius: 49,
    right: 1,
    top: 1,
    bottom: 1,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  iconChevron: {
    tintColor: "text-basic-color",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  checkOut: {
    flex: 1,
    marginRight: 24,
  },
  details: {
    flex: 1,
  },
  handleStyle: {
    paddingTop: -24,
  },
  indicatorBottom: {
    width: 40,
    height: 40,
    borderWidth: 4,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    marginBottom: -20,
    backgroundColor: "color-basic-1500",
    borderColor: "background-basic-color-1",
    zIndex: 10,
  },
  bottomSheet: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
    marginHorizontal: 24,
  },
  rightBottomSheet: {
    alignItems: "flex-end",
  },
  blurView: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
    zIndex: -10,
  },
});
const DATA = [
  { id: 0, name: "Hot Dog Phomai", price: 5.07, image: Images.hotDog1 },
  { id: 1, name: "Ice Cream", price: 5.07, image: Images.iceCream },
  { id: 2, name: "Cappuccino", price: 5.07, image: Images.iceCream },
];
