import React, { memo } from "react";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import DeliveryHeader from "../Component/DeliveryHeader";
import ShippingTo from "./ShippingTo";
import PaymentMethod from "./PaymentMethod";
import { Images } from "assets/images";

const Payment = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [selectedShipPlace, setSelectedShipPlace] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <DeliveryHeader
        title="Check out"
        iconLeft="leftArrow"
        iconRight="menu"
      />
      <Content>
        <ShippingTo
          data={DATA_LOCATION}
          selectedIndex={selectedShipPlace}
          onChange={setSelectedShipPlace}
          style={styles.shipping}
        />
        <PaymentMethod
          data={DATA_PAYMENT}
          selectedIndex={selectedCard}
          onChange={setSelectedCard}
        />
      </Content>
      <Layout style={styles.bottom}>
        <Text category="title4">Total</Text>
        <Text category="title3" status={"primary"}>
          $84.27
        </Text>
      </Layout>
      <Button
        children="Check out"
        style={[{ marginBottom: bottom + 24 }, styles.checkOut]}
      />
    </Container>
  );
});

export default Payment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  shipping: {
    marginTop: 24,
    marginBottom: 32,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 18,
  },
  checkOut: {
    marginHorizontal: 24,
  },
});
const DATA_LOCATION = [
  {
    id: 0,
    name: "Home",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
  {
    id: 1,
    name: "Home",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
  {
    id: 2,
    name: "Work-Space",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
];
const DATA_PAYMENT = [
  { id: 0, title: "Credit Card", logo: Images.creditCard },
  { id: 1, title: "Paypal", logo: Images.paypal },
  { id: 2, title: "Apple Store", logo: Images.apple },
];
