import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ScrollView,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import { Layout, Avatar, Button } from "@ui-kitten/components";
import Text from "components/Text";
import { PersonProps } from "constants/Type";

interface NewFeedProps {
  data: PersonProps[];
  level?: "1" | "2" | "3" | "4";
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  accessoryLeft?: React.ReactElement<ViewProps>;
  showUnread?: boolean;
}

const NewFeedList = ({
  data,
  onPress,
  style,
  level = "2",
  accessoryLeft,
  showUnread,
}: NewFeedProps) => {
  return (
    <Layout style={[style, styles.layout]} level={level}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ paddingLeft: 12 }}>{accessoryLeft}</View>
        {data.map((i, _) => {
          return (
            <View key={_}>
              {i.unRead && showUnread ? (
                <Button
                  size="tiny"
                  status="primary"
                  style={{
                    position: "absolute",
                    right: -4,
                    top: 0,
                    zIndex: 1,
                    height: 30,
                    width: 26,
                  }}
                  accessoryLeft={() => (
                    <Text marginTop={-2} status="blue">
                      {i.unRead}
                    </Text>
                  )}
                />
              ) : null}
              <TouchableOpacity
                onPress={onPress}
                style={{ paddingHorizontal: 12 }}
                key={_}
              >
                <Avatar size="56" source={i.avatar} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

export default NewFeedList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    paddingTop: 10,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    flexDirection: "row",
  },
});
