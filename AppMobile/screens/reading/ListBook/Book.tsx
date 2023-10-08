import React, { memo } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  id: number;
  image: ImageSourcePropType;
  title: string;
  time: number;
}
interface DataProps {
  data: Props;
}

const Book = memo(({ data }: DataProps) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [bookMark, setBookMark] = React.useState(false);
  return (
    <View style={[styles.container, { width: (width - 56) / 2 }]}>
      <Image
        source={data.image}
        /* @ts-ignore */
        style={styles.image}
      />
      <Text children={data.title} marginTop={16} />
      <View style={styles.des}>
        <Text
          marginTop={4}
          category="subhead"
          status="snow"
        >{`${data.time} mins`}</Text>
        <Button
          size="tiny"
          onPress={() => setBookMark(!bookMark)}
          status={bookMark ? "info" : "transparent"}
          accessoryRight={<Icon name="bookmark" pack="assets" />}
        />
      </View>
    </View>
  );
});

export default Book;

const themedStyles = StyleService.create({
  container: {
    marginLeft: 16,
    marginTop: 24,
  },
  image: {
    marginLeft: 24,
  },
  des: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
