import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Information from "./Information";
import ContentDetails from "./ContentDetails";

const FoodDetails = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  const [orderNum, setOrderNum] = React.useState(2);
  const [disableMinus, setDisableMinus] = React.useState(false);
  React.useCallback(() => {
    orderNum <= 1 ? setDisableMinus(true) : setDisableMinus(false);
  }, [orderNum, disableMinus]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={<NavigationAction icon="heart" />}
      />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.title}>
          <Text category="header">Snackla{"\n"}Cholis</Text>
          <View style={styles.price}>
            <Text category="title2" status={"primary"}>
              $12.13
            </Text>
            <Text category="title4" status={"grey700"} lineThrough>
              $22.13
            </Text>
          </View>
        </View>
        <Text
          category="body"
          status={"grey500"}
          marginHorizontal={24}
          marginBottom={32}
        >
          Establish your own food awards and share your favourites with you
        </Text>
        <Information rateStar={4} deliveryTime="5-20 minitues" cal={300} />
        <ContentDetails activeTab={activeTab} onChange={setActiveTab} />
      </Content>
      <View style={styles.footer}>
        <View style={styles.calculator}>
          <TouchableOpacity onPress={() => setOrderNum(orderNum + 1)}>
            <Icon pack="assets" name="plus" style={styles.icon} />
          </TouchableOpacity>
          <Text category="title4" marginHorizontal={16}>
            {orderNum}
          </Text>
          <TouchableOpacity
            onPress={() => setOrderNum(orderNum - 1)}
            disabled={orderNum <= 1}
          >
            <Icon pack="assets" name="minus" />
          </TouchableOpacity>
        </View>
        <Button
          children="Add to cart"
          accessoryLeft={
            <Icon pack="assets" name="shopping" style={styles.icon} />
          }
          style={styles.addToCart}
        />
      </View>
    </Container>
  );
});

export default FoodDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 8,
  },
  price: {
    alignItems: "flex-end",
  },
  information: {
    width: 152,
    borderTopRightRadius: 124,
    borderBottomRightRadius: 142,
    marginLeft: -12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    paddingTop: 8,
  },
  addToCart: {
    flex: 1,
    marginLeft: 22,
  },
  icon: {
    width: 20,
    height: 20,
  },
  calculator: {
    borderRadius: 99,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "text-primary-color",
  },
});
