import React from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import {
  Avatar,
  Button,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";

import Text from "components/Text";
import FBCollage from "react-native-fb-collage";
import dayjs from "utils/dayjs";
import { PersonProps } from "constants/Type";
import Line from "components/Line";
interface Props {
  data: PersonProps;
}
const NewFeedItem = ({ data }: Props) => {
  const { height, width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [liked, setLiked] = React.useState(false);
  const [likeNumber, setLikeNumber] = React.useState(data.status?.liked);
  const pressLike = React.useCallback(() => setLiked(!liked), [liked]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <View>
            <Avatar size="giant" source={data.avatar} />
            <Layout style={styles.iconOnl} />
          </View>
          <View>
            <Text marginLeft={12} category="headline">
              {data.name}
            </Text>
            <Text category="subhead" status="snow" marginLeft={12}>
              {dayjs(data.status?.date).format("MMM D, YYYY ")}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon
            name="menu"
            pack="assets"
            style={{ tintColor: theme["text-body-color"] }}
          />
        </TouchableOpacity>
      </View>
      <Text
        marginTop={16}
        marginHorizontal={24}
        category="body"
        marginBottom={8}
      >
        {data.status?.title}
      </Text>
      <FBCollage
        images={data.status?.image}
        style={{
          width: width - 32,
          marginHorizontal: 12,
        }}
        width={width / 1.2}
        borderRadius={8}
        height={206}
        spacing={4}
      />
      <Line
        backgroundColor={theme["background-basic-color-2"]}
        marginTop={15}
        marginBottom={6}
        marginHorizontal={16}
      />
      <View style={styles.bottomView}>
        <View style={{ flexDirection: "row" }}>
          <Button
            status={liked ? "info" : "transparent"}
            onPress={pressLike}
            accessoryLeft={(props) => (
              <Icon {...props} pack="assets" name="like" />
            )}
            /* @ts-ignore */
            children={liked ? `${likeNumber + 1}` : `${likeNumber}`}
            style={styles.button}
          />
          <Button
            status="transparent"
            accessoryLeft={(props) => (
              <Icon {...props} pack="assets" name="chat" />
            )}
            children="248"
          />
        </View>
        <Button
          status={liked ? "info" : "transparent"}
          onPress={pressLike}
          accessoryLeft={(props) => (
            <Icon {...props} pack="assets" name="fire" />
          )}
        />
      </View>
      <Line
        marginVertical={18}
        backgroundColor={theme["background-basic-color-2"]}
      />
    </View>
  );
};

export default NewFeedItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 18,
    marginRight: 32,
  },
  iconOnl: {
    backgroundColor: "background-basic-color-4",
    height: 16,
    width: 16,
    borderRadius: 99,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderColor: "background-basic-color-1",
    borderWidth: 2,
  },
});
