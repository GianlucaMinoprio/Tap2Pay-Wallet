import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Activity from "./Activity";
import BottomTab from "../Component/BottomTab";

const Activities = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [dataToday, setDataToday] = React.useState(DATA_TODAY);
  const [data12, setData12] = React.useState(DATA_12);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        title={"Last Activities"}
        accessoryLeft={<NavigationAction icon="undo" status="opacity" />}
        accessoryRight={<NavigationAction icon="calendar" status="opacity" />}
      />
      <Content contentContainerStyle={styles.content}>
        <Activity title="Today" data={dataToday} />
        <Activity title="12 December" data={data12} />
      </Content>
      <BottomTab />
    </Container>
  );
});

export default Activities;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingVertical: 36,
    marginHorizontal: 24,
  },
  header: {
    borderBottomColor: "color-basic-1500",
    borderBottomWidth: 1,
  },
});
const DATA_TODAY = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "Christian Roger",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "Transaction Date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "Trading Pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "Worth", value: 4261.67 },
    ],
  },
  {
    id: 1,
    avatar: Images.avatar2,
    name: "Alex Turboe",
    amount: -280.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
  {
    id: 2,
    avatar: Images.avatar3,
    name: "Flex Adameith",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
];
const DATA_12 = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "Christian Roger",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "Transaction Date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "Trading Pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "Worth", value: 4261.67 },
    ],
  },
  {
    id: 1,
    avatar: Images.avatar2,
    name: "Alex Turboe",
    amount: -280.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
  {
    id: 2,
    avatar: Images.avatar3,
    name: "Flex Adameith",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
];
