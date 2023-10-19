import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, TopNavigation } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { FinanceStackParamList } from "navigation/type";
import AdMob from "components/AdMob";

const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<FinanceStackParamList>>();

  const data = React.useMemo(
    () => [
      {
        children: "Transfer",
        onPress: () => navigate("Transfer"),
      },
      {
        children: "Remind Bill",
        onPress: () => navigate("RemindBill"),
      },
    ],
    []
  );

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginBottom={16} />
    ) : (
      <Button {...item} style={styles.button} />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title="Finance"
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

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  contentContainerStyle: {
    paddingTop: 16,
  },
});
