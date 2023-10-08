import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TabBar from "./TabBar";
import Recent from "./Recent";
import Favorites from "./Favorites";

const AddFoodBreakfast = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <Layout level="8" style={[{ paddingTop: top }]}>
        <TopNavigation
          style={styles.topNav}
          appearance="control"
          accessoryRight={<NavigationAction icon="search" />}
          accessoryLeft={<NavigationAction icon="leftArrow" />}
        />
        <Text category="title2" status="white" marginLeft={16} marginBottom={8}>
          Breakfast
        </Text>
      </Layout>
      <TabBar
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        style={styles.tabBar}
      />
      <ViewPager
        shouldLoadComponent={(index) => index === selectedIndex}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        style={styles.viewPage}
      >
        <Recent />
        <Favorites />
      </ViewPager>
    </Container>
  );
});

export default AddFoodBreakfast;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  content: {
    marginTop: 16,
  },
  tabBar: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  viewPage: {
    flex: 1,
  },
});
