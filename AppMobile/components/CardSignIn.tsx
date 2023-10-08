import React from "react";
import {
  useWindowDimensions,
  Image,
  ImageURISource,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
interface Props {
  id: number;
  image: ImageURISource | ImageURISource[] | ImageRequireSource;
  title: string;
}
interface SignIn01Props {
  item: Props;
  onPress?(): void;
}
const CardSignIn = ({ item, onPress }: SignIn01Props) => {
  const { height, width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout level="2" style={styles.container}>
      <TouchableOpacity
        style={{
          width: (width - 63) / 2,
          height: (width - 63) / 2,
          justifyContent: "center",
        }}
      >
        <Image
          source={item.image}
          /* @ts-ignore */
          style={styles.image}
        />
        <Text marginHorizontal={16} marginTop={22}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default CardSignIn;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    margin: 8,
  },
  image: {
    marginLeft: 16,
  },
});
