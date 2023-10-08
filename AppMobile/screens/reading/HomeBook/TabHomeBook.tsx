import React, { memo } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";

import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";
import { BookProps } from "./type";
import BookItem from "./BookItem";

interface ItemProps {
  index: number;
  data: BookProps[];
}

const TabHomeBook = memo(({ index, data }: ItemProps) => {
  const theme = useTheme();
  const [bookMark, setBookMark] = React.useState(false);

  const styles = useStyleSheet(themedStyles);
  let DATA_FirstItem = data[0];
  let DATA_TAB = data.slice(1, -1);
  const renderItem = React.useCallback(({ item }) => {
    return <BookItem item={item} />;
  }, []);
  return (
    <AnimatedAppearance index={index}>
      <View>
        <Layout style={styles.layout}>
          <Layout
            style={[
              { backgroundColor: theme["color-radical-700"] },
              styles.redLayout,
            ]}
          >
            <Image source={DATA_FirstItem.image} />
          </Layout>
          <View style={styles.titleView}>
            <View>
              <Text
                children={DATA_FirstItem.title}
                category="title4"
                status="white"
              />
              <Text
                children={DATA_FirstItem.author}
                category="subhead"
                status="grey500"
              />
            </View>
            <View style={styles.time}>
              <View style={styles.headPhone}>
                <Icon pack="assets" name="headphone" style={styles.icon} />
                <Text category="subhead" status="white" marginLeft={8}>
                  {DATA_FirstItem.time}mins
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
                      : theme["text-grey-500"],
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Layout>

        <FlatList
          data={DATA_TAB}
          renderItem={renderItem}
          scrollEventThrottle={16}
          horizontal={false}
          numColumns={2}
          keyExtractor={(i, _) => i.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </AnimatedAppearance>
  );
});

export default TabHomeBook;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },

  layout: {
    borderColor: "color-salmon-100",
    borderWidth: 1,
    paddingTop: 17,
    paddingBottom: 18,
    paddingLeft: 16,
    flexDirection: "row",
    borderRadius: 8,
    marginLeft: 19,
    marginRight: 16,
  },
  content: {
  },
  redLayout: {
    paddingTop: 36,
    borderRadius: 4,
    marginRight: 16,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginRight: 24,
  },
  book: {
    width: 64,
    marginRight: 24,
    height: 86,
  },
  headPhone: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "text-primary-color",
  },
  titleView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
