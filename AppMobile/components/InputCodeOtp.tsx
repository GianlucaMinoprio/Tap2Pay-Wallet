import React, { useCallback, Dispatch, SetStateAction, useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import Text from "components/Text";
import { Images } from "assets/images";
import fillNumberLength from "utils/fillNumberLength";
import { Input, useTheme } from "@ui-kitten/components";
interface InputCodeOtpProps {
  style?: ViewStyle;
  codeLength?: number;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  autoFocus?: boolean;
}

const InputCodeOtp = ({
  style,
  codeLength = 5,
  code = "*",
  autoFocus,
  setCode,
}: InputCodeOtpProps) => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const _code = fillNumberLength(code, codeLength);
  const inputRef: any = useRef();
  const renderInputBox = useCallback(() => {
    let arrBox = [];
    for (let i = 0; i < _code.length; i++) {
      arrBox.push(
        <View
          key={i.toString()}
          style={[
            {
              backgroundColor:
                _code.charAt(i) !== "*"
                  ? theme["background-basic-color-4"]
                  : theme["background-basic-color-2"],
            },
            styles.box,
            i !== codeLength - 1 && styles.space,
            _code.charAt(i) !== "1" && styles.alreadyEnter,
          ]}
        >
          {_code.charAt(i) !== "" && (
            <Text
              status={_code.charAt(i) !== "*" ? "basic" : "placeholder"}
              center
              category='headline'
            >
              {_code.charAt(i)}
            </Text>
          )}
        </View>
      );
    }
    return arrBox;
  }, [_code]);

  const onPressInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const onChangeText = useCallback(
    (text: string) => {
      let _text = text;
      if (text.length > codeLength) {
        _text = text.substring(0, codeLength);
      }
      setCode(_text);
    },
    [codeLength]
  );
  React.useEffect(() => {
    if (code.length === codeLength) {
      Keyboard.dismiss();
    }
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, style]}
      onPress={onPressInput}
    >
      {renderInputBox()}
      <Input
        keyboardType="numeric"
        returnKeyType="done"
        autoFocus={autoFocus}
        value={code}
        onChangeText={onChangeText}
        style={[styles.fakeInput, { right: -width * 2 }]}
        maxLength={codeLength}
        ref={inputRef}
      />
    </TouchableOpacity>
  );
};

export default InputCodeOtp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    marginRight: 16,
  },
  iconAccept: {
    position: "absolute",
    right: -32,
    width: 24,
    height: 24,
  },
  fakeInput: {
    position: "absolute",
  },
  alreadyEnter: {},
});
