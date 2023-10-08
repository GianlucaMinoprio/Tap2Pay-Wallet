import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  useTheme,
} from "@ui-kitten/components";

import Text from "components/Text";
import NavigationAction from "components/NavigationAction";
import ProgressBar from "components/ProgressBar";

interface Props {
  id: number;
  title: string;
  book: ImageSourcePropType;
  author: string;
  des: string;
  minutes: number;
}
interface ItemProps {
  data: Props;
  onPressDownload?(): void;
  onPress?(): void;
  valueDownload?: number;
  download?: boolean;
  downloadDone?: boolean;
}

const BookDownload = ({
  data,
  onPress,
  onPressDownload,
  downloadDone,
  download,
  valueDownload,
}: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [isDownload, setIsDownload] = React.useState(download);
  React.useEffect(() => {
    downloadDone === true || valueDownload === 100
      ? setIsDownload(false)
      : null;
  }, [download, valueDownload]);
  return (
    <TouchableOpacity onPress={onPress}>
      <Layout style={styles.item} level="2">
        <Image
          source={data.book}
          /* @ts-ignore */
          style={styles.book}
        />
        <View style={styles.itemTitle}>
          <Text category="title4" status="white" marginBottom={4}>
            {data.title}
          </Text>
          <Text category="subhead" status="grey500" marginBottom={8}>
            {data.author}
          </Text>
          <Text
            category="subhead"
            status="grey300"
            marginRight={80}
            numberOfLines={2}
          >
            {data.des}
          </Text>
          <View style={[styles.time, { marginBottom: downloadDone ? 16 : 0 }]}>
            <View style={styles.status}>
              <Icon pack="assets" name="headphone" style={styles.headphone} />
              <Text category="subhead" status="white" marginLeft={8}>
                {data.minutes}mins
              </Text>
            </View>
            {downloadDone ? (
              <Icon pack="assets" name="check" style={styles.checked} />
            ) : (
              <NavigationAction
                icon="download"
                onPress={() => setIsDownload(!download)}
              />
            )}
          </View>
          {isDownload ? (
            <ProgressBar
              didDone={valueDownload ? valueDownload : 0}
              total={100}
              style={styles.progressBar}
              styleBar={styles.bar}
            />
          ) : null}
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

export default BookDownload;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    marginLeft: 19,
    marginRight: 16,
    borderRadius: 8,
    paddingTop: 16,
    paddingLeft: 16,
    marginTop: 16,
  },
  itemTitle: {
    flex: 1,
  },
  book: {
    width: 64,
    height: 86,
    marginRight: 24,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 8,
    marginTop: 12,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  headphone: {
    width: 12,
    height: 12,
    tintColor: "text-primary-color",
  },
  progressBar: {
    backgroundColor: "background-basic-color-7",
    marginRight: 16,
    marginBottom: 16,
  },
  bar: {
    backgroundColor: "color-salmon-600",
  },
  checked: {
    tintColor: "text-primary-color",
    width: 16,
    height: 16,
    marginRight: 17,
  },
});
