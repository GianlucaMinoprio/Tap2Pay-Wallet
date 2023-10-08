import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageRequireSource,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  title: string;
  list: ImageRequireSource[];
  onPress?(): void;
}

const ItemBookMark = ({ onPress, title, list }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Layout style={styles.container} level="2">
        <View>
          <View>
            <Text category="title4" status="white">
              {title}
            </Text>
            <Text category="subhead" status="grey500">
              {list.length} Books
            </Text>
          </View>
          {list.length <= 4 ? (
            <View style={styles.list}>
              {list.map((item, index) => {
                return (
                  <Image
                    source={item}
                    /* @ts-ignore */
                    style={styles.book}
                    key={index}
                  />
                );
              })}
            </View>
          ) : (
            <View style={styles.list}>
              <Image
                source={list[1]}
                /* @ts-ignore */
                style={styles.book}
              />
              <Image
                source={list[2]}
                /* @ts-ignore */
                style={styles.book}
              />
              <Image
                source={list[3]}
                /* @ts-ignore */
                style={styles.book}
              />
              <View>
                <Layout level="4" style={styles.layout}>
                  <Text category="subhead" status="white" center>
                    +{list.length - 4}
                  </Text>
                </Layout>
                <Image
                  source={list[4]}
                  /* @ts-ignore */
                  style={styles.book}
                />
              </View>
            </View>
          )}
        </View>
        <Icon pack="assets" name="arrowRight16" style={styles.arrow} />
      </Layout>
    </TouchableOpacity>
  );
};

export default ItemBookMark;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "background-basic-color-7",
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  book: {
    width: 48,
    height: 64,
    marginRight: 16,
    justifyContent: "center",
    borderRadius: 4,
  },
  layout: {
    width: 48,
    height: 63,
    marginRight: 16,
    justifyContent: "center",
    borderRadius: 4,
    position: "absolute",
    zIndex: 10,
    bottom: 1,
    right: 1,
  },
  list: {
    marginTop: 16,
    flexDirection: "row",
  },
  arrow: {
    tintColor: "icon-basic-color",
    width: 16,
    height: 16,
    marginTop: 16,
  },
});
