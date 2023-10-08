import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  Easing,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import { ReportType } from "./type";

interface ReportItemProps {
  item: ReportType;
  onPress?(): void;
}

const ReportItem = ({ item, onPress }: ReportItemProps) => {
  const theme = useTheme();
  const aref = useAnimatedRef<View>();
  const {
    name,
    income = 0,
    expense = 0,
    totalIncome = 1,
    totalExpense = 1,
  } = item;

  const expenseProgress =
    expense / totalExpense < 0
      ? 0
      : expense / totalExpense > 1
      ? 1
      : expense / totalExpense;

  const incomeProgress =
    income / totalIncome < 0
      ? 0
      : income / totalIncome > 1
      ? 1
      : income / totalIncome;

  const widthIncome = useSharedValue(0);
  const widthExpense = useSharedValue(0);

  const styleIncome = useAnimatedStyle(() => ({
    width: withTiming(widthIncome.value, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    backgroundColor: theme["color-salmon-600"],
  }));

  const styleExpense = useAnimatedStyle(
    () => ({
      width: withTiming(widthExpense.value, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      backgroundColor: theme["color-radical-600"],
    }),
    [expenseProgress]
  );

  React.useEffect(() => {
    if (incomeProgress !== 0 && expenseProgress !== 0) {
      setTimeout(() => {
        runOnUI(() => {
          "worklet";
          widthIncome.value = measure(aref).width * incomeProgress;
          widthExpense.value = measure(aref).width * expenseProgress;
        })();
      }, 200);
    }
  }, [widthIncome, widthExpense, aref, incomeProgress, expenseProgress]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomColor: theme["color-basic-800"],
        },
      ]}
    >
      <Text category="headline">{name}</Text>
      <View style={styles.row}>
        <View ref={aref} style={styles.line}>
          <Animated.View style={[styles.lineAnim, styleIncome]} />
        </View>
        <View style={styles.balanceView}>
          <CurrencyText category="subhead" status="success" children={income} />
        </View>
      </View>
      <View style={styles.row}>
        <View ref={aref} style={styles.line}>
          <Animated.View style={[styles.lineAnim, styleExpense]} />
        </View>
        <View style={styles.balanceView}>
          <CurrencyText category="subhead" status="danger" children={expense} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 24,
    marginLeft: 24,
    paddingRight: 24,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 4,
  },
  line: {
    flex: 7.5,
    height: 6,
    borderRadius: 4,
    marginRight: 40,
    overflow: "hidden",
  },
  lineAnim: {
    height: 1,
    flex: 1,
    borderRadius: 4,
  },
  balanceView: {
    flex: 2.5,
    alignItems: "flex-end",
  },
});
