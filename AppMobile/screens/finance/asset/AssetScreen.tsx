import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, TopNavigation, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Transaction from "./Transaction";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { isEmpty } from "lodash";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import {
  TransactionFragment,
  Category_Types_Enum,
  View_Types_Enum,
} from "constants/Type";
import { RootStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";

const data: TransactionFragment[] = [
  {
    name: "Personal Family",
    amount: 36245,
    type_id: Category_Types_Enum.Income,
  },
  {
    name: "Education",
    amount: 8462.9,
    type_id: Category_Types_Enum.Expense,
  },
  {
    name: "Saving Longterm",
    amount: 13246.88,
    type_id: Category_Types_Enum.Income,
  },
  {
    name: "Entertainments",
    amount: 36245.0,
    type_id: Category_Types_Enum.Income,
  },
  {
    name: "Investments",
    amount: 8462.9,
    type_id: Category_Types_Enum.Expense,
  },
  {
    name: "Charity",
    amount: 36245.0,
    type_id: Category_Types_Enum.Income,
  },
  {
    name: "Crypto Lucky",
    amount: 8462.9,
    type_id: Category_Types_Enum.Expense,
  },
];

const AssetScreen = memo(() => {
  const { goBack } = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const { width, bottom } = useLayout();

  const dataProvider = React.useRef(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  ).current;

  const budgetProvider = React.useMemo(() => {
    if (data.length) {
      return dataProvider.cloneWithRows(data);
    }
    return dataProvider.cloneWithRows([]);
  }, [data]);

  const layoutProvider = React.useRef(
    new LayoutProvider(
      (index) => {
        return View_Types_Enum.Full;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 83;
      }
    )
  ).current;

  const renderItem = React.useCallback((type, item, index) => {
    return (
      <View style={styles.item}>
        <Transaction item={item} index={index} onPress={goBack} />
      </View>
    );
  }, []);

  return (
    <Container>
      <TopNavigation
        accessoryLeft={() => (
          <Text category="title4" marginLeft={16}>
            Assets
          </Text>
        )}
        accessoryRight={() => (
          <NavigationAction icon="edit" marginRight={4} onPress={goBack} />
        )}
      />
      {!isEmpty(data) && (
        <RecyclerListView
        
          rowRenderer={renderItem}
          dataProvider={budgetProvider}
          layoutProvider={layoutProvider}
          scrollThrottle={16}
          scrollViewProps={{
            contentContainerStyle: [
              styles.contentContainerStyle,
              { paddingBottom: bottom + 48 },
            ],
            showsVerticalScrollIndicator: false,
            refreshControl: <RefreshControl tintColor="#F0DF67" />,
          }}
        />
      )}
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

export default AssetScreen;

const styles = StyleSheet.create({
  item: {
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
  contentContainerStyle: {
    paddingTop: 16,
  },
});
