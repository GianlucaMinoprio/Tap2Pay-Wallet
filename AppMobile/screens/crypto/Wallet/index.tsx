import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import BasicHeader from "screens/education/Component/BasicHeader";
import keyExtractor from "utils/keyExtractor";
import CryptoTabBar from "../Component/CryptoTabBar";
import ProgressWallet from "./ProgressWallet";
import Summary from "./Summary";
import BottomTab from "../Component/BottomTab";

const Wallet = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);

  const renderItem = React.useCallback(() => {
    return (
      <>
        <CryptoTabBar
          tabs={["Send", "Receive", "Buy"]}
          selectedIndex={activeTab}
          onChange={setActiveTab}
          style={styles.tabBar}
        />
      </>
    );
  }, [activeTab, setActiveTab]);
  const ListHeader = React.useCallback(() => {
    return <></>;
  }, [activeTab]);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <>
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          shouldLoadComponent={(i) => activeTab === i}
        >
          <ProgressWallet
            progressValue={1.23}
            data={[{ y: 43 }, { y: 45 }, { y: 65 }]}
          />
          <ProgressWallet
            progressValue={10.23}
            data={[{ y: 43 }, { y: 45 }, { y: 15 }]}
          />
          <ProgressWallet
            progressValue={36.3}
            data={[{ y: 43 }, { y: 25 }, { y: 35 }]}
          />
        </ViewPager>
        <Summary bought={0.0055} sold={0.0312} />
      </>
    );
  }, [activeTab]);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout level={"2"} style={[styles.header, { paddingTop: top }]}>
        <BasicHeader
          appearance={"control"}
          iconLeft={{ icon: "leftArrow" }}
          iconRight={{ icon: "user" }}
        />
        <Text category="title2" marginBottom={8} marginLeft={16}>
          Wallet
        </Text>
      </Layout>
      <FlatList
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />
      <BottomTab selectIndex={4} />
    </Container>
  );
});

export default Wallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tabBar: {
    margin: 24,
  },
  content: {
    paddingBottom: 40,
  },
});
