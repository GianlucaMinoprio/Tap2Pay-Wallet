import React from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import NavigationAction from "components/NavigationAction";

const Header = () => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [itemFound, setItemFound] = React.useState(119);
  return (
    <View>
      <TopNavigation
        accessoryRight={<NavigationAction icon="shopping" />}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        style={styles.topNav}
        title="List Product"
      />
      <View style={styles.tabBar}>
        <Text
          marginLeft={16}
          children={`${itemFound} items`}
          category="subhead"
          status="placeholder"
        />
        <View style={styles.flexRow}>
          <Button
            onPress={goBack}
            status="transparent"
            accessoryRight={() => (
              <Icon pack="assets" name="list" style={styles.iconList} />
            )}
          />
          <Layout style={styles.line} />
          <Button
            onPress={goBack}
            status="transparent"
            accessoryRight={() => (
              <Icon pack="assets" name="grid" style={styles.iconGrid} />
            )}
          />
          <Button children="Filter" style={styles.filter} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "text-placeholder-color",
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
  },
  topNav: {
    paddingHorizontal: 4,
  },
  filter: {
    paddingLeft: 30,
    paddingRight: 25,
    borderRadius: 0,
  },
  line: {
    height: 24,
    width: 1,
  },
  iconList: {
    tintColor: "text-placeholder-color",
    width: 16,
    height: 16,
  },
  iconGrid: {
    tintColor: "text-white-color",
    width: 16,
    height: 16,
  },
});
