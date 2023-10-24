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


import { RouteProp } from "@react-navigation/native";

interface PayProps {
  route: RouteProp<FinanceStackParamList, "Pay">;
}

const Pay = memo(({ route }: PayProps) => {

  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [transactionColor, setTransactionColor] = useState<string>('');


  const { bottom } = useLayout();
  //const [amount, setAmount] = useState(10);

  //const name = "0xbb6fF924Fe33b35eA8B2bE7923eDa2948a9E2c45";

  const { decodedText } = route.params;
  const [address, name, amount, currency] = decodedText.split(',');

  const apiUrl = `https://api.dicebear.com/7.x/bottts-neutral/png?seed=${address}`;

  const handleAccept = async () => {

    setTransactionColor('white');
    setTransactionStatus('Transaction en cours');

    const ethAmount = parseFloat(amount) * 0.00055;

    // Define the API endpoint and payload
    const endpoint = 'http://10.41.176.73:8081/propose-transaction';
    const payload = {
      address: address,
      name: name,
      amount: ethAmount,
      currency: 'ETH',
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setTransactionStatus('Transaction refusée');
        setTransactionColor('red');
        console.error(responseData.error);
      } else {

        setTransactionStatus('Transaction acceptée');
        setTransactionColor('green');
      }

    } catch (error) {
      console.error('Error calling API:', error);
    }

    setTimeout(() => {
      setTransactionStatus(null); // Réinitialisez l'état
      goBack(); // Naviguer en arrière
    }, 3000); // Attendre 3 secondes avant de naviguer en arrière
  };




  return (
    <Container>
      <TopNavigation
        title="Pay to"
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
          {name}
        </Text>
        <Text category="footnote" status="snow" marginTop={4} center>
          {address}
        </Text>

        <View style={styles.boxView}>
          
          <View style={themedStyles.amountContainer}>         
            
            <Text marginTop={16} style={themedStyles.amountText}>${amount}</Text>
          
          </View>

        </View>
        
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 20 }]}>
        
        {transactionStatus && (
            <Text style={{ color: transactionColor, textAlign: 'center', marginTop: 20 }}>
              {transactionStatus}
            </Text>
        )}

        <Button
          activeOpacity={0.7}
          children="Accept"
          onPress={handleAccept}
        />

      </Layout>
    </Container>
  );
});

export default Pay;

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
