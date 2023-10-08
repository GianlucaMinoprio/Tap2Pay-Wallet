import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import SpendItem from "./SpendItem";
import CurrencyText from "components/CurrencyText";

import keyExtractor from "utils/keyExtractor";
import { isEmpty } from "lodash";
import { ExpensesStat } from "./type";
import { VictoryPie } from "victory-native";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";

const chartRadius = 160 / 2;
const strokeWidth = 6;

const InitData: ExpensesStat = {
  totalExpenses: 0,
  spends: [],
};

const rawData = {
  expense_aggregate: 0,
  expense: [
    {
      id: "0",
      transactions_aggregate_aggregate_sum: { amount: 5780 },
      emoji: "🍔",
      name: "Food & Drink",
      color: "#F0DF67",
    },
    {
      id: "1",
      transactions_aggregate_aggregate_sum: { amount: 5780 },
      emoji: "✈️",
      name: "Travel",
      color: "#4B9BAE",
    },
    {
      id: "2",
      transactions_aggregate_aggregate_sum: { amount: 5780 },
      emoji: "⚽",
      name: "Entertainments",
      color: "#949398",
    },
    {
      id: "3",
      transactions_aggregate_aggregate_sum: { amount: 5780 },
      emoji: "💌",
      name: "Lover",
      color: "#C06363",
    },
    {
      id: "4",
      transactions_aggregate_aggregate_sum: { amount: 5780 },
      emoji: "🏠",
      name: "House",
      color: "#5099F4",
    },
  ],
};

const Expense = () => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const [data, setData] = React.useState<ExpensesStat>(InitData);

  React.useEffect(() => {
    if (rawData) {
      let totalExpenses = 0;
      const spends = rawData.expense.map((value) => {
        const amount = value.transactions_aggregate_aggregate_sum.amount | 0;
        const percent = 0;
        totalExpenses += amount;
        return {
          category_id: value.id,
          amount,
          category_name: value.name,
          emoji: value.emoji,
          color: value.color,
          percent,
        };
      });
      const mixData: ExpensesStat = {
        totalExpenses,
        spends,
      };
      setData(mixData);
    }
  }, [rawData]);

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <SpendItem
          item={item}
          totalSpend={data.totalExpenses}
          onPress={goBack}
        />
      );
    },
    [data.totalExpenses]
  );

  const colorsChartEmpty = [
    theme["color-primary-100"],
    theme["color-primary-100"],
  ];

  const colorScale = React.useMemo(
    (): string[] => data.spends.map((i) => i.color),
    [data.spends]
  );

  const chartData = React.useMemo(
    () =>
      data.spends.map((i) => ({
        y: (data.totalExpenses <= 0 ? 0 : i.amount / data.totalExpenses) * 100,
      })),
    [data.spends]
  );

  const chartEmpty = [
    { x: "", y: "" },
    { x: "", y: "" },
  ];

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <VictoryPie
          width={chartRadius * 2}
          height={chartRadius * 2}
          padding={0}
          cornerRadius={4}
          innerRadius={chartRadius - strokeWidth}
          labelPosition="centroid"
          padAngle={0}
          animate={{ duration: 2000 }}
          colorScale={isEmpty(colorScale) ? colorsChartEmpty : colorScale}
          data={isEmpty(chartData) ? chartEmpty : chartData}
          labels={() => ""}
        />
        <View style={styles.totalView}>
          <Text category="footnote" status="placeholder" center uppercase>
            Total :
          </Text>
          <CurrencyText category="headline" marginTop={2} center>
            {data.totalExpenses}
          </CurrencyText>
        </View>
      </>
    );
  }, [colorScale, chartEmpty, chartData, chartEmpty]);

  return (
    <FlatList
      data={data.spends || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: bottom + 16 },
      ]}
      refreshControl={<RefreshControl tintColor="#F0DF67" />}
    />
  );
};

export default Expense;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  box: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  totalView: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
  },
  listHeaderComponentStyle: {
    alignItems: "center",
    marginBottom: 16,
  },
});
