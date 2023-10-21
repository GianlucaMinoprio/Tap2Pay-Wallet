import React, { memo } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  StyleService,
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
import { StyleSheet, Button, TouchableOpacity } from 'react-native';

const Request: React.FC = ()  => {
  const [amount, setAmount] = useState(10);

  return (
    <View style={styles.container}>
      <Text category="title1" marginTop={16} center style={styles.headerText}>Send</Text>
      <View style={styles.amountContainer}>
        <TouchableOpacity style={styles.amountButton} onPress={() => setAmount(prev => Math.max(0, prev - 1))}>
          <Text style={styles.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.amountText}>${amount}</Text>
        <TouchableOpacity style={styles.amountButton} onPress={() => setAmount(prev => prev + 1)}>
          <Text style={styles.amountButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Sent!')}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerText: {
    color: 'black',
    
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  amountButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonText: {
    fontSize: 20,
    color: 'black',
  },
  amountText: {
    fontSize: 40,
    color: 'black',
    marginHorizontal: 20,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Request;


