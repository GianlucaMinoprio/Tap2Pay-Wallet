import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import AppContainer from "./navigation/AppContainer";
import * as eva from "@eva-design/eva";
import { default as darkTheme } from "constants/theme/dark.json";
import { default as lightTheme } from "constants/theme/light.json";
import { default as customTheme } from "constants/theme/appTheme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as customMapping } from "./constants/theme/mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AssetIconsPack from "assets/AssetIconsPack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "./ThemeContext";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);
// import { patchFlatListProps } from "react-native-web-refresh-control";

// patchFlatListProps();

export default function App() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((value) => {
      if (value === "light" || value === "dark") setTheme(value);
    });
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    AsyncStorage.setItem("theme", nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
          <ApplicationProvider
            {...eva}
            theme={
              theme === "light"
                ? { ...eva.light, ...customTheme, ...lightTheme }
                : { ...eva.dark, ...customTheme, ...darkTheme }
            }
            /* @ts-ignore */
            customMapping={customMapping}
          >
            <SafeAreaProvider>
              <StatusBar
                style={theme === "light" ? "dark" : "light"}
                translucent={true}
                backgroundColor={"#00000000"}
              />
              <AppContainer />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    );
  }
}
