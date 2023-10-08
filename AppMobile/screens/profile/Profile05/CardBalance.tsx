import React, { memo } from "react";
import { View, TouchableOpacity, ImageSourcePropType } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import { Images } from "assets/images";

interface Props {
  id: number;
  avatar: ImageSourcePropType;
  balance: string | number;
  name:string
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}
const CardBalance = ({ item, onPress }: ItemProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: theme["background-basic-color-4"],
          paddingHorizontal: 16,
        },
        styles.container,
      ]}
    >
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Avatar source={item.avatar} size="64" />
          <View>
            <Text
              marginLeft={12}
              children={item.name}
              marginBottom={3}
              category="title3"
              status="white"
            />
            <Text
              marginLeft={12}
              children={`Balance: ${item.balance}`}
              category="subhead"
              status="snow"
            />
          </View>
        </View>
        <Icon
          pack="assets"
          name="rightChevron"
          style={{
            marginTop: 24,
            width: 16,
            height: 16,
            tintColor: theme["text-white-color"],
          }}
        />
      </Layout>
      <Button
        children="Become Gold Member"
        accessoryLeft={<Icon pack="assets" name="crown" />}
        style={{ marginLeft: 76, marginBottom: 18 }}
      />
    </TouchableOpacity>
  );
};

export default CardBalance;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
