import React, { memo } from "react";
import {
  useWindowDimensions,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import FriendItem, { FriendProps } from "components/FriendItem";
import { Images } from "assets/images";

interface Props {
  id: number;
  title: string;
  numberRequest: number;
}
interface RequestProps {
  item: Props;
  onPress?(): void;
}

const FindFriend = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const renderFriendItem = React.useCallback(
    ({ item, onPress, level }: FriendProps) => {
      return <FriendItem item={item} level={level} onPress={onPress} />;
    },
    []
  );
  const renderHeader = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <View style={{ margin: 16 }}>
            <Text marginBottom={6} children={"Send Request"} />
            <Text status="snow" children={`${13} peoples`} />
          </View>
          <Icon pack="assets" name="rightChevron" style={styles.rChevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <View style={{ margin: 16 }}>
            <Text marginBottom={6} children={"Invasion"} />
            <Text status="snow" children={`${13} peoples`} />
          </View>
          <Icon pack="assets" name="rightChevron" style={styles.rChevron} />
        </TouchableOpacity>
        <Text
          children="Maybe you know"
          category="title3"
          marginTop={24}
          marginBottom={17}
        />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction icon="search" status="snow" />}
      />
      <Text
        children="Finds Friends"
        category="title2"
        marginLeft={16}
        marginTop={8}
      />
      <FlatList
        contentContainerStyle={[
          styles.flatListFriend,
          { paddingBottom: bottom + 60 },
        ]}
        ListHeaderComponent={renderHeader}
        scrollEventThrottle={16}
        data={DATA_Friend}
        keyExtractor={(i, index) => i.id.toString()}
        renderItem={renderFriendItem}
        numColumns={2}
      />
    </Container>
  );
});

export default FindFriend;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  flatListFriend: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  topNav: {
    marginHorizontal: 8,
  },
  rChevron: {
    marginRight: 16,
    tintColor: "text-body-color",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "space-between",
    marginTop: 16,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingRight: 16,
  },
});

const DATA_Friend = [
  {
    id: 0,
    name: "Christine Stewart",
    mutualFriends: 13,
    avatar: Images.toyFace1,
  },
  {
    id: 1,
    name: "Christine Stewart",
    mutualFriends: 13,
    avatar: Images.toyFace2,
  },
  {
    id: 2,
    name: "Christine Stewart",
    mutualFriends: 13,
    avatar: Images.toyFace3,
  },
  {
    id: 3,
    name: "Christine Stewart",
    mutualFriends: 13,
    avatar: Images.toyFace1,
  },
];
