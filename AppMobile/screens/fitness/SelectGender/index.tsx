import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Gender from "./Gender";
import { Images } from "assets/images";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const SelectGender = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isContinue, setContinue] = React.useState(false);
  React.useEffect(() => {
    if (selectedIndex !== 0) {
      setContinue(false);
    } else setContinue(true);
  }, [selectedIndex]);
  const onSelect = React.useCallback((num) => {
    setSelectedIndex(num);
  }, []);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.1, height * 0.15, height * 0.2],
      [0, 0, 1, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translateY.value,
      input,
      [60, 60, 15, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(translateY.value, input, [0, 0.5, 1, 1]);
    return {
      opacity: opacity,
      transform: [{ translateY: transY }, { scale: scale }],
      alignSelf: "center",
    };
  }, []);
  return (
    <Container style={styles.container}>
      <View style={[styles.header]}>
        <NavigationAction icon="leftArrow" />
        <Animated.View style={opacityHeader}>
          <Text category="title4" children="Choose your Gender" />
        </Animated.View>
        <Text
          children="Skip"
          uppercase
          status="primary"
          marginRight={16}
          category="body"
          onPress={goBack}
        />
      </View>
      <Animated.ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} onScroll={scrollHandler}>
        <Text
          status="white"
          category="title2"
          marginHorizontal={16}
          marginBottom={44}
        >
          Choose your{"\n"}Gender
        </Text>
        <View style={styles.selectGender}>
          <Gender
            title={"female"}
            image={Images.female}
            isChoose={selectedIndex === 1}
            num={1}
            onPress={onSelect}
          />
          <Gender
            title="male"
            image={Images.male}
            isChoose={selectedIndex === 2}
            num={2}
            onPress={onSelect}
          />
        </View>
      </Animated.ScrollView>
      <Button
        children="Continue"
        disabled={isContinue}
        style={[styles.continue]}
      />
    </Container>
  );
});

export default SelectGender;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  selectGender: {
    flexDirection: "row",
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  continue: {
    marginTop: 8,
    marginBottom: 26,
    marginLeft: 40,
    marginRight: 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
