import React, { memo } from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Container from "components/Container";

import { Images } from "assets/images";
import { RootStackParamList } from "../../navigation/type";
import AdMob from "components/AdMob";

const Intro = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data = [
    {
      children: "OnBoarding",
      onPress: () => navigate("Onbroading", { screen: "Onboarding" }),
    },
    {
      children: "Auth",
      onPress: () => navigate("Auth", { screen: "Home" }),
    },
    {
      children: "Finance",
      onPress: () => navigate("Finance", { screen: "Home" }),
    },
  ];

  const ListHeaderComponent = React.useCallback(() => {
    return <Image source={Images.logo4} style={styles.image} />;
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return item.ads ? (
      <AdMob marginTop={8} />
    ) : (
      <Button style={styles.button} {...item} size={'small'}/>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <ListHeaderComponent />
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default Intro;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  image: {
    alignSelf: "center",
    marginBottom: 8,
    transform: [{ scale: 0.7 }],
  },
  button: {
    marginTop: 8,
  },
});
