import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  Icon,
  Button,
  Avatar,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import NewFeedList from "./NewFeedList";
import NewFeedItem from "../../components/NewFeedItem";

const NewFeed = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [data, setData] = React.useState(DATA_OWNER);
  const renderItem = React.useCallback(({ item }) => {
    return <NewFeedItem data={item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[
          {
            backgroundColor: theme["background-basic-color-2"],
            paddingTop: top,
          },
          styles.topNav,
        ]}
        accessoryRight={(props) => {
          return <NavigationAction {...props} icon="search" />;
        }}
        accessoryLeft={() => (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.logo}
            />
          </TouchableOpacity>
        )}
      />
      <NewFeedList
        style={styles.newFeed}
        data={DATA_HOME}
        accessoryLeft={
          <View>
            <Avatar
              size="giant"
              source={Images.toyFace}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.buttonAdd}>
              <Icon pack="assets" name="addNew" />
            </TouchableOpacity>
          </View>
        }
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: bottom + 60 }}
        data={DATA_OWNER}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <Button
        size="giant"
        status="primary"
        style={[
          styles.btnBottom,
          {
            bottom: bottom + 12,
          },
        ]}
        accessoryRight={(props) => {
          return <Icon {...props} pack="assets" name="paperPlane" />;
        }}
      />
    </Container>
  );
});

export default NewFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  avatar: {
    marginHorizontal: 12,
  },
  newFeed: {
    paddingBottom: 24,
  },
  topNav: {
    paddingLeft: 24,
    paddingRight: 4,
  },
  buttonAdd: {
    position: "absolute",
    right: 6,
    bottom: 0,
    zIndex: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  btnBottom: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginRight: 12,
    alignSelf: "flex-end",
    position: "absolute",
    right: 12,
  },
});
export const DATA_OWNER = [
  {
    id: 0,
    name: "Christine Stewart",
    avatar: Images.toyFace1,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 139,
      image: [
        Images.rectangle1,
        Images.rectangle2,
        Images.rectangle3,
        Images.rectangle1,
        Images.rectangle2,
        Images.rectangle2,
      ],
    },
  },
  {
    id: 1,
    name: "Christine Stewart",
    avatar: Images.toyFace2,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 159,
      image: [Images.rectangle1],
    },
  },
];
export const DATA_HOME = [
  {
    id: 0,
    name: "Christine Stewart",
    avatar: Images.toyFace1,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
    unRead: 3,
  },
  {
    id: 1,
    name: "Christine Stewart",
    avatar: Images.toyFace3,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 2,
    name: "Christine Stewart",
    avatar: Images.toyFace2,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 3,
    name: "Christine Stewart",
    avatar: Images.toyFace3,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 4,
    name: "Christine Stewart",
    avatar: Images.toyFace1,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 5,
    name: "Christine Stewart",
    avatar: Images.toyFace2,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 6,
    name: "Christine Stewart",
    avatar: Images.toyFace3,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
  {
    id: 7,
    name: "Christine Stewart",
    avatar: Images.toyFace1,
    status: {
      title:
        "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
      date: 1630986664000,
      liked: 0,
      image: [Images.rectangle1, Images.rectangle2, Images.rectangle3],
    },
  },
];
