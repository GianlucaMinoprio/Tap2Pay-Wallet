import React from "react";
import {
  useWindowDimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  View,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import { View_Types_Enum } from "constants/Type";
interface Props {
  image: ImageSourcePropType;
}
interface ItemProps {
  data: Props[];
  onPress?(): void;
}
const ImageList = ({ data, onPress }: ItemProps) => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const dataProvider = React.useRef(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  ).current;

  const budgetProvider = React.useMemo(() => {
    if (data.length) {
      return dataProvider.cloneWithRows(data);
    }
    return dataProvider.cloneWithRows([]);
  }, [data]);

  const layoutProvider = React.useRef(
    new LayoutProvider(
      (index) => {
        if (data.length === 1) {
          return View_Types_Enum.Full;
        } else if (index % 3 === 1) {
          return View_Types_Enum.Half;
        } else {
          return View_Types_Enum.Half;
        }
      },
      (type, dim) => {
        switch (type) {
          case View_Types_Enum.Full:
            dim.width = width;
            dim.height = 206;
            break;
          case View_Types_Enum.Half:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case View_Types_Enum.Full:
            dim.width = width;
            dim.height = 140;
            break;
          default:
            dim.width = width;
            dim.height = width;
        }
      }
    )
  ).current;

  const renderItem = React.useCallback((type, item, index) => {
    switch (type) {
      case View_Types_Enum.Full:
        return (
          <View style={styles.item}>
            <Image source={item.image} />
          </View>
        );
      case View_Types_Enum.Half:
        return (
          <View style={styles.item}>
            <Image source={item.image} />
          </View>
        );
      case View_Types_Enum.Full:
        return (
          <View style={styles.item}>
            <Image source={item.image} />
          </View>
        );
      default:
        return null;
    }
  }, []);
  return (
    <RecyclerListView
      rowRenderer={renderItem}
      dataProvider={budgetProvider}
      layoutProvider={layoutProvider}
      scrollThrottle={16}
      style={{ minHeight: 1, minWidth: 1, flex: 1 }}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    />
  );
};

export default ImageList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 2,
  },
});
