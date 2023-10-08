import React from "react";
import { Keyboard, Platform, View, ViewProps } from "react-native";

interface HideWithKeyboardProps extends ViewProps {
  children: React.ReactElement<any, any> | null;
}
const HideWithKeyboard = ({ children, ...props }: HideWithKeyboardProps) => {
  const [keyboard, setKeyboard] = React.useState<boolean>(false);

  React.useEffect(() => {
    Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      keyboardShow
    );
    Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      keyboardHide
    );

    return () => {
      Keyboard.removeListener(
        Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
        keyboardShow
      );
      Keyboard.removeListener(
        Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
        keyboardHide
      );
    };
  }, []);

  const keyboardShow = () => {
    setKeyboard(true);
  };

  const keyboardHide = () => {
    setKeyboard(false);
  };

  return keyboard ? <View /> : <View {...props}>{children}</View>;
};

export default HideWithKeyboard;
