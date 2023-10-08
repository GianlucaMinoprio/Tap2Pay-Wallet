import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ProgressBar from "components/ProgressBar";

const Header = () => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.flexRow}>
          <Avatar
            source={Images.avatar6}
            size="56"
            /* @ts-ignore */
            style={styles.avatar}
          />
          <View style={styles.textView}>
            <ProgressBar
              didDone={4}
              total={10}
              styleBar={styles.progressBar}
              style={styles.progressBar}
            />
            <View style={styles.level}>
              <Text
                marginLeft={28}
                children="Level 13"
                category="subhead"
                status="snow"
              />
              <Image
                source={Images.medal}
                /* @ts-ignore */
                style={styles.medal}
              />
            </View>
          </View>
        </View>

        <Button
          onPress={goBack}
          style={styles.crownBtn}
          children="13,680"
          accessoryLeft={<Icon pack="assets" name="crown" />}
        />
      </View>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    borderRadius: 20,
    zIndex: 10,
  },
  medal: {
    width: 14,
    height: 20,
    marginLeft: 4,
  },
  textView: {
    marginLeft: -20,
    marginTop: 11,
  },
  level: {
    flexDirection: "row",
    marginTop: 5,
  },
  progressBar: {
    height: 16,
    width: 120,
    borderRadius: 24,
  },
  crownBtn: {
    paddingHorizontal: 14.5,
    paddingVertical: 8,
    height: 36,
  },
});
