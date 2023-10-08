import React, { memo } from "react";
import { useWindowDimensions, View, Linking } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon,
  Button,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  MessageText,
  Send,
  Time,
} from "react-native-gifted-chat";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import RenderComposer from "./RenderComposer";

const Conversation = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [messages, setMessages] = React.useState<IMessage[]>();

  React.useEffect(() => {
    setMessages([
      {
        _id: 0,
        createdAt: new Date(),
        text: "",
        image: imageMess,
        user: {
          _id: 2,
          name: "React Native",
        },
      },

      {
        _id: 2,
        text: "Hi There Bro! 👋",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
        },
      },
      {
        _id: 3,
        text: "Hi There Bro! ",
        createdAt: new Date(),
        user: {
          _id: 3,
          name: "React Native",
        },
      },
    ]);
  }, []);
  const onSend = React.useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
  const renderInputToolbar = React.useCallback((props) => {
    return (
      <InputToolbar
        {...props}
        renderSend={() => null}
        containerStyle={styles.containerStyle}
      />
    );
  }, []);
  const renderBubble = React.useCallback((props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.wrapperLeftStyle,
          right: styles.wrapperRightStyle,
        }}
        textStyle={{
          left: styles.textStyle,
          right: styles.textStyle,
        }}
      />
    );
  }, []);
  const renderMessage = React.useCallback((props) => {
    return (
      <View style={{ paddingBottom: 24 }}>
        <Message
          {...props}
          renderAvatar={() => null}
          containerStyle={{
            left: { marginLeft: 16 },
            right: { marginRight: 24 },
          }}
        />
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{
          backgroundColor: theme["background-basic-color-2"],
          paddingTop: top,
        }}
        title={() => (
          <Avatar
            source={Images.toyFace1}
            size="32"
            style={{
              marginTop: top,
              borderColor: theme["text-primary-color"],
              borderWidth: 1,
            }}
          />
        )}
        accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
        accessoryRight={<NavigationAction icon="phoneCall" marginRight={4} />}
      />
      <Layout level="2" style={styles.topHeader}>
        <Text children="Erika Turner" category="title2" marginBottom={8} />
      </Layout>
      <GiftedChat
        user={{ _id: 1 }}
        scrollToBottom
        messages={messages}
        onSend={(message) => onSend(message)}
        renderBubble={(props) => renderBubble(props)}
        renderAvatar={() => null}
        renderSend={(props) => null}
        renderMessage={(props) => renderMessage(props)}
        timeFormat={"MM/DD/YYYY  HH:MM"}
        imageStyle={{ marginHorizontal: -12 }}
        renderComposer={(props) => {
          return <RenderComposer {...props} />;
        }}
        timeTextStyle={{
          right: styles.timeTextStyle,
          left: styles.timeTextStyle,
        }}
        renderInputToolbar={(props) => renderInputToolbar(props)}
        infiniteScroll
      />
    </Container>
  );
});

export default Conversation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  containerStyle: {
    flex: 1,
  },
  topHeader: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 16,
  },
  textStyle: {
    color: "text-white-color",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Overpass-Regular",
  },
  timeTextStyle: {
    color: "text-basic-color",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Overpass-Regular",
  },
  wrapperLeftStyle: {
    backgroundColor: "background-basic-color-2",
    borderTopLeftRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  wrapperRightStyle: {
    borderBottomRightRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "color-basic-1000",
  },
});
const audioMess =
  "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3";
const imageMess =
  "https://s3-alpha-sig.figma.com/img/adc7/17ea/4385c876b632daf90987923f3d4b0715?Expires=1632700800&Signature=dKxgdp2cslKCF85BD1iMC~YzPGCTG6oAscWDDJonzqil1Hze0acBM3Xg4ltSAj0BHqX50uDIx~EWQIC5JEIOHBbRAjhiMp3Wo0PPy0YkQc5de8l24Vh180u5pr5HNfFm9jdWkoX3u99xHNPX~ZCEwcN7~0JnqoeZmzhbD3KHGHQrpRwPyOx-Yhq57R3V98Rtv3A~1sWCzg9d~vyIPUuTUmOsAPzukQpxo1KsfCm3RIAlalDLMlhvEs2s4f1dX9Lw4En~f6a7cHmrXfBElvE3AghM2aLdrbQEqHDKJ6Z~ehPNn88jBzw~qQEwZMnzGfGt2fEbJyQcf8LP4CjUE2d2Jw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
