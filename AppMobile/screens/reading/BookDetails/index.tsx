import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import StarRate from "components/StarRate";
import Line from "components/Line";
import { RefreshControl } from "react-native-web-refresh-control";

const BookDetails = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [rate, setRate] = React.useState(4);
  const accessoryRight = React.useCallback(() => {
    return (
      <View style={styles.accessoryRight}>
        <NavigationAction icon="bookmark" />
        <NavigationAction icon="menu" />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={accessoryRight}
      />
      <Content
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Image
          source={Images.book1}
          style={[
            /* @ts-ignore */
            styles.book,
            { width: width - width / 1.6, height: height - height / 1.3 },
          ]}
        />
        <View style={styles.action}>
          <Button
            children="Listen"
            style={styles.btnListen}
            accessoryLeft={<Icon pack="assets" name="headphone" />}
          />
          <Button
            children="Reading"
            style={styles.btnReading}
            status="control"
            accessoryLeft={<Icon pack="assets" name="book" />}
          />
        </View>
        <Text category="title3" status="white">
          The wolrd, your life
        </Text>
        <View style={styles.flexRow}>
          <Text category="body" status="grey500" marginTop={8}>
            June Cook
          </Text>
          <Button
            accessoryLeft={<Icon pack="assets" name="wallClock" />}
            children="24mins"
            status="transparent"
          />
        </View>
        <StarRate
          style={styles.starRate}
          defaultRate={rate}
          setDefaultRate={setRate}
          reviewer={214}
        />
        <Line
          backgroundColor={theme["background-basic-color-2"]}
          marginBottom={24}
        />
        <Text children="Book summary" status="white" category="title4" />
        <Text
          children={BookSummary}
          status="snow"
          category="body"
          marginTop={16}
        />
      </Content>
    </Container>
  );
});

export default BookDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginHorizontal: 24,
  },
  accessoryRight: {
    flexDirection: "row",
  },
  topNav: {
    marginHorizontal: 4,
  },
  book: {
    alignSelf: "center",
    flex: 1,
  },
  action: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 24,
  },
  starRate: {
    marginTop: 8,
    marginBottom: 24,
  },
  btnReading: {
    flex: 1,
    marginLeft: 15,
  },
  btnListen: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
const BookSummary =
  "The author, vice chairman of Ogilvy, shares why what’s irrational often works better than what’s considered to be rational. Rory explains we take some actions based on a psychological rather than logical level. As marketers, we should appeal to this irrational side of our thinking and try what seems to be counterintuitive or logic-defying.";
