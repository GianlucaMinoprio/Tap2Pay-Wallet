import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@ui-kitten/components";
import { FriendFragment } from "constants/Type";

interface FriendProps {
  item: FriendFragment;
  onPress?(): void;
}

const Friend = ({ item, onPress }: FriendProps) => {
  const { image } = item;

  const avatarSource = (typeof image?.path === "number") 
                       ? image.path 
                       : { uri: image?.path?.uri };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {avatarSource && <Avatar source={avatarSource} />}
    </TouchableOpacity>
  );
};

export default Friend;

const styles = StyleSheet.create({
  container: {
    marginRight: 24,
  },
});
