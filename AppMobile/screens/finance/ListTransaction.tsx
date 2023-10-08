import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TopNavigation, Layout, Icon } from "@ui-kitten/components";
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

export type ListTransaction = {
  totalExpense: number;
  totalIncome: number;
  transactions: TransactionFragment[];
};

const ListTransaction = memo(() => {
  const theme = useTheme();
  const { top, bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const data: ListTransaction = {
    totalExpense: 1485.6,
    totalIncome: 925.6,
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
        name: "House Rental",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.house },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "3",
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
        id: "4",
        name: "Insurance",
        note: "",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.insurance },
        },
        transaction_at: 1630923280000,
      },
      {
        id: "5",
        name: "Salary",
        note: "Salary 2021",
        amount: 985.6,
        type_id: Category_Types_Enum.Income,
        category: {
          id: "category_id1",
          icon: { path: Images.heartIc },
        },
        transaction_at: 1630836880000,
      },
    ],
  };

  const listHeaderComponent = React.useCallback(() => {
    return (
      <AnimatedAppearance>
        <View style={styles.row}>
          <View
            style={[
              styles.box,
              { backgroundColor: theme["color-radical-600"] },
            ]}
          >
            <Text category="headline" status="white">
              Expensive
            </Text>
            <CurrencyText
              category="title3"
              status="white"
              children={data.totalExpense}
              marginTop={4}
            />
          </View>
          <View
            style={[
              styles.box,
              {
                marginLeft: 16,
                backgroundColor: theme["color-salmon-600"],
              },
            ]}
          >
            <Text category="headline" status="white">
              Income
            </Text>
            <CurrencyText
              category="title3"
              status="white"
              children={data.totalIncome}
              marginTop={4}
            />
          </View>
        </View>
      </AnimatedAppearance>
    );
  }, [data.totalExpense, data.totalIncome]);

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
              Create
            </Text>
          }
        />
        <Text category="title2" marginLeft={16}>
          Personal
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
          { paddingBottom: bottom + 48 },
        ]}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
      <View
        style={[
          styles.bottom,
          {
            paddingBottom: bottom + 8,
            backgroundColor: theme["color-primary-100"],
          },
        ]}
      >
        <Icon
          pack="assets"
          name="barChart1"
          style={{ tintColor: theme["color-patrick-blue-100"] }}
        />
        <Text category="subhead" status="description">
          Total :{" "}
          <CurrencyText category="title4" status="black" children={4256789} />
        </Text>
        <Icon
          pack="assets"
          name="happyFace"
          style={{ tintColor: theme["color-patrick-blue-100"] }}
        />
      </View>
    </Container>
  );
});

export default ListTransaction;

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
    flex: 1,
    borderRadius: 12,
    padding: 16,
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
