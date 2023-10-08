import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Line from "components/Line";
import ListRecipes from "../Recipes/ListRecipes";

const PlanDetails = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
        title={() => (
          <TouchableOpacity
            disabled
            style={[styles.btnTop, { width: 128 * (width / 375) }]}
          >
            <Text status="blue" category="subhead">
              Be Strongs
            </Text>
          </TouchableOpacity>
        )}
      />
      <Content>
        <Image
          source={Images.beStrong}
          /* @ts-ignore */
          style={styles.image}
        />
        <Text category="title2" status="white" center marginBottom={8}>
          Food For Strengs
        </Text>
        <Text category="subhead" status="white" opacity={0.5} center>
          Get strong with food plans
        </Text>
        <View style={styles.statusView}>
          {Data_Status.map((item, index) => {
            return (
              <View key={index}>
                <Icon pack="assets" name="check" style={styles.checked} />
                <Text category="subhead" status="white" marginTop={8}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>
        <Line
          backgroundColor={theme["color-basic-1300"]}
          marginHorizontal={24}
        />
        <ListRecipes title={"Recipes"} dataList={Data_Recipes} />
      </Content>
      <Button
        children="Start Plan $25"
        style={[{ width: 154 * (width / 375) }, styles.btnBottom]}
      />
    </Container>
  );
});

export default PlanDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  btnTop: {
    height: 32,
    borderRadius: 16,
    width: 128,
    backgroundColor: "color-primary-100",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
  },
  topNav: {
    marginBottom: -8,
  },
  checked: {
    tintColor: "color-primary-100",
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 34,
    marginTop: 32,
    marginBottom: 24,
  },
  btnBottom: {
    alignSelf: "center",
    marginTop: 8,
  },
});
const Data_Status = [
  { id: 0, title: "Loss Weight" },
  { id: 1, title: "Muscle Gain" },
  { id: 2, title: "Less Snack" },
];

export const Data_Recipes = [
  {
    id: 0,
    name: "pizza",
    image: Images.pizzaBf,
    cals: 328,
  },
  {
    id: 1,
    name: "donut",
    image: Images.donutBf,
    cals: 328,
  },
  {
    id: 2,
    name: "pizza",
    image: Images.pizzaBf,
    cals: 328,
  },
];
