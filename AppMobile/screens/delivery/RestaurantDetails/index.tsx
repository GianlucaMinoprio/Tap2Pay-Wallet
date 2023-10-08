import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import LinearBottom from "components/LinearBottom";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import ReadMore from "components/ReadMore";
import MenuTabBar from "../Component/MenuTabBar";
import keyExtractor from "utils/keyExtractor";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import FoodCard from "../Component/FoodCard";

const RestaurantDetails = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const HEIGHT_IMG = 295 * (height / 812);
  const [data, setData] = React.useState(DATA_RESTAURANT_DETAILS);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (event.contentOffset.y > 0) {
      translationY.value = withSpring(1);
    } else {
      translationY.value = withTiming(0);
    }
  });

  const headerStyle = useAnimatedStyle(() => {
    const topImg = interpolate(
      translationY.value,
      [0, 1],
      [0, -HEIGHT_IMG + 56 * (height / 812) + top]
    );
    return {
      top: topImg,
      position: "absolute",
      zIndex: -10,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    };
  }, [scrollHandler, translationY.value]);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <>
        <LinearGradient
          style={styles.title}
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
        >
          <BlurView tint="default" intensity={120} style={styles.blurView}>
            <Text category="title2" marginBottom={4}>
              {data.name}
            </Text>
            <View style={styles.location}>
              <Icon pack="assets" name="worldWide" style={styles.iconWorld} />
              <Text category="subhead">{data.location}</Text>
            </View>
          </BlurView>
        </LinearGradient>
        <View style={styles.details}>
          <Text category="subhead">🛵️ {data.distance}kms</Text>
          <Text category="subhead">⭐️ {data.rate}/5</Text>
          <Text category="subhead">⏰️ 15-20 minutes</Text>
        </View>
        <Layout style={styles.about}>
          <Layout style={styles.textAbout}>
            <Text category="title4" center>
              About
            </Text>
          </Layout>
          <ReadMore children={data.about} />
        </Layout>
      </>
    );
  }, []);
  const renderItem = React.useCallback(() => {
    return (
      <MenuTabBar activeIndex={selectedIndex} onChange={setSelectedIndex} />
    );
  }, [selectedIndex]);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        swipeEnabled={false}
        shouldLoadComponent={(i) => selectedIndex === i}
      >
        <Content horizontal contentContainerStyle={styles.viewPager}>
          {data.menu[0].details.map((item, i) => {
            return <FoodCard item={item} key={i} />;
          })}
        </Content>
        <Content horizontal contentContainerStyle={styles.viewPager}>
          {data.menu[1].details.map((item, i) => {
            return <FoodCard item={item} key={i} />;
          })}
        </Content>
        <Content horizontal contentContainerStyle={styles.viewPager}>
          {data.menu[2].details.map((item, i) => {
            return <FoodCard item={item} key={i} />;
          })}
        </Content>
        <Content horizontal contentContainerStyle={styles.viewPager}>
          {data.menu[3].details.map((item, i) => {
            return <FoodCard item={item} key={i} />;
          })}
        </Content>
      </ViewPager>
    );
  }, [selectedIndex]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        appearance={"control"}
        accessoryLeft={<NavigationAction icon="leftArrow" status="secondary" />}
        accessoryRight={<NavigationAction icon="heart" status="secondary" />}
      />
      <Animated.View style={headerStyle}>
        <Animated.Image
          source={data.image}
          style={{
            width: width,
            height: HEIGHT_IMG,
          }}
        />
      </Animated.View>
      <AnimatedFlatList
        onScroll={scrollHandler}
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={[
          styles.content,
          { paddingTop: HEIGHT_IMG / 2.2 },
        ]}
      />

      <LinearBottom
        leftButton={{
          icon: "house",
          onPress: goBack,
        }}
        rightButton={{
          icon: "heart",
          onPress: goBack,
        }}
      />
    </Container>
  );
});

export default RestaurantDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  iconWorld: {
    width: 16,
    height: 16,
    tintColor: "text-basic-color",
    marginRight: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
    borderRadius: 24,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  blurView: {
    padding: 20,
    alignItems: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 56,
    marginBottom: 16 + 22,
  },
  about: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-7",
    padding: 16,
    paddingTop: 19,
    marginHorizontal: 24,
    marginBottom: 28,
  },
  textAbout: {
    alignSelf: "center",
    marginTop: -44,
    padding: 10,
  },
  viewPager: {
    paddingLeft: 24,
  },
});
const DATA_RESTAURANT_DETAILS = {
  id: 0,
  name: "Lotteia Chicken",
  location: "212 - Kim Ma Thuong - Ha Noi",
  distance: 10,
  rate: 4,
  image: Images.baseDetails,
  menu: [
    {
      title: "Fastfood",
      details: [
        {
          id: 0,
          name: "Ice Cream Jolibee",
          price: 2.34,
          rate: 4,
          distance: 10,
          image: Images.ramen,
          ratio: 1.2,
        },
        {
          id: 1,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
        {
          id: 2,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
      ],
    },
    {
      title: "Juice",
      details: [
        {
          id: 0,
          name: "Ice Cream Jolibee",
          price: 2.34,
          rate: 4,
          distance: 10,
          image: Images.ramen,
          ratio: 1.2,
        },
        {
          id: 1,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
        {
          id: 2,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
      ],
    },
    {
      title: "Ice-Cream",
      details: [
        {
          id: 0,
          name: "Ice Cream Jolibee",
          price: 2.34,
          rate: 4,
          distance: 10,
          image: Images.ramen,
          ratio: 1.2,
        },
        {
          id: 1,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
        {
          id: 2,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
      ],
    },
    {
      title: "Cake-Cream",
      details: [
        {
          id: 0,
          name: "Ice Cream Jolibee",
          price: 2.34,
          rate: 4,
          distance: 10,
          image: Images.ramen,
          ratio: 1.2,
        },
        {
          id: 1,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
        {
          id: 2,
          name: "Chicken katsu",
          price: 4.99,
          rate: 4,
          image: Images.chickenBucket,
          distance: 10,
          ratio: 119.6 / 121,
        },
      ],
    },
  ],
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium, lacus in convallis porttitor, tellus justo finibus diam, in vehicula est nunc eu orci. Fusce tincidunt ligula eget tellus dictum, ut egestas magna sagittis. Aliquam erat volutpat. Sed sit amet fermentum ipsum, vel ullamcorper est. Suspendisse suscipit scelerisque blandit. Aliquam sed egestas ipsum. Nullam tincidunt vulputate nisi sed condimentum. In tincidunt diam tellus, sit amet congue tellus volutpat ac. Proin quis urna mattis, viverra dolor ac, dictum sem.",
};
