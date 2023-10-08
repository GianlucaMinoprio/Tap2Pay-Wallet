import React, { memo } from "react";
import { Image, ImageSourcePropType, ScrollView, View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  ViewPager,
  TopNavigation,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Container from "components/Container";
import TabBar from "./TabBar";
import { Images } from "assets/images";
import { useNavigation } from "@react-navigation/native";
import Tab from "./Tab";
import AnimatedAppearance from "components/AnimatedAppearance";

interface Props {
  img: ImageSourcePropType;
}

const ViewCart = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Container style={styles.container}>
      <AnimatedAppearance>
        <View>
          <TopNavigation
            accessoryRight={
              <Input
                size="tiny"
                style={{ paddingHorizontal: 16, width: width }}
                accessoryLeft={<Icon pack="assets" name="search16" />}
                placeholder="Enter something…"
                status="secondary"
              />
            }
          />

          <TabBar
            tabs={DATA_TABS}
            style={styles.tabBar}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={[
              styles.content,
              { paddingBottom: bottom + 32 },
            ]}
          >
            <ViewPager
              selectedIndex={activeIndex}
              onSelect={(index) => setActiveIndex(index)}
              swipeEnabled={false}
            >
              <Tab data={DATA_BURGER} />
              <Tab data={DATA_DONUT} />
              <Tab data={DATA_PIZZA} />
              <Tab data={DATA_HOTDOG} />
            </ViewPager>

            <Image
              source={Images.viewCart}
              /* @ts-ignore */
              style={[styles.imgBottom, { width: width - 32 }]}
            />
          </ScrollView>
        </View>
      </AnimatedAppearance>
    </Container>
  );
});

export default ViewCart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 16,
  },
  tabBar: {
    paddingLeft: 16,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 16,
    marginTop: 24,
  },
  imgCard: {
    alignSelf: "center",
    width: 247,
    height: 198,
  },
  dots: {
    alignSelf: "center",
    marginTop: 44,
    marginBottom: 24,
  },
  tab: {},
  shopping: {
    height: 64,
    width: 64,
  },

  imgBottom: {
    alignSelf: "center",
    marginTop: 36,
  },
});
const DATA_TABS = [
  { id: 0, title: "Hambergur", icon: Images.burger },
  { id: 1, title: "Donut", icon: Images.donut },
  { id: 2, title: "Pizza", icon: Images.pizza },
  { id: 3, title: "Hotdog", icon: Images.hotdog },
];
const DATA_BURGER = {
  title: "Hambergur S",
  price: 14.25,
  image: [Images.burger, Images.burger, Images.burger, Images.burger],
  rate: 4.9,
};
const DATA_DONUT = {
  title: "Donut S",
  price: 14.25,
  image: [Images.donut1, Images.donut1, Images.donut1, Images.donut1],
  rate: 5.0,
};
const DATA_PIZZA = {
  title: "Pizza S",
  price: 14.25,
  image: [Images.pizza1, Images.pizza1, Images.pizza1, Images.pizza1],
  rate: 5.0,
};
const DATA_HOTDOG = {
  title: "Hot Dogs S",
  price: 14.25,
  image: [Images.hotdog1, Images.hotdog1, Images.hotdog1, Images.hotdog1],
  rate: 5.0,
};
