import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  bought: number;
  sold: number;
}

const Summary = memo(({ bought, sold }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text category="title2" marginLeft={24}>
          Summary
        </Text>
        <TouchableOpacity style={styles.btnAll}>
          <Text category="subhead" marginRight={8} status={"primary"}>
            See all
          </Text>
          <Icon pack="assets" name="rightArrow" style={styles.iconArr} />
        </TouchableOpacity>
      </View>
      <Content contentContainerStyle={styles.content} horizontal>
        <View>
          <TouchableOpacity activeOpacity={0.7}>
            <Layout level={"4"} style={styles.iconCard}>
              <Icon pack="assets" name="bought" />
            </Layout>
          </TouchableOpacity>
          <LinearGradient
            style={[
              styles.linear,
              {
                width: 180 * (width / 375),
                height: 130 * (height / 812),
              },
            ]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.8, y: 0.1 }}
            colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)"]}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                category="headline"
                marginBottom={12}
                marginTop={48}
                status={"grey500"}
              >
                Total Bought
              </Text>
              <Text category="title4">BTC {bought}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.7}>
            <Layout level={"5"} style={styles.iconCard}>
              <Icon pack="assets" name="sold" />
            </Layout>
          </TouchableOpacity>
          <LinearGradient
            style={[
              styles.linear,
              {
                width: 180 * (width / 375),
                height: 130 * (height / 812),
              },
            ]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.8, y: 0.1 }}
            colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)"]}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                category="headline"
                marginBottom={12}
                marginTop={48}
                status={"grey500"}
              >
                Total Sold
              </Text>
              <Text category="title4">BTC {sold}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Content>
    </View>
  );
});

export default Summary;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 29,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  btnAll: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 24,
  },
  iconArr: {
    width: 12,
    height: 12,
    tintColor: "text-primary-color",
  },
  iconCard: {
    borderRadius: 99,
    borderWidth: 5,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "background-basic-color-1",
    marginLeft: 16,
  },
  linear: {
    marginTop: -32,
    zIndex: -10,
    paddingLeft: 20,
    borderRadius: 24,
    marginRight: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
});
