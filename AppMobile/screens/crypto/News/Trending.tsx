import React, { memo, useCallback } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import {
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";

import Content from "components/Content";
import NewItem, { NewProps } from "./NewItem";
import { isEmpty } from "lodash";
import AnimatedAppearance from "components/AnimatedAppearance";
import Text from "components/Text";
import { Images } from "assets/images";
import LoadingIndicator from "components/LoadingIndicator";
import useLayout from "hooks/useLayout";
import LitterNew from "../Component/LitterNew";

interface Props {
  data: NewProps[];
}

const Trending = memo(({ data }: Props) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onPress = React.useCallback((i) => {
    setSelectedIndex(i);
  }, []);
  const RenderPage = useCallback(() => {
    return (
      <>
        {DATA_ETH.map((item, i) => {
          return <LitterNew item={item} key={i} />;
        })}
      </>
    );
  }, []);
  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        <Content contentContainerStyle={styles.content} horizontal>
          {isEmpty(data)
            ? null
            : data.map((item, i) => {
                return (
                  <NewItem item={item} key={i} onPress={() => onPress(i)} />
                );
              })}
        </Content>
        <View style={styles.title}>
          <View style={styles.coin}>
            <Layout level={"5"} style={styles.icon}>
              <Icon pack="assets" name={data[selectedIndex].icon} style={{}} />
            </Layout>
            <Text category="headline" marginLeft={8}>
              {data[selectedIndex].coin}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.54}>
            <Text category="subhead" status={"primary"}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <RenderPage />
      </View>
    </AnimatedAppearance>
  );
});

export default Trending;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    paddingLeft: 24,
    marginBottom: 32,
  },
  coin: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
const DATA_ETH = [
  {
    id: 0,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection3,
  },
  {
    id: 1,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection2,
  },
  {
    id: 2,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection1,
  },
];
