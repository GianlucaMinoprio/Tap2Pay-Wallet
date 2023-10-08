import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  title: string;
  author: string;
  onPress?(): void;
  image: ImageSourcePropType;
}

const BookItem = ({ title, author, onPress, image }: Props) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onPress} style={[{ width: width - 32 }]}>
      <Layout level="2" style={styles.container}>
        <View style={styles.left}>
          <Image
            source={image}
            /* @ts-ignore */
            style={styles.book}
          />
          <View>
            <Text
              children={title}
              category="title4"
              status="white"
              marginBottom={4}
            />
            <Text children={author} category="subhead" status="grey500" />
          </View>
        </View>
        <Icon pack="assets" name="arrowRight16" style={styles.arrow} />
      </Layout>
    </TouchableOpacity>
  );
};

export default BookItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 20,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "background-basic-color-5",
    marginLeft: -8,
    marginRight: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  book: {
    height: 64,
    width: 48,
    marginRight: 16,
  },
  arrow: {
    tintColor: "icon-basic-color",
    width: 16,
    height: 16,
  },
});
