import React, { memo } from "react";
import * as WebBrowser from "expo-web-browser";

import { View, Image } from "react-native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import Checkbox from "components/Checkbox";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";

const Term = memo(() => {
  const { dispatch } = useNavigation();
  const { height, width, top } = useLayout();

  const styles = useStyleSheet(themedStyles);
  const [checked, setChecked] = React.useState(false);

  const itemHeight = 406 * (height / 812);
  const itemWidth = 187.5 * (width / 375);

  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const login = () => {
    nextScreen("Intro");
  };

  const handleGoPolicy = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/metmoi/policy");
  }, []);

  const handleGoTerm = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/metmoi/term");
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <View
        style={[
          styles.layout,
          {
            width: itemWidth + 8,
            height: itemHeight + 8,
          },
        ]}
      >
        <Image
          source={item}
          style={{ width: itemWidth, height: itemHeight, borderRadius: 16 }}
        />
      </View>
    );
  }, []);
  return (
    <Container style={[styles.container]} useSafeArea={false}>
      <Content>
        <Image
          source={Images.logo4}
          /* @ts-ignore */
          style={[styles.image, { marginTop: top + 16 }]}
        />
        <View style={styles.title}>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <Checkbox checked={checked} />
          </TouchableOpacity>
          <Text category="body" center marginLeft={16} marginTop={-2}>
            I agree to our{" "}
            <Text category="body" status="primary" onPress={handleGoTerm}>
              Terms of Service
            </Text>{" "}
            and that you have read our{" "}
            <Text category="body" status="primary" onPress={handleGoPolicy}>
              Privacy Policy{" "}
            </Text>
            .
          </Text>
        </View>
        <Button
          children="Let's Go"
          style={styles.button}
          disabled={!checked}
          onPress={login}
        />
        {/* <Carousel
          data={[
            Images.intro01,
            Images.intro02,
            Images.intro03,
            Images.intro04,
            Images.intro05,
            Images.intro06,
            Images.intro07,
            Images.intro08,
            Images.intro09,
            Images.intro10,
          ]}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          horizontal
          autoplay={true}
          loop
          autoplayDelay={10}
          loopClonesPerSide={1}
          inactiveSlideOpacity={0.6}
        /> */}
      </Content>
    </Container>
  );
});

export default Term;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    backgroundColor: "color-basic-100",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  image: {
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    flexDirection: "row",
    margin: 32,
  },
  button: {
    marginBottom: 32,
    marginHorizontal: 32,
  },
});
