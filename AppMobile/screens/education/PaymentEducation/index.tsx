import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import BasicHeader from "../Component/BasicHeader";
import Carousel from "react-native-snap-carousel";
import keyExtractor from "utils/keyExtractor";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "assets/images";

const PaymentEducation = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const WIDTH_ITEM = 290 * (width / 375);
  const HEIGHT_ITEM = 185 * (height / 812);
  const refCarousel = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={[styles.item, { width: WIDTH_ITEM, height: HEIGHT_ITEM }]}>
        <LinearGradient
          style={[styles.item, { width: WIDTH_ITEM, height: HEIGHT_ITEM }]}
          colors={item.colors}
        >
          <Image
            source={Images.logo5}
            /* @ts-ignore */
            style={styles.logo}
          />
          <Text marginLeft={16} category="title4" marginBottom={12}>
            {item.cardNumber.toString().slice(0, 4)}{" "}
            {item.cardNumber.toString().slice(4, 8)}{" "}
            {item.cardNumber.toString().slice(8, 12)}{" "}
            {item.cardNumber.toString().slice(12, 16)}
          </Text>
          <Image
            /* @ts-ignore */
            style={styles.chip}
            source={Images.chip}
          />
          <Image
            /* @ts-ignore */
            style={styles.traced}
            source={Images.traced}
          />
        </LinearGradient>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <BasicHeader
        title="Check out"
        iconLeft={{ icon: "drawMenu", _onPress: goBack }}
        iconRight={{ icon: "notification", _onPress: goBack }}
      />
      <Content contentContainerStyle={styles.content}>
        {/* Payment */}
        <Text category="title3" marginBottom={24} marginLeft={24}>
          💳 Payment
        </Text>
        {/* <Carousel
          data={DATA}
          ref={refCarousel}
          sliderWidth={width}
          onSnapToItem={(index) => setActiveIndex(index)}
          itemWidth={WIDTH_ITEM}
          itemHeight={HEIGHT_ITEM}
          renderItem={renderItem}
          firstItem={activeIndex}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.85}
          loop
          contentContainerCustomStyle={styles.contentCarousel}
          keyExtractor={keyExtractor}
        /> */}
        <View style={styles.newCard}>
          <TouchableOpacity style={styles.union}>
            <Icon pack="assets" name="union" style={styles.iconUnion} />
          </TouchableOpacity>
          <Text category="headline" marginLeft={8} status={"placeholder"}>
            Add new card
          </Text>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text category="title3" marginBottom={24} marginTop={32}>
            💰 Card Detail
          </Text>
          <Input placeholder="Card Name" style={styles.cardName} />
          <Input placeholder="Card Number" />
          <View style={styles.footer}>
            <Input placeholder="CVC" style={styles.cvc} />
            <Input placeholder="Expired Date" style={styles.date} />
          </View>
        </View>
      </Content>
      <View>
        <Button children="Check out" style={[styles.checkOut]} />
      </View>
    </Container>
  );
});

export default PaymentEducation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: "flex-end",
    marginVertical: 4,
    marginRight: 4,
  },
  union: {
    width: 32,
    height: 24,
    backgroundColor: "color-primary-100",
    justifyContent: "center",
    borderRadius: 4,
    marginLeft: 24,
  },
  cardDetails: {
    marginHorizontal: 24,
  },
  iconUnion: {
    width: 12,
    height: 12,
    alignSelf: "center",
  },
  newCard: {
    flexDirection: "row",
  },
  chip: {
    marginLeft: 20,
    width: 44.62,
    height: 33.76,
  },
  traced: {
    width: 62,
    height: 20,
    alignSelf: "flex-end",
    marginTop: 18.59,
    marginRight: 20,
  },
  item: {
    borderRadius: 12,
  },
  contentCarousel: {
    marginBottom: 24,
  },
  content: {},
  cardName: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cvc: {
    flex: 1,
    marginRight: 11,
  },
  date: {
    flex: 1,
  },
  checkOut: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 32,
  },
});
const DATA = [
  {
    id: 0,
    cardNumber: 1234567890123456,
    type: "visa",
    colors: ["rgba(81, 145, 240, 1)", "rgba(19, 51, 116, 1)"],
  },
  {
    id: 1,
    cardNumber: 1234567890123456,
    type: "visa",
    colors: ["rgba(250, 209, 65, 1)", "rgba(214, 77, 0, 1)"],
  },
  {
    id: 2,
    cardNumber: 1234567890123456,
    type: "visa",
    colors: ["rgba(196, 52, 220, 1)", "rgba(33, 29, 225, 1)"],
  },
];
