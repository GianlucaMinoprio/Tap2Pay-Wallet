import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Composer, Send } from "react-native-gifted-chat";

const RenderComposer = (props: any) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      {...props}
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Composer
        {...props}
        textInputStyle={{ color: theme["text-white-color"] }}
      />
      <View
        style={{
          flexDirection: "row",
          marginRight: 8,
          alignItems: "center",
        }}
      >
        <Send
          {...props}
          containerStyle={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text children={"Send"} center status="blue" />
        </Send>
        <Button
          size="tiny"
          status="transparent"
          accessoryRight={<Icon pack="assets" name="image" />}
        />
        <Button
          size="tiny"
          status="transparent"
          accessoryRight={
            <Icon
              pack="assets"
              name="happyFace"
              style={{ tintColor: theme["text-white-color"] }}
            />
          }
        />
        <Button
          size="tiny"
          status="transparent"
          style={{ backgroundColor: "transparent" }}
          accessoryRight={
            <Icon
              pack="assets"
              name="menu"
              style={{ tintColor: theme["text-white-color"] }}
            />
          }
        />
      </View>
    </Layout>
  );
};

export default RenderComposer;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
