import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  RadioGroup,
  CheckBox,
  Radio,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import OrderStep from "./OrderStep";
import { RefreshControl } from "react-native-web-refresh-control";

const OrderTracking = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [index, setIndex] = React.useState(3);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title="OrderTracking"
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <Content
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Image
          source={Images.guyBike}
          /* @ts-ignore */
          style={[styles.image, { width: width - 120, height: width - 120 }]}
        />
        <Layout style={styles.cardID} level="4">
          <Text category="title4" status="white">
            Order ID: <Text status="primary"> #131313</Text>
          </Text>
          <Text category="title4" status="grey500" marginTop={8}>
            Estimate Date: <Text category="body"> October 04, 2021</Text>
          </Text>
        </Layout>
        <OrderStep
          timeStep={[
            "October 04, 2021 01:21",
            "October 04, 2021 01:21",
            "October 04, 2021 01:21",
            "October 04, 2021 01:21",
          ]}
          step={index}
        />
      </Content>
      <Button
        children="Call Shipper"
        style={[styles.btnBottom, { marginBottom: bottom + 8 }]}
      />
    </Container>
  );
});

export default OrderTracking;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  image: {
    alignSelf: "center",
    marginTop: -72,
  },
  cardID: {
    marginVertical: 32,
    marginHorizontal: 24,
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
  },
  btnBottom: {
    marginHorizontal: 16,
    marginTop: 8,
  },
});
