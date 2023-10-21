import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  StyleService,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Asterisk from "./Asterisk";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { FinanceStackParamList } from "navigation/type";
import { useState } from 'react';


const Request = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const { bottom } = useLayout();
  const [amount, setAmount] = useState(10);

  const name = "0xbb6fF924Fe33b35eA8B2bE7923eDa2948a9E2c45";
  const apiUrl = `https://api.dicebear.com/7.x/bottts-neutral/png?seed=${name}`;



  return (
    <Container>
      <TopNavigation
        title="Request from"
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Avatar
          source={{ uri: apiUrl }} 
          //@ts-ignore
          style={styles.avatar}
          size="80"
        />
        <Text category="title4" marginTop={16} center>
          Axel Cochepin
        </Text>
        <Text category="footnote" status="snow" marginTop={4} center>
          {name}
        </Text>

        <View style={styles.boxView}>
          
          <View style={themedStyles.amountContainer}>  

            <TouchableOpacity style={styles.amountButton} onPress={() => setAmount(prev => Math.max(0, prev - 1))}>
              <Text style={styles.amountButtonText}>-</Text>
            </TouchableOpacity>       
            
            <Text marginTop={16} style={themedStyles.amountText}>${amount}</Text>
          
            <TouchableOpacity style={styles.amountButton} onPress={() => setAmount(prev => prev + 1)}>
              <Text style={styles.amountButtonText}>+</Text>
            </TouchableOpacity>

          </View>

        </View>
        
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 20 }]}>
        <Button
          activeOpacity={0.7}
          children="Request Payment"
          onPress={goBack}
        />
      </Layout>
    </Container>
  );
});

export default Request;

const themedStyles = StyleService.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 32,
  },
  boxView: {
    marginTop: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "color-radical-600",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: -24,
    borderColor: "background-basic-color-1",
    backgroundColor: "color-salmon-100",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "color-basic-1500",
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    color: "color-basic-1100",
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  amountButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonText: {
    fontSize: 20,
    color: 'black',
  },
  amountText: {
    fontSize: 50,
    marginHorizontal: 40,
    paddingTop: 30,
    height: 70,
  },
});
