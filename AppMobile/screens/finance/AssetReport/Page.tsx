import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import ReportItem from "./ReportItem";
import CurrencyText from "components/CurrencyText";

import keyExtractor from "utils/keyExtractor";
import { ReportType } from "./type";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";

interface PageProps {
  expense?: number;
  income?: number;
  data?: ReportType[];
}

const Page = ({ expense = 0, income = 0, data }: PageProps) => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const listHeaderComponent = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <View
          style={[styles.box, { backgroundColor: theme["color-radical-600"] }]}
        >
          <Text category="headline" status="white">
            Expensive
          </Text>
          <CurrencyText
            category="title3"
            status="white"
            children={expense}
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
            children={income}
            marginTop={4}
          />
        </View>
      </View>
    );
  }, [expense, income]);

  const renderItem = React.useCallback(({ item }) => {
    return <ReportItem item={item} onPress={goBack} />;
  }, []);

  return (
    <FlatList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: bottom + 16 },
      ]}
      refreshControl={<RefreshControl tintColor="#F0DF67" />}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {},
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
    paddingTop: 16,
  },
});
