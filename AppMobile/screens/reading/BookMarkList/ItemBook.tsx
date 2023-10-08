import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  useTheme,
} from "@ui-kitten/components";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  minutes: number;
  book: ImageSourcePropType;
  title: string;
  author: string;
}
interface ItemProps {
  data: Props;
  onPress?(): void;
}
const ItemBook = ({ data, onPress }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const [bookMark, setBookMark] = React.useState(false);
  const { width } = useLayout();
  const theme = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Layout level="2" style={[styles.container]}>
        <Image
          source={data.book}
          /* @ts-ignore */
          style={styles.book}
        />
        <View style={styles.content}>
          <Text
            children={data.title}
            status="white"
            category="title4"
            marginBottom={4}
          />
          <Text children={data.author} status="grey500" category="subhead" />
          <View style={styles.time}>
            <View style={styles.headPhone}>
              <Icon pack="assets" name="headphone" style={styles.icon} />
              <Text category="subhead" status="white" marginLeft={8}>
                {data.minutes}mins
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setBookMark(!bookMark)}
              activeOpacity={0.7}
            >
              <Icon
                pack="assets"
                name="bookmark"
                style={{
                  tintColor: bookMark
                    ? theme["text-primary-color"]
                    : theme["text-white-color"],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

export default ItemBook;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    borderColor: "color-basic-1500",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 24,
  },
  content: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "text-primary-color",
  },
  clock: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 16,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  book: {
    width: 64,
    marginRight: 24,
    height: 86,
  },
  headPhone: {
    flexDirection: "row",
  },
});
