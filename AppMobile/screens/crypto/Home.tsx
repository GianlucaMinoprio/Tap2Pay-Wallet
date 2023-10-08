import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, TopNavigation } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import keyExtractor from "utils/keyExtractor";
import { CryptoStackParamList } from "navigation/type";
import AdMob from "components/AdMob";

const Crypto = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<CryptoStackParamList>>();
  const data = React.useMemo(
    () => [
      {
        children: "HomePage",
        onPress: () => navigate("HomePage"),
      },
      {
        ads: true,
      },
      {
        children: "Market",
        onPress: () => navigate("Market"),
      },
      {
        children: "CoinDetails",
        onPress: () => navigate("CoinDetails"),
      },
      {
        children: "Wallet",
        onPress: () => navigate("Wallet"),
      },
      {
        children: "Exchange",
        onPress: () => navigate("Exchange"),
      },
      {
        ads: true,
      },
      {
        children: "Activities",
        onPress: () => navigate("Activities"),
      },
      {
        children: "News",
        onPress: () => navigate("News"),
      },
      {
        children: "NewDetails",
        onPress: () => navigate("NewDetails"),
      },
      {
        children: "CryptoProfile",
        onPress: () => navigate("CryptoProfile"),
      },
      {
        children: "Menu",
        onPress: () => navigate("Menu"),
      },
    ],
    []
  );

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob />
    ) : (
      <Button
        children={item.children}
        style={styles.button}
        onPress={item.onPress}
        size={"small"}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title="Education"
      />
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default Crypto;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  linear: {
    borderRadius: 12,
    marginHorizontal: 24,
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  contentContainerStyle: {
    paddingTop: 16,
  },
});
