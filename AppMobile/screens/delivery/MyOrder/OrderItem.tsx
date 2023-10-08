import React from "react";
import {
  View,
  TouchableOpacity,
  ImageRequireSource,
  Image,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import {
  useTheme,
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";
import { LinearGradient } from "expo-linear-gradient";

interface FoodItem {
  id: number;
  name: string;
  image: ImageRequireSource;
  price: number;
}

interface FavoriteItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  item: FoodItem;
  index?: number;
  _onRemove?(): void;
  disable?: boolean;
}

const OrderItem = ({
  item,
  index,
  _onRemove,
  disable,
  simultaneousHandlers,
}: FavoriteItemProps) => {
  const { id, image, name, price }: FoodItem = item;
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { width, height } = useLayout();

  const [orderNumber, setOrderNumber] = React.useState(2);

  const _onPlus = React.useCallback(() => {
    setOrderNumber(orderNumber + 1);
  }, [orderNumber]);
  const _onMinus = React.useCallback(() => {
    if (orderNumber >= 2) {
      setOrderNumber(orderNumber - 1);
    } else {
    }
  }, [orderNumber]);

  const TRANSLATE_X_THRESHOLD = (width - 48) * 0.25;

  const scrollX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event, ctx: any) => {
      // must fix
      ctx.startX = scrollX.value;
    },
    onActive: (event, ctx: any) => {
      // must fix
      scrollX.value = event.translationX;
      let x = ctx.startX + event.translationY;
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 2;
      if (x < swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD);
      } else {
        scrollX.value = withTiming(0);
      }
    },
    onEnd: (event, ctx: any) => {
      // must fix
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 2;
      if (swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD + 24);
      } else {
        scrollX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: scrollX.value,
      },
    ],
  }));

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: "transparent",
    };
  });

  const right = useAnimatedStyle(() => {
    const trans = interpolate(
      scrollX.value,
      [0, -(width - 48) * 0.25],
      [(width - 48) * 0.25, 0]
    );
    const opacity = interpolate(scrollX.value, [0, -width * 0.15], [0, 1]);

    return {
      transform: [
        {
          translateX: trans,
        },
      ],
      opacity: opacity,
      backgroundColor: "#FA2256",
      width: 48,
      height: "100%",
      borderRadius: 8,
      marginRight: 24,
    };
  });
  return (
    <AnimatedAppearance index={index}>
      <Animated.View
        style={[styles.container, { height: 96 * (height / 812) }]}
      >
        <Animated.View style={[styles.content, backgroundColor]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={_onRemove}
            style={styles.leftBox}
          >
            <Animated.View style={[styles.right, right]}>
              <Icon pack="assets" name="trash" style={[styles.iconTrash]} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={disable ? undefined : panGesture}
        >
          <Animated.View style={[styles.task, rStyle, { width: width - 48 }]}>
            <View style={styles.title}>
              <View>
                <LinearGradient
                  style={styles.linearImg}
                  colors={["rgba(19, 51, 116, 1)", "rgba(81, 145, 240, 1)"]}
                >
                  <Image
                    source={image}
                    /* @ts-ignore */
                    style={styles.imgFood}
                  />
                </LinearGradient>
                <View style={styles.orderNumber}>
                  <Text category="label" marginTop={2} center>
                    {orderNumber}
                  </Text>
                </View>
              </View>
              <View>
                <Text category="title4" marginBottom={4}>{`${name}`}</Text>
                <View style={styles.quantum}>
                  <TouchableOpacity
                    onPress={_onPlus}
                    style={{
                      backgroundColor: theme["color-salmon-700"],
                      borderRadius: 16,
                      padding: 4,
                    }}
                  >
                    <Icon pack="assets" name="plus" style={[styles.icon]} />
                  </TouchableOpacity>
                  <Text marginHorizontal={12} category="title4">
                    {orderNumber}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.54}
                    onPress={_onMinus}
                    disabled={orderNumber === 1}
                    style={{
                      backgroundColor: theme["background-basic-color-7"],
                      borderRadius: 16,
                      padding: 4,
                    }}
                  >
                    <Icon pack="assets" name="minus" style={[styles.icon]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.price}>
              <Text status={"primary"} category="headline">
                ${(orderNumber * item.price).toFixed(2)}
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </AnimatedAppearance>
  );
};

export default OrderItem;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  content: {
    height: "100%",
    position: "absolute",
    right: 0,
    left: 0,
    flexDirection: "row",
    overflow: "hidden",
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "background-basic-color-2",
    borderRadius: 8,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
  },
  leftBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  iconTrash: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 12,
    height: 12,
  },
  linearImg: {
    borderRadius: 8,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginLeft: 18,
  },
  quantum: {
    flexDirection: "row",
    alignItems: "center",
  },
  plus: {
    width: 12,
    height: 12,
  },
  imgFood: {
    width: 48,
    height: 48,
  },
  price: {
    borderRadius: 8,
    justifyContent: "center",
    borderWidth: 1,
    transform: [{ rotateZ: "90deg" }],
    paddingHorizontal: 8.5,
    paddingVertical: 6,
    borderColor: "text-primary-color",
    position: "absolute",
    right: 0,
  },
  orderNumber: {
    width: 16,
    height: 16,
    borderRadius: 99,
    position: "absolute",
    backgroundColor: "red",
    justifyContent: "center",
    top: -8,
    right: 8,
    zIndex: 10,
  },
});
