import React, { memo } from "react";
import { FlatList, StyleSheet, Image, View, TouchableOpacity } from "react-native";
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
import Transaction from "./Transaction";
import ButtonText from "components/ButtonText";


import keyExtractor from "utils/keyExtractor";
import { dataBill, dataFriend, dataTransaction, dataSendReq } from "./data";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";
import SendReq from "./SendReq";

import { RootStackParamList } from "navigation/type";

const RemindBill = memo(() => {
  const theme = useTheme();
  const { top, bottom, width } = useLayout();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const handlePay = () => {
    navigation.navigate('Finance', { screen: 'Pay' }); // Navigate to Pay screen when audio file detected
  }

  const handleRequest = () => {
    navigation.navigate('Finance', { screen: 'Request' });
  }

  const renderBill = React.useCallback(({ item }) => {
    return <Bill item={item} onPress={goBack} />;
  }, []);

  const renderAvatar = React.useCallback(({ item }) => {
    return <Friend item={item} onPress={goBack} />;
  }, []);

  const renderTransaction = React.useCallback(({ item }) => {
    return <Transaction item={item} onPress={goBack} />;
  }, []);

  const renderSendReq = React.useCallback(({ item }) => {
    return <SendReq item={item} onPress={handleRequest} />;
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        
        <View style={styles.row}>
          <Text category="title3" marginTop={16}>History</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconView}
            onPress={goBack}
          >
            <Icon
              pack="assets"
              name="arrowRight16"
              style={[styles.icon, { tintColor: theme["color-basic-1800"] }]}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        
        <Text category="title2" marginLeft={28}>
          Tap2Pay
        </Text>
      </Layout>
      <Content
        refreshControl={<RefreshControl tintColor="#C6DABF" />}
        contentContainerStyle={{ paddingBottom: bottom + 65 }}
      >
        <Text category="title4" marginLeft={24} marginTop={24}>
          Account
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

        <FlatList
          data={dataSendReq || []}
          renderItem={renderSendReq}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentSendReq}
        />




        <Text category="title4" marginTop={8} marginLeft={24}>
          Friends Share
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
        
        <FlatList
        data={dataTransaction || []}
        renderItem={renderTransaction}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={{ paddingBottom: bottom + 56 }}
        refreshControl={<RefreshControl tintColor="#C6DABF" />}
      />
      </Content>
      
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
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentSendReq: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 8,
    width: 10,
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
  row: {
    paddingLeft: 24,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
