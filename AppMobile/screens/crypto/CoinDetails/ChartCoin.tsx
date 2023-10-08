import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { LineChart } from "react-native-chart-kit";

interface Props {
  title: string;
}
const ChartCoin = memo(({ title }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text category="title2">{title}</Text>
        <TouchableOpacity>
          <Layout style={styles.hour} level={"2"}>
            <Text status={"primary"} category="subhead" marginRight={4}>
              24 hours
            </Text>
            <Icon pack="assets" name="arrow" style={styles.arrow} />
          </Layout>
        </TouchableOpacity>
      </View>
      <LineChart
        style={{ marginLeft: 4 }}
        data={{
          labels: ["1D", "7D", "1M", "3M", "6M", "9M", "12M", "All"],
          datasets: [
            {
              data: [
                2000000, 2500000, 3000000, 3500000, 6000000, 5000000, 8000000,
                7500000, 6000000, 6700000, 7700000, 8000000, 10000000, 11570000,
                11000000, 11000000, 12000000,
              ],
            },
          ],
        }}
        width={width - 12}
        height={209 * (height / 812)}
        segments={5}
        formatYLabel={(yValue) => `$${parseInt(yValue) / 1000000}M`}
        yLabelsOffset={12}
        chartConfig={{
          backgroundGradientFrom: theme["background-basic-color-1"],
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: theme["background-basic-color-1"],
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(41, 255, 40, 1)`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
          useShadowColorFromDataset: false,
          fillShadowGradientOpacity: 0.15,
          fillShadowGradient: "rgba(51, 255, 0, 0.09)",
        }}
        withOuterLines={false}
        withInnerLines={false}
        bezier
        withDots={false}
      />
      <View style={{ position: "absolute", left: 62, bottom: 38, zIndex: -10 }}>
        <View
          style={{
            position: "absolute",
            borderWidth: 0.7,
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: "#616E7C",
            left: 0,
            right: 0,
            bottom: 0,
            height: 181 * (height / 812),
            width: 290 * (width / 375),
            paddingHorizontal: 32,
            opacity: 0.4,
            zIndex: -10,
          }}
        >
          {inner.map((item, i) => (
            <Layout
              key={i}
              style={{
                width: 0.5,
                backgroundColor: "#616E7C",
                height: "100%",
              }}
            />
          ))}
        </View>
        <View
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            height: 181 * (height / 812),
            width: 290 * (width / 375),
            justifyContent: "space-between",
          }}
        >
          {inner1.map((item, i) => (
            <Layout
              key={i}
              style={{
                backgroundColor: "#616E7C",
                opacity: 0.4,
                height: 0.7,
                width: 290 * (width / 375),
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
});

export default ChartCoin;

const themedStyles = StyleService.create({
  container: {
    marginTop: 32,
    marginBottom: 44,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 32,
  },
  hour: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  arrow: {
    width: 12,
    height: 12,
  },
});
const inner = [1, 2, 3, 4, 5, 6, 7, 8];
const inner1 = [1, 2, 3, 4, 6, 7];
