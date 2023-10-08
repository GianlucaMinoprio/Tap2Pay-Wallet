import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import CardID from "./CardID";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";

const Checkout = memo(() => {
  const { goBack } = useNavigation();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title="Checkout"
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottom + 32 }}>
        <CardID data={DATA_ID} />
        <View style={styles.product}>
          <Text
            children="Product (3)"
            category="title3"
            status="white"
            marginVertical={16}
          />
          <View style={styles.flexRow}>
            {DATA.map((item, index) => {
              return (
                <Layout key={index} level="2" style={styles.item}>
                  <Image
                    source={item.img}
                    /* @ts-ignore */
                    style={styles.img}
                  />
                </Layout>
              );
            })}
          </View>
        </View>
        <View style={styles.paymentMethod}>
          <Text
            children="Payment Method"
            category="title3"
            status="white"
            marginTop={24}
            marginBottom={18}
          />
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
          >
            <Radio children={"COD"} />
            <Radio children="Visa, Master, Credit Card" />
            <Radio children="Crypto Currency" />
          </RadioGroup>
        </View>
      </Content>
      <Button
        children="Pay Now"
        style={[styles.btn, { marginBottom: bottom + 8 }]}
        onPress={goBack}
      />
    </Container>
  );
});

export default Checkout;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  product: {
    marginLeft: 24,
  },
  paymentMethod: {
    marginLeft: 24,
  },
  img: {
    width: 42,
    height: 32,
  },
  cod: {
    borderRadius: 99,
    marginBottom: 20,
    backgroundColor: "red",
  },
  visa: {
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: "row",
  },
  item: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 16,
  },
  btn: {
    marginHorizontal: 16,
    marginTop: 8,
  },
});
const DATA_ID = {
  id: "#MM13579",
  subTotal: 25.44,
  promoCode: 1.99,
  delivery: 4.99,
  total: 34.99,
};
const DATA = [
  { id: 0, img: Images.burger },
  { id: 1, img: Images.hotdog },
  { id: 2, img: Images.pizza },
];
