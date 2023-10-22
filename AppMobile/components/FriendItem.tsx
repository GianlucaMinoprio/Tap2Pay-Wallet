import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  avatar: ImageSourcePropType;
  name: string;
  mutualFriends: number;
}
export interface FriendProps {
  item: Props;
  onPress?(): void;
  level?: "1" | "2" | "3" | "4";
}

const FriendItem = ({ item, onPress, level = "2" }: FriendProps) => {
  const theme = useTheme();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      style={[styles.container, { width: (width - 64) / 2 }]}
      level={level}
    >
      <Avatar
        source={item.avatar}
        size="giant"
        /* @ts-ignore */
        style={styles.avatar}
      />
      <Text
        children={item.name}
        category="headline"
        marginBottom={8}
        marginHorizontal={15}
        center
      />
      <Text
        children={`${item.mutualFriends} mutual friends`}
        status="snow"
        category="subhead"
        marginBottom={16}
        center
      />
      <Button
        children="Connect"
        status="primary"
        size="small"
        style={styles.button}
      />
    </Layout>
  );
};

export default FriendItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
  },
  button: {
    marginBottom: 20,
    flex: 1,
  },
  avatar: {
    marginTop: 24,
    marginBottom: 18,
  },
});
