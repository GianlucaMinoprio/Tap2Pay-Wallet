import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, TopNavigation, useTheme } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import AnimatedStep from "components/AnimatedStep";
import NavigationAction from "components/NavigationAction";
import { SceneMap, TabView } from "react-native-tab-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useLayout from "hooks/useLayout";

const CreateNewProfile = memo(() => {
  const { goBack } = useNavigation();
  const theme = useTheme();
  const { width, bottom } = useLayout();
  const [index, setIndex] = React.useState<number>(0);

  const Tab1 = React.useCallback(() => {
    return (
      <KeyboardAwareScrollView style={styles.content} enableOnAndroid showsVerticalScrollIndicator={false}>
        <Text category="title3" center marginBottom={32}>
          Create a Profile
        </Text>
        <View style={styles.layout}>
          <Input style={styles.input01} placeholder="First name" />
          <Input style={styles.flex1} placeholder="Last name" />
        </View>
        <View style={styles.flexRow}>
          <Input style={styles.input01} placeholder="Gender" />
          <Input style={styles.flex1} placeholder="Your age" />
        </View>
        <Input style={styles.inputPhone} placeholder="Phone number" />
        <Input placeholder="Your Address" />
        <Button
          children="NEXT STEP"
          style={styles.button}
          onPress={() => setIndex(index + 1)}
        />
      </KeyboardAwareScrollView>
    );
  }, [index]);
  const Tab2 = React.useCallback(() => {
    return (
      <View>
        <Text>Step 02.</Text>
        <Button
          children="NEXT STEP"
          style={styles.button}
          onPress={() => setIndex(index + 1)}
        />
      </View>
    );
  }, [index]);
  const Tab3 = React.useCallback(() => {
    return (
      <View>
        <Text>Step 03.</Text>
        <Button
          children="NEXT STEP"
          style={styles.button}
          onPress={() => setIndex(index + 1)}
        />
      </View>
    );
  }, [index]);
  const Tab4 = React.useCallback(() => {
    return (
      <View>
        <Text>Step 04.</Text>
        <Button children="Go to Home !" style={styles.button} />
      </View>
    );
  }, [index]);

  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
    third: Tab3,
    four: Tab4,
  });
  const [routes] = React.useState([
    { key: "first", title: "" },
    { key: "second", title: "" },
    { key: "third", title: "" },
    { key: "four", title: "" },
  ]);
  return (
    <Container useSafeArea>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={() => {
          return <NavigationAction icon={"cancel"} status="primary" />;
        }}
      />
      <AnimatedStep style={styles.animatedStep} step={index} />
      <Text
        category="call-out"
        center
        marginTop={39}
        status="placeholder"
        marginBottom={8}
      >
        Step 0{index + 1}.
      </Text>
      <TabView
        showPageIndicator
        lazy
        lazyPreloadDistance={2000}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        style={styles.container}
        transitionStyle="scroll"
        renderTabBar={() => null}
      />
      <View
        style={[
          styles.bottom,
          {
            paddingBottom: bottom + 16,
          },
        ]}
      >
        <Text
          children="SKIP! Go to Home"
          category="title4"
          status="primary"
          center
          onPress={goBack}
        />
      </View>
    </Container>
  );
});

export default CreateNewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  topNav: {
    marginHorizontal: 12,
  },
  input01: {
    flex: 1,
    marginRight: 16,
  },
  inputPhone: {
    marginVertical: 20,
  },
  content: {
    marginHorizontal: 24,
  },
  flexRow: {
    flexDirection: "row",
  },
  animatedStep: {
    marginTop: 28,
  },
  layout: {
    flexDirection: "row",
    marginBottom: 24,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 12,
  },
});
