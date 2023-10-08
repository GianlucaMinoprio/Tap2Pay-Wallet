import React, { memo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme, TopNavigation, Button, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import InputSelect from "./InputSelect";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { FinanceStackParamList } from "navigation/type";

const AddTransactionScreen = memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { width, bottom } = useLayout();

  const [type, setType] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const progress = useDerivedValue(() => {
    return type
      ? withTiming(1, { duration: 150 })
      : withTiming(0, { duration: 150 });
  }, [type]);

  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme["color-radical-600"], theme["color-salmon-600"]]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const expense = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [1, 0], [0.5, 1]);
    const scale = interpolate(progress.value, [1, 0], [1, 1.1]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });

  const income = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
    const scale = interpolate(progress.value, [0, 1], [1, 1.1]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });

  return (
    <Container>
      <TopNavigation
        title="Add Transaction"
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Animated.View style={[styles.box, { width: width - 48 }, style]}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setType(false)}
            >
              <Animated.View style={expense}>
                <Text category="headline" status="white">
                  Expense
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setType(true)}>
              <Animated.View style={income}>
                <Text category="headline" status="white" marginLeft={24}>
                  Income
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 4 }}>
            <CurrencyText category="title3" status="white">
              {value === "" ? 0 : parseInt(value)}
            </CurrencyText>
            <TextInput
              style={[styles.input, { ...StyleSheet.absoluteFillObject }]}
              keyboardType="number-pad"
              selectionColor="transparent"
              onChangeText={setValue}
            />
          </View>
        </Animated.View>
        <InputSelect title="Category" value={`Food & Drink`} onPress={goBack} />
        <InputSelect
          title="Calendar"
          value="Today, 20 Sept 2021"
          onPress={goBack}
        />
        <InputSelect title="Memo" value="Nothing" onPress={goBack} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.dash, { borderColor: theme["color-basic-800"] }]}
        >
          <Icon
            pack="assets"
            name="image"
            style={{ tintColor: theme["color-basic-1100"] }}
          />
          <Text category="headline" status="white" marginLeft={16}>
            Add Image
          </Text>
        </TouchableOpacity>
      </Content>
      <Button
        children="Create Now"
        style={[styles.button, { bottom: bottom + 16 }]}
        accessoryRight={<Icon pack="assets" name="rightArrow" />}
        onPress={goBack}
      />
    </Container>
  );
});

export default AddTransactionScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  box: {
    padding: 16,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    color: "transparent",
    paddingLeft: 14,
    fontSize: 24,
  },
  shape: {
    height: 101.6,
    marginTop: 32,
  },
  button: {
    position: "absolute",
    right: 24,
    left: 190,
  },
  dash: {
    height: 89,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
