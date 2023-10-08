import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Rate from "./Rate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ShopReviews = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [rate, setRate] = React.useState(4);
  const [valueInput, setValueInput] = React.useState("");
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginLeft={4} icon="leftArrow" />}
        title="Write Review"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        enableOnAndroid
        extraScrollHeight={-bottom - 20}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={Images.sally}
          /* @ts-ignore */
          style={styles.img}
        />
        <Text
          marginTop={16}
          category="title3"
          status="white"
          children="Rating for product"
          marginBottom={10}
        />
        <View style={styles.card}>
          <Image source={Images.burger} />
          <View>
            <Text
              center
              children="Hamburger 4.0"
              category="headline"
              status="white"
              marginBottom={8}
              marginLeft={16}
            />
            <Text
              marginLeft={16}
              children="$15.88"
              status="primary"
              category="title4"
            />
          </View>
        </View>
        <Rate defaultRate={rate} setDefaultRate={setRate} />
        <Text
          children="Leave comment"
          category="footnote"
          status="white"
          marginLeft={16}
          marginTop={32}
          marginBottom={8}
        />
        <Input
          placeholder="Your comment"
          value={valueInput}
          onChangeText={(nextValue) => setValueInput(nextValue)}
        />
      </KeyboardAwareScrollView>
      <Button
        children="Send Review"
        style={[styles.send, { marginBottom: bottom + 16 }]}
        onPress={goBack}
      />
    </Container>
  );
});

export default ShopReviews;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  img: {
    alignSelf: "center",
  },
  content: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "background-basic-color-2",
    paddingVertical: 16,
    alignItems: "center",
    paddingLeft: 24,
    borderRadius: 12,
  },
  send: {
    marginHorizontal: 24,
    marginTop: 8,
  },
});
