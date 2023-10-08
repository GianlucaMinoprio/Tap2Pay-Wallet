import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, ViewPager } from "@ui-kitten/components";

import Page from "./Page";
import Text from "components/Text";
import FrequencyTab from "./FrequencyTab";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { ReportType } from "./type";

const AssetReportScreen = memo(() => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const data: ReportType[] = [
    {
      name: "December 2021",
      income: 25368.9,
      totalIncome: 925.6,
      expense: 400,
      totalExpense: 1485.6,
    },
    {
      name: "November 2021",
      income: 700,
      totalIncome: 925.6,
      expense: 700,
      totalExpense: 1485.6,
    },
    {
      name: "October 2021",
      income: 800,
      totalIncome: 925.6,
      expense: 400,
      totalExpense: 1485.6,
    },
    {
      name: "September 2021",
      income: 850,
      totalIncome: 925.6,
      expense: 200,
      totalExpense: 1485.6,
    },
    {
      name: "August 2021",
      income: 25368.9,
      totalIncome: 925.6,
      expense: 500,
      totalExpense: 1485.6,
    },
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => (
          <Text category="title4" marginLeft={16}>
            Assets Report
          </Text>
        )}
        accessoryRight={() => (
          <NavigationAction icon="cancel" marginRight={4} />
        )}
      />
      <FrequencyTab selectedIndex={selectedIndex} onChange={setSelectedIndex} />
      <ViewPager
        shouldLoadComponent={(index) => index === selectedIndex}
        style={styles.viewPager}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      >
        <Page expense={1485.6} income={925.6} data={data} />
        <Page expense={1485.6} income={925.6} data={data} />
        <Page expense={1485.6} income={925.6} data={data} />
        <Page expense={1485.6} income={925.6} data={data} />
      </ViewPager>
    </Container>
  );
});

export default AssetReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  viewPager: {
    flex: 1,
  },
});
