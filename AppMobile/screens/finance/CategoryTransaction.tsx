import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TopNavigation, Layout } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import Transaction from "components/Transaction";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";
import AnimatedAppearance from "components/AnimatedAppearance";

import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";
import { Category_Types_Enum, TransactionFragment } from "constants/Type";

export type CategoryTransaction = {
  totalBalance: number;
  transactions: TransactionFragment[];
};

const CategoryTransaction = memo(() => {
  const theme = useTheme();
  const { top, bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const data: CategoryTransaction = {
    totalBalance: 1485.6,
    transactions: [
      {
        id: "1",
        name: "Starbuck Coffee",
        note: "",
        amount: 5.6,
        type_id: Category_Types_Enum.Expense,
        category: {
          id: "category_id1",
          icon: { path: Images.coffeeCup },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "2",
        name: "Pizza Hut",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.pizzaIc },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "3",
        name: "Hamburger",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.sandwich },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "4",
        name: "Hot Dogs",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.hotDog },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "5",
        name: "Chicken",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.chickenLeg },
        },
        transaction_at: 1630836880000,
      },
      {
        id: "6",
        name: "Cookies",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.cookie },
        },
        transaction_at: 1630836880000,
      },
    ],
  };

  const listHeaderComponent = React.useCallback(() => {
    return (
      <AnimatedAppearance>
        <View
          style={[styles.box, { backgroundColor: theme["color-radical-600"] }]}
        >
          <Text category="headline" status="white">
            Total Balance
          </Text>
          <CurrencyText
            category="title3"
            status="white"
            children={data.totalBalance}
            marginTop={4}
          />
        </View>
      </AnimatedAppearance>
    );
  }, [data.totalBalance]);

  const renderItem = React.useCallback(({ item, index }) => {
    return <Transaction item={item} index={index} onPress={goBack} />;
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          accessoryRight={
            <Text onPress={goBack} marginRight={16} status="primary">
              December 2021
            </Text>
          }
        />
        <Text category="title2" marginLeft={16}>
          {`🍔 Food & Drink`}
        </Text>
      </Layout>
      <FlatList
        data={data.transactions || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom },
        ]}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
    </Container>
  );
});

export default CategoryTransaction;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  box: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  contentContainerStyle: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  bottom: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
