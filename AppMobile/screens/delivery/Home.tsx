import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, TopNavigation } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import keyExtractor from "utils/keyExtractor";
import { DeliveryStackParamList } from "navigation/type";
import AdMob from "components/AdMob";
import Text from "components/Text";

const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<DeliveryStackParamList>>();
  const data = React.useMemo(
    () => [
      {
        children: "HomePage",
        onPress: () => navigate("HomePage"),
      },
      {
        children: "Food and Drink",
        onPress: () => navigate("FoodAndDrink"),
      },
      {
        ads: true,
      },
      {
        children: "Food Details",
        onPress: () => navigate("FoodDetails"),
      },
      {
        children: "Restaurant",
        onPress: () => navigate("Restaurant"),
      },
      {
        children: "Restaurant Details",
        onPress: () => navigate("RestaurantDetails"),
      },
      {
        children: "My Order",
        onPress: () => navigate("MyOrder"),
      },
      {
        children: "Payment",
        onPress: () => navigate("Payment"),
      },

      {
        ads: true,
      },
      {
        children: "Success",
        onPress: () => navigate("Success"),
      },
      {
        children: "Tracking Order",
        onPress: () => navigate("TrackingOrder"),
      },
    ],
    []
  );

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginBottom={16} />
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
        accessoryLeft={() => (
          <NavigationAction onPress={goBack} icon="leftArrow" />
        )}
        title={() => (
          <Text center status={"primary"} uppercase category="headline">
            Food Delivery, Ride-hailing
          </Text>
        )}
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
