import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  useTheme,
  Avatar,
  Icon,
  TopNavigation,
  Layout,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Wallet from "./Wallet";
import Text from "components/Text";
import Transaction from "./Transaction";
import Container from "components/Container";

import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import { dataTransaction, dataWallet } from "./data";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";

const EWalletScreen = memo(() => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <Text category="title3" marginLeft={24}>
          Services
        </Text>
        <FlatList
          data={dataWallet || []}
          renderItem={renderWallet}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
          snapToInterval={196}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentWallet}
        />
        <View style={styles.row}>
          <Text category="title3">Latest Transaction</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconView}
            onPress={goBack}
          >
            <Icon
              pack="assets"
              name="arrowRight16"
              style={[styles.icon, { tintColor: theme["color-basic-1800"] }]}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [dataWallet]);

  const renderWallet = React.useCallback(({ item }) => {
    return <Wallet item={item} onPress={goBack} />;
  }, []);

  const renderTransaction = React.useCallback(({ item }) => {
    return <Transaction item={item} onPress={goBack} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => (
          <Avatar size="40" source={Images.avatar1} style={styles.avatar} />
        )}
      />
      <FlatList
        data={dataTransaction || []}
        renderItem={renderTransaction}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={{ paddingBottom: bottom + 56 }}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
      <Layout level="2" style={[styles.bottom, { paddingBottom: bottom + 8 }]}>
        <Icon
          pack="assets"
          name="house"
          style={[styles.icons, { tintColor: theme["color-basic-900"] }]}
        />
        <Image source={Images.uiLogo} />
        <Icon
          pack="assets"
          name="user"
          style={[styles.icons, { tintColor: theme["color-basic-900"] }]}
        />
      </Layout>
    </Container>
  );
});

export default EWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginRight: 24,
  },
  row: {
    paddingLeft: 24,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  contentWallet: {
    paddingLeft: 24,
    paddingRight: 8,
    paddingTop: 16,
    paddingBottom: 32,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 72,
  },
  icons: {
    width: 20,
    height: 20,
  },
});
