import React, { memo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";
import SelectBox from "../Component/SelectBox";

interface ItemShippingProp {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
}

interface ShippingToProps {
  data: ItemShippingProp[];
  onAdd?(): void;
  selectedIndex: number;
  onChange(index: number): void;
  style?: StyleProp<ViewStyle>;
}

const ShippingTo = memo(
  ({ selectedIndex, onChange, onAdd, style, data }: ShippingToProps) => {
    const { width } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const changeIndex = React.useCallback(
      (i: number) => {
        return onChange(i);
      },
      [selectedIndex]
    );
    const refScrollView = React.useRef<ScrollView>(null);
    React.useEffect(() => {
      refScrollView.current?.scrollTo({
        x: selectedIndex * 200 - (width - 280) / 2,
        animated: true,
      });
    }, [selectedIndex]);
    return (
      <View style={[styles.container, style]}>
        <View style={styles.title}>
          <Text category="title3">🛵 Shipping to</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onAdd}>
            <Layout level={"7"} style={styles.btnAdd}>
              <Text
                category="caption1"
                marginVertical={6}
                marginHorizontal={10}
              >
                Add location
              </Text>
            </Layout>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={[styles.content]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={refScrollView}
        >
          {data.map((item, i) => {
            let isActive = selectedIndex === i;
            return (
              <TouchableOpacity
                onPress={() => changeIndex(i)}
                activeOpacity={0.7}
                key={i}
              >
                <LinearGradient
                  colors={isActive ? COLORS_ACTIVE : COLORS_INACTIVE}
                  style={[
                    styles.linearBtn,
                    {
                      borderWidth: isActive ? 0 : 1,
                      borderColor: isActive
                        ? "transparent"
                        : theme["color-basic-1400"],
                    },
                  ]}
                >
                  <View style={styles.option}>
                    <SelectBox selected={isActive} />
                    <View>
                      <Text category="title4">{item.name}</Text>
                      <Text category="subhead" marginVertical={4}>
                        {item.phoneNumber}
                      </Text>
                      <Text category="subhead">{item.location}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

export default ShippingTo;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 16,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    marginHorizontal: 24,
    alignItems: "center",
  },

  btnAdd: {
    borderRadius: 30,
  },
  option: {
    flexDirection: "row",
  },
  linearBtn: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
});
const COLORS_ACTIVE = ["rgba(19, 51, 116, 1)", "rgba(81, 145, 240, 1)"];
const COLORS_INACTIVE = ["transparent", "transparent"];
