import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, Layout, ViewPager } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Income from "./Income";
import Expense from "./Expense";
import Segment from "./Segment";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { FinanceStackParamList } from "navigation/type";

const MonthChartScreen = memo(() => {
  const { top } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          accessoryRight={
            <Text onPress={goBack} marginRight={16} status="primary">
              Done
            </Text>
          }
        />
        <Text category="title2" marginLeft={16}>
          December 2021
        </Text>
      </Layout>
      <Segment
        style={styles.segment}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <ViewPager
        shouldLoadComponent={(index) => index === selectedIndex}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        style={styles.viewPage}
      >
        <Expense />
        <Income />
      </ViewPager>
    </Container>
  );
});

export default MonthChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 8,
  },
  segment: {
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 8,
  },
  viewPage: {
    flex: 1,
  },
});
