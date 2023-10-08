import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { BookProps } from "./type";

interface Props {
  item: BookProps;
}

const BookItem = memo(({ item }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [isBookMark, setIsBookMark] = React.useState(false);

  return (
    <View style={[styles.item, { width: (width - 56) / 2 }]}>
      <Image
        source={item.image}
        /* @ts-ignore */
        style={styles.image}
      />
      <Text children={item.title} marginTop={16} />
      <View style={styles.des}>
        <Text
          marginTop={4}
          category="subhead"
          status="snow"
        >{`${item.time} mins`}</Text>
        <Button
          size="tiny"
          status="transparent"
          onPress={() => setIsBookMark(!isBookMark)}
          activeOpacity={0.7}
          accessoryRight={() => (
            <Icon
              name="bookmark"
              pack="assets"
              style={{
                tintColor: isBookMark
                  ? theme["text-primary-color"]
                  : theme["text-grey-500"],
                width: 16,
                height: 16,
              }}
            />
          )}
        />
      </View>
    </View>
  );
});

export default BookItem;

const themedStyles = StyleService.create({
  item: {
    marginTop: 24,
    marginLeft: 16,
  },
  image: {
    marginLeft: 24,
  },
  des: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
