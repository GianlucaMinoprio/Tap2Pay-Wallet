import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { Images } from "assets/images";

interface Props {
  selectIndex?: number;
}

const BottomTab = memo(({ selectIndex = 0 }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(selectIndex);
  return (
    <Layout style={[styles.container, { paddingBottom: bottom }]} level={"2"}>
      <View style={styles.content}>
        {DATA.map((item, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              onPress={() => setActiveTab(i)}
            >
              {item.icon === "logo" ? (
                <Image
                  source={Images.logo4}
                  /* @ts-ignore */
                  style={styles.logo}
                />
              ) : (
                <Icon
                  pack="assets"
                  name={item.icon}
                  style={[
                    {
                      tintColor:
                        activeTab === i
                          ? theme["text-primary-color"]
                          : theme["text-snow-color"],
                    },
                    styles.icon,
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Layout>
  );
});

export default BottomTab;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 32,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },
  icon: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 24,
    height: 24,
  },
});
const DATA = [
  { id: 1, icon: "barChart1" },
  { id: 2, icon: "exchange" },
  { id: 3, icon: "logo" },
  { id: 4, icon: "search" },
  { id: 5, icon: "creditCard" },
];
