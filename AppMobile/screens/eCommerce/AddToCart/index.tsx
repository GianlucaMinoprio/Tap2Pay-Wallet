import React, { memo } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CurrencyText from "components/CurrencyText";
import { Category_Types_Enum } from "constants/Type";
import _, { isEmpty } from "lodash";
import useLayout from "hooks/useLayout";

const AddToCart = memo(() => {
  const [data, setData] = React.useState(DATA);
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const handleRemove = React.useCallback(
    (item) => {
      const arr = _.filter(data, (i) => {
        return i !== item;
      });
      setData(arr);
    },
    [data]
  );

  const renderItem = React.useCallback(
    ({ item, index }) => {
      const onPress = () => {
        let idx = _.find(data, (i) => i.id === item.id);

        if (!!idx) {
          handleRemove(item);
        }
      };
      return (
        <View style={styles.item}>
          <Layout level="2" style={styles.imgItem}>
            <Image
              source={item.image}
              /* @ts-ignore */
              style={styles.icon}
            />
          </Layout>
          <View style={styles.viewText}>
            <View style={styles.flexRow}>
              <Text children={item.title} category="title4" status="white" />
              <TouchableOpacity onPress={onPress}>
                <Icon pack="assets" name="cancel" style={styles.cancel} />
              </TouchableOpacity>
            </View>
            <View style={styles.flexRow}>
              <Text
                category="subhead"
                status="blue"
                children={`x${item.quantity}`}
              />
              <Text
                category="headline"
                status="primary"
                children={item.price}
              />
            </View>
          </View>
        </View>
      );
    },
    [data]
  );
  const renderHeader = React.useCallback(() => {
    return (
      <Layout level="4" style={styles.card}>
        <Text
          category="title3"
          status="white"
          center
          marginTop={32}
          marginBottom={38}
        >
          You have{" "}
          <Text
            children={` ${data.length} `}
            status="primary"
            category="title3"
            center
          />
          product on cart is{" "}
          <CurrencyText
            center
            children={`24135.99`}
            type={Category_Types_Enum.Income}
            status="primary"
            category="title3"
          />
        </Text>
      </Layout>
    );
  }, [data]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title="Shopping Cart"
        accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
      />

      {!isEmpty(data) ? (
        <FlatList
          data={data}
          keyExtractor={(i, _) => i.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={[]}
          keyExtractor={(i, _) => _.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Layout style={styles.totalView}>
        <Text children="total:" uppercase category="headline" status="white" />
        <Text children="$15.88" uppercase category="title4" status="primary" />
      </Layout>
      <Layout style={[styles.bottom, { marginBottom: bottom + 8 }]}>
        <Button
          children="Continue Shopping"
          style={styles.shopping}
          status="disable"
        />
        <Button children="Checkout" style={styles.checkout} />
      </Layout>
    </Container>
  );
});

export default AddToCart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  icon: {
    width: 64,
    height: 51,
    marginVertical: 22,
    marginHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 16,
    paddingTop: 16,
  },
  imgItem: {
    marginRight: 16,
    borderRadius: 8,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewText: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 4,
  },
  cancel: {
    width: 16,
    height: 16,
    tintColor: "text-snow-color",
    marginTop: 4,
    marginRight: 8,
  },
  totalView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "background-basic-color-2",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 8,
  },
  bottom: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
  },
  shopping: {
    flex: 1,
    marginRight: 16,
  },
  checkout: {
    flex: 1,
  },
});
const DATA = [
  {
    id: 0,
    title: "Minimal ART NFT",
    price: "123ETH",
    quantity: 2,
    image: Images.burger,
  },
  {
    id: 1,
    title: "Minimal ART NFT",
    price: "123ETH",
    quantity: 2,
    image: Images.burger,
  },
  {
    id: 2,
    title: "Minimal ART NFT",
    price: "123ETH",
    quantity: 2,
    image: Images.burger,
  },
];
