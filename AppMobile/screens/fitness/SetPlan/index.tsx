import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import Text from "components/Text";
import Container from "components/Container";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Line from "components/Line";
import useLayout from "hooks/useLayout";

const SetPlan = memo(() => {
  const { goBack } = useNavigation();
  const { bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [focusDistance, setFocusDistance] = React.useState(false);
  const [focusTime, setFocusTime] = React.useState(false);
  const [focusStep, setFocusStep] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distance: "8.5",
      time: "90",
      step: "15",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={
          <Text
            uppercase
            category="caption1"
            status="primary"
            onPress={goBack}
            marginRight={16}
            children="skip"
          />
        }
      />
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={20}>
        <Text
          marginLeft={40}
          category="title1"
          status="white"
          marginBottom={10}
        >
          Set Running{"\n"}Goals
        </Text>
        <Text
          marginLeft={40}
          category="body"
          status="placeholder"
          marginBottom={46}
        >
          Define your goal and try to accomplish it!
        </Text>
        <Text marginLeft={40} status="success" category="title4">
          Distance
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              accessoryRight={() => <Text children="km" category="title4" />}
              onChangeText={onChange}
              onBlur={() => setFocusDistance(false)}
              onFocus={() => setFocusDistance(true)}
              value={value}
              onChange={onChange}
              keyboardType="numeric"
              size="giant"
              style={styles.input}
            />
          )}
          name="distance"
        />
        <Line
          backgroundColor={
            focusDistance
              ? theme["text-white-color"]
              : theme["background-basic-color-2"]
          }
          marginHorizontal={40}
          marginTop={-12}
        />
        <Text marginLeft={40} marginTop={32} status="success" category="title4">
          Time
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              accessoryRight={() => (
                <Text children="minute" category="title4" />
              )}
              onChangeText={onChange}
              value={value}
              onBlur={() => setFocusTime(false)}
              onFocus={() => setFocusTime(true)}
              keyboardType="numeric"
              size="giant"
              style={styles.input}
            />
          )}
          name="time"
        />
        <Line
          backgroundColor={
            focusTime
              ? theme["text-white-color"]
              : theme["background-basic-color-2"]
          }
          marginHorizontal={40}
          marginTop={-12}
        />
        <Text marginLeft={40} marginTop={32} status="success" category="title4">
          Step
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              onChangeText={onChange}
              onBlur={() => setFocusStep(false)}
              onFocus={() => setFocusStep(true)}
              value={value}
              keyboardType="numeric"
              size="giant"
              style={styles.input}
            />
          )}
          name="step"
        />
        <Line
          backgroundColor={
            focusStep
              ? theme["text-white-color"]
              : theme["background-basic-color-2"]
          }
          marginHorizontal={40}
          marginTop={-12}
        />
      </KeyboardAwareScrollView>
      <Button
        children="SETUP GOAL"
        style={[
          styles.btnBottom,
          {
            marginBottom: bottom + 26,
          },
        ]}
      />
    </Container>
  );
});

export default SetPlan;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    marginLeft: 32,
    marginRight: 40,
  },
  btnBottom: {
    marginHorizontal: 40,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
