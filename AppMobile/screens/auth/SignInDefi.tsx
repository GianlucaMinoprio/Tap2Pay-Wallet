import React, { memo } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ButtonText from "components/ButtonText";
import { SignIn01_Data } from "./SignIn01";
import useLayout from "hooks/useLayout";

const SignInDefi = memo(() => {
  const { goBack } = useNavigation();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
      <Content style={styles.content}>
        <Text category="header" marginTop={16} marginRight={94}>
          Changing the Face of Decentralized Finance.
        </Text>
        <Input
          placeholder="Enter ENS domain"
          status="primary"
          style={styles.input}
        />
        <Button children="Go Now!" onPress={goBack} />
        <Button
          children="Connect Wallet"
          style={styles.wallet}
          status="control"
        />
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="About us Metmoi"
          styleIcon={styles.iconArrow}
        />
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="Understand our project?"
          styleIcon={styles.iconArrow}
          style={styles.btnText}
        />
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="Contact us"
          styleIcon={styles.iconArrow}
          style={styles.btnText}
        />
        <ScrollView
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.btnImage, { paddingBottom: bottom +24}]}
        >
          {SignIn01_Data.map((_, i) => {
            return <Image key={i} source={_.image} />;
          })}
        </ScrollView>
      </Content>
    </Container>
  );
});

export default SignInDefi;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 48,
    height: 48,
    marginLeft: 40,
  },
  iconArrow: {
    tintColor: "color-primary-100",
    marginRight: 8,
  },
  input: {
    marginVertical: 24,
  },
  wallet: {
    marginTop: 16,
    marginBottom: 32,
  },
  content: {
    marginHorizontal: 40,
  },
  btnImage: {
    justifyContent: "space-between",
    marginTop: 48,
    flex: 1,
  },
  btnText: {
    marginTop: 24,
  },
});
