import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { useTheme, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

interface Props {
  style?: StyleProp<ViewStyle>;
  level?: "1" | "2" | "3" | "4";
}
const ReactionsButton = ({ style, level }: Props) => {
  const { goBack } = useNavigation();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  return (
    <Layout style={[styles.container, style]} level={level}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Icon pack="assets" name="smile" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon pack="assets" name="haha" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon pack="assets" name="lovely" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon pack="assets" name="wow" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={goBack}>
            <Icon
              pack="assets"
              name="upload"
              style={[{ tintColor: theme["text-snow-color"], marginRight: 24 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              pack="assets"
              name="paperPlane"
              style={[{ tintColor: theme["text-snow-color"] }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default ReactionsButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    marginRight: 24,
  },
  icon: {
    marginLeft: 16,
  },
});
