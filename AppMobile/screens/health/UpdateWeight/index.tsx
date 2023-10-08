import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { RefreshControl } from "react-native-web-refresh-control";
import WeightUpdate from "./WeightUpdate";
import { Images } from "assets/images";
import CardWeightChart from "../HomeHealth/Chart";
import { Data_Weight } from "../HomeHealth/data";

const UpdateWeight = memo(() => {
  const { bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction marginLeft={4} marginBottom={-4} />}
      />
      <Content
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 40 }]}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <WeightUpdate weight={50.6} goalWeight={53} />
        <CardWeightChart
          strokeColor={theme["color-primary-100"]}
          data={Data_Weight}
          style={styles.cardWeight}
          title="weight"
        />
        <TouchableOpacity style={styles.bodyCard} activeOpacity={0.7}>
          <Icon pack="assets" name="happyFace" style={styles.happyFace} />
          <View>
            <Text category="headline" status="white">
              Body measurements
            </Text>
            <Text category="footnote" status="placeholder">
              Good!
            </Text>
          </View>
        </TouchableOpacity>
      </Content>
      <Layout level="2" style={[styles.bottomTab, { paddingBottom: bottom }]}>
        <NavigationAction icon="calendar" status="snow" size="medium" />
        <NavigationAction icon="beachHouse" status="snow" size="medium" />
        <Image
          source={Images.logo4}
          /* @ts-ignore */
          style={styles.logo}
        />
        <NavigationAction icon="fire" status="snow" size="medium" />
        <NavigationAction icon="user" status="primary" size="medium" />
      </Layout>
    </Container>
  );
});

export default UpdateWeight;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
  },
  cardWeight: {
    marginVertical: 24,
  },
  bodyCard: {
    backgroundColor: "background-basic-color-7",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "color-basic-1500",
    flexDirection: "row",
    marginHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  happyFace: {
    marginLeft: 22,
    marginRight: 28,
    width: 24,
    height: 24,
    tintColor: "text-white-color",
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 24,
    height: 20.71,
  },
});
