import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";
import { useForm, Controller } from "react-hook-form";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

interface Props {
  title: string;
  icon: string;
  priceCoin: number;
}

const ExchangeScreen = memo(({ title, icon, priceCoin }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [activeX, setActiveX] = React.useState(false);
  const [activeY, setActiveY] = React.useState(false);

  const progressX = useDerivedValue(
    () => (activeX ? withSpring(1) : withSpring(0)),
    [activeX]
  );
  const progressY = useDerivedValue(
    () => (activeY ? withSpring(1) : withSpring(0)),
    [activeY]
  );

  const dropXStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progressX.value, [0, 1], [0, -90]);
    return {
      transform: [
        {
          rotateZ: `${rotate}deg`,
        },
      ],
      marginRight: 4,
    };
  }, [progressX.value]);

  const dropYStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progressY.value, [0, 1], [0, -90]);
    return {
      transform: [
        {
          rotateZ: `${rotate}deg`,
        },
      ],
      marginRight: 4,
    };
  }, [progressY.value]);

  const onActiveX = React.useCallback(() => setActiveX(!activeX), [activeX]);
  const onActiveY = React.useCallback(() => setActiveY(!activeY), [activeX]);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pay: "3.29",
      get: "5000",
    },
  });
  return (
    <AnimatedAppearance>
      <View style={{ marginHorizontal: 24 }}>
        <View style={styles.footer}>
          <View style={styles.price}>
            <View style={styles.logo}>
              <Layout style={styles.icon} level={"2"}>
                <Icon pack="assets" name={icon} style={{}} />
              </Layout>
              <Text category="headline">1 {title}</Text>
            </View>
            <Text category="headline">${priceCoin.toLocaleString()}</Text>
          </View>
        </View>
        <Text category="caption1" status={"grey"} marginBottom={8}>
          Get
        </Text>
        <Controller
          name="get"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryRight={(props) => (
                <TouchableOpacity onPress={onActiveX} activeOpacity={0.7}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Layout style={styles.line} level={"2"} />
                    <Layout style={styles.logoInput}>
                      <Icon
                        pack="assets"
                        name={"dollar"}
                        style={{ transform: [{ scale: 0.9 }] }}
                      />
                    </Layout>
                    <Animated.View style={dropXStyle}>
                      <Icon
                        pack="assets"
                        name="downChevron"
                        style={styles.dropIcon}
                      />
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              )}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => {}}
              value={value}
              size="small"
              onChange={onChange}
              keyboardType="numeric"
              style={styles.input}
            />
          )}
        />
        <Text category="caption1" status={"grey"} marginBottom={8}>
          Pay
        </Text>
        <Controller
          name="pay"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryRight={(props) => (
                <TouchableOpacity onPress={onActiveY} activeOpacity={0.7}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Layout style={styles.line} level={"2"} />
                    <Layout style={styles.logoInput}>
                      <Icon
                        pack="assets"
                        name={icon}
                        style={{ transform: [{ scale: 0.9 }] }}
                      />
                    </Layout>
                    <Animated.View style={dropYStyle}>
                      <Icon
                        pack="assets"
                        name="downChevron"
                        style={styles.dropIcon}
                      />
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              )}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => {}}
              size="small"
              value={value}
              onChange={onChange}
              keyboardType="numeric"
              style={styles.input}
            />
          )}
        />
        <Button children="Exchange" status="control" style={styles.exchange} />
      </View>
    </AnimatedAppearance>
  );
});

export default ExchangeScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  exchange: {
    marginTop: 10,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  footer: {
    flex: 1,
  },
  input: {
    marginBottom: 24,
  },
  line: {
    width: 1,
    height: 20,
    marginRight: 12,
    backgroundColor: "color-basic-1500",
  },
  logoInput: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 0.5 }],
    marginRight: 4,
  },
  dropIcon: {
    width: 16,
    height: 16,
    tintColor: "text-snow-color",
  },
});
