import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import Line from "./Line";
import ReactionsButton from "./ReactionsButton";
import ProgressBar from "./ProgressBar";

interface Props {
  id: number;
  image: ImageSourcePropType;
  currency: string;
  title: string;
  date: string;
  total: number;
  didDonate: number;
}
interface ExploreItemProps {
  item: Props;
  onPress?(): void;
}
const ExploreItem = memo(({ item, onPress }: ExploreItemProps) => {
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const percentNumber = (item.didDonate / item.total) * 100;
  return (
    <Layout style={styles.container}>
      <Image
        source={item.image}
        style={{
          width: width - 32,
          alignSelf: "center",
          borderRadius: 8,
          height: height * 0.25,
        }}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={{
            backgroundColor: theme["background-basic-color-2"],
            borderRadius: 16,
          }}
        >
          <Text
            children={item.currency}
            status="placeholder"
            marginVertical={4}
            marginHorizontal={8}
            category="caption1"
          />
        </TouchableOpacity>
        <Text category="headline" status="placeholder" children={item.date} />
      </View>
      <Text
        category="body"
        children={item.title}
        marginHorizontal={24}
        marginBottom={16}
      />
      <ProgressBar
        didDone={item.didDonate}
        total={item.total}
        style={styles.progressBar}
      />
      <View style={styles.donateView}>
        <Button
          status="transparent"
          accessoryLeft={<Icon pack="assets" name="fire" />}
          children={
            <Text
              category="headline"
              children={`${item.didDonate} of ${item.total}`}
            />
          }
        />
        <Text
          status="snow"
          category="headline"
          children={`${percentNumber.toFixed(2)}%`}
        />
      </View>
      <Line
        backgroundColor={theme["background-basic-color-2"]}
        marginHorizontal={24}
        marginBottom={12}
        marginTop={16}
      />
      <View style={styles.emoji}>
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
        <Text
          children="You and 138 others"
          status="snow"
          category="headline"
          marginLeft={5}
        />
      </View>
      <Button
        children="Donate Now"
        style={{ marginHorizontal: 24, marginBottom: 24 }}
      />
      <Line
        backgroundColor={theme["background-basic-color-2"]}
        marginBottom={24}
      />
    </Layout>
  );
});

export default ExploreItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emoji: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  donateView: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBar: {
    marginHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 22,
    marginRight: 3,
  },
});
