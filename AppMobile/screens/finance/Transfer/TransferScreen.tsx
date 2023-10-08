import React, { memo } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  StyleService,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Asterisk from "./Asterisk";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { FinanceStackParamList } from "navigation/type";

const TransferScreen = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const { bottom } = useLayout();

  return (
    <Container>
      <TopNavigation
        title="Transfer money"
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Avatar
          source={Images.avatar0}
          //@ts-ignore
          style={styles.avatar}
          size="80"
        />
        <Text category="title4" marginTop={16} center>
          Francis Dixon
        </Text>
        <Text category="footnote" status="snow" marginTop={4} center>
          francisdixon@company.com
        </Text>
        <View style={styles.boxView}>
          <View style={styles.box}>
            <Text category="headline" status="white">
              Total Balance
            </Text>
            <CurrencyText
              category="title3"
              status="white"
              children={1485.6}
              marginTop={4}
            />
          </View>
          <View style={styles.iconView}>
            <Icon pack="assets" name="upArrow" style={styles.icon} />
          </View>
        </View>
        <Layout level="2" style={styles.card}>
          <View style={styles.row}>
            <Text category="headline">Transfer card</Text>
            <Text category="headline" uppercase>
              Visa
            </Text>
          </View>
          <View style={styles.cardNumber}>
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Text category="title3">1313</Text>
          </View>
        </Layout>
        <Layout level="2" style={styles.note}>
          <Text category="body" style={styles.text}>
            GLWS Bro
          </Text>
        </Layout>
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 16 }]}>
        <Button
          activeOpacity={0.7}
          children="Tranfer $1,485.60"
          onPress={goBack}
        />
      </Layout>
    </Container>
  );
});

export default TransferScreen;

const themedStyles = StyleService.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 32,
  },
  boxView: {
    marginTop: 54,
  },
  box: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "color-radical-600",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: -24,
    borderColor: "background-basic-color-1",
    backgroundColor: "color-salmon-100",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "color-basic-1500",
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    color: "color-basic-1100",
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
