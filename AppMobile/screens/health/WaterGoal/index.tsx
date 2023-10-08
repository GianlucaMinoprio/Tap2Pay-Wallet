import React, { memo } from "react";
import { View, ScrollView } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import WaterItem from "./WaterItem";
import { Images } from "assets/images";
import Line from "components/Line";
import ToggleReminder from "./ToggleReminder";

const WaterGoal = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(false);

  const onSelect = React.useCallback((num) => {
    setSelectedIndex(num);
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[styles.topNav, { paddingTop: top }]}
        accessoryLeft={
          <Text category="title4" status="white" marginLeft={16} marginTop={8}>
            Water Goal
          </Text>
        }
        accessoryRight={
          <View style={styles.rightTopNav}>
            <NavigationAction icon="calendar" />
            <NavigationAction icon="notification" />
          </View>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingLeft: 24 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <WaterItem
            title="Glass"
            mililit={400}
            image={Images.walter}
            isChoose={selectedIndex === 1}
            num={1}
            onPress={onSelect}
          />
          <WaterItem
            title="Bottle"
            mililit={600}
            image={Images.coca}
            isChoose={selectedIndex === 2}
            num={2}
            onPress={onSelect}
          />
          <WaterItem
            title="Glass"
            mililit={400}
            image={Images.walter}
            isChoose={selectedIndex === 3}
            num={3}
            onPress={onSelect}
          />
          <WaterItem
            title="Bottle"
            mililit={600}
            image={Images.coca}
            isChoose={selectedIndex === 4}
            num={4}
            onPress={onSelect}
          />
        </ScrollView>
        <Text category="title4" status="corn" marginLeft={24} marginTop={31}>
          Daily
        </Text>
        <View style={styles.dailyBottle}>
          <Text category="title1">6</Text>
          <Text category="body">Glass</Text>
        </View>
        <Line
          backgroundColor={theme["color-basic-1100"]}
          marginHorizontal={24}
        />
        <ToggleReminder
          checked={isChecked}
          onChange={setIsChecked}
          icon="notification"
          style={styles.toggle}
        />
      </Content>
      <Button
        children="SETUP GOAL"
        disabled={!selectedIndex}
        style={[styles.bottomBtn, { bottom: bottom + 26 }]}
      />
    </Container>
  );
});

export default WaterGoal;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  topNav: {
    backgroundColor: "background-basic-color-8",
  },
  rightTopNav: {
    flexDirection: "row",
    marginBottom: -4,
    alignItems: "center",
    marginRight: 4,
  },
  content: {
    marginTop: 24,
  },
  dailyBottle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginTop: 7,
    marginBottom: 5,
  },
  toggle: {
    marginTop: 42,
    marginLeft: 26,
    marginRight: 32,
  },
  bottomBtn: {
    marginRight: 40,
    marginLeft: 44,
    position: "absolute",
    left: 0,
    right: 0,
  },
});
