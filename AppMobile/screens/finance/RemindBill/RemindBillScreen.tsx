import React, { memo } from "react";
import { FlatList, StyleSheet, Image, View } from "react-native";
import { useTheme, Layout, TopNavigation, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Bill from "./Bill";
import Chart from "./Chart";
import Friend from "./Friend";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { dataBill, dataFriend, dataTab } from "./data";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";

const RemindBill = memo(() => {
  const theme = useTheme();
  const { top, bottom, width } = useLayout();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const renderBill = React.useCallback(({ item }) => {
    return <Bill item={item} onPress={goBack} />;
  }, []);

  const renderAvatar = React.useCallback(({ item }) => {
    return <Friend item={item} onPress={goBack} />;
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          accessoryRight={
            <Text onPress={goBack} marginRight={16} status="primary">
              Main Wallet
            </Text>
          }
        />
        <CurrencyText category="title2" marginLeft={28}>
          1890250
        </CurrencyText>
      </Layout>
      <Content
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        contentContainerStyle={{ paddingBottom: bottom + 65 }}
      >
        <Text category="title4" marginLeft={24} marginTop={24}>
          RemindBill
        </Text>
        <FlatList
          data={dataBill || []}
          renderItem={renderBill}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentBill}
        />
        <Text category="title4" marginTop={32} marginLeft={24}>
          TOP Friends Share
        </Text>
        <FlatList
          data={dataFriend || []}
          renderItem={renderAvatar}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentFriend}
        />
        <Text category="title4" marginTop={32} marginLeft={24}>
          Expense Chart
        </Text>
        {/* <Chart /> */}
      </Content>
      <Layout level="2" style={[styles.bottom, { paddingBottom: bottom + 8 }]}>
        {dataTab.map((item, index) => {
          const { name, image } = item;
          return (
            <View key={index} style={styles.box}>
              {image ? (
                <Image source={image} />
              ) : (
                <Icon
                  pack="assets"
                  name={name}
                  style={[
                    styles.icons,
                    { tintColor: theme["color-basic-900"] },
                  ]}
                />
              )}
            </View>
          );
        })}
      </Layout>
    </Container>
  );
});

export default RemindBill;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 8,
  },
  contentBill: {
    paddingLeft: 24,
    paddingTop: 16,
    paddingRight: 8,
  },
  contentFriend: {
    paddingLeft: 24,
    paddingTop: 16,
  },
  box: {
    flex: 1,
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  icons: {
    width: 20,
    height: 20,
  },
});
