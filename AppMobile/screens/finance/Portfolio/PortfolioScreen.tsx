import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TopNavigation, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Asset from "./Asset";
import Text from "components/Text";
import Statistic from "./Statistic";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { dataAsset, dataStatistic } from "./data";
import { FinanceStackParamList } from "navigation/type";
import { Category_Types_Enum, Format_Types_Enum } from "constants/Type";
import { RefreshControl } from "react-native-web-refresh-control";

const PortfolioScreen = memo(() => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const type = Category_Types_Enum.Income;

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <Text category="title2" marginTop={4}>
          Main portfolios
        </Text>
        <View
          style={[styles.box, { backgroundColor: theme["color-salmon-100"] }]}
        >
          <Text category="title4" status="white">
            Current Balance
          </Text>
          <View style={styles.flexRow}>
            <View style={styles.row}>
              <CurrencyText
                category="title3"
                status="white"
                children={5680}
                marginTop={8}
              />
              <CurrencyText
                category="subhead"
                status="snow"
                children={78.2}
                type={Category_Types_Enum.Income}
                formatType={Format_Types_Enum.Inky}
                marginTop={12}
                marginLeft={6}
              />
            </View>
            <View
              style={[
                styles.status,
                { backgroundColor: theme["color-basic-700"] },
              ]}
            >
              <Icon
                pack="assets"
                name={
                  type === Category_Types_Enum.Income
                    ? "diagonalArrow3"
                    : "diagonalArrow"
                }
                style={[
                  styles.icon,
                  {
                    tintColor:
                      type === Category_Types_Enum.Income
                        ? theme["color-salmon-600"]
                        : theme["color-radical-600"],
                  },
                ]}
              />
              <Text
                category="subhead"
                status={
                  type === Category_Types_Enum.Income ? "success" : "danger"
                }
              >
                2.5%
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.wrap}>
          {dataStatistic.map((item, index) => {
            return <Statistic item={item} key={index} onPress={goBack} />;
          })}
        </View>
        <Text category="title3" marginTop={14} marginBottom={6}>
          Your Asset
        </Text>
      </>
    );
  }, [dataStatistic]);

  const renderItem = React.useCallback(({ item }) => {
    return <Asset item={item} onPress={goBack} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction icon="calendar" />}
      />
      <FlatList
        data={dataAsset || []}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={{
          paddingBottom: bottom + 16,
          paddingHorizontal: 16,
        }}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
    </Container>
  );
});

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  box: {
    borderRadius: 12,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    borderRadius: 8,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 9,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
