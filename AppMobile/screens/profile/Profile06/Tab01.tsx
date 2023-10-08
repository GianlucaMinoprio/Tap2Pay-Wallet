import React, { memo } from "react";
import { View, Image, FlatList, ImageSourcePropType } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  image: ImageSourcePropType;
}
interface TabProps {
  data: Props[];
}

const Tab01 = memo(({ data }: TabProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ width: width / 3, height: width / 3 }}
        />
      </View>
    );
  }, []);
  return (
    <FlatList
      data={data}
      scrollEnabled={true}
      renderItem={renderItem}
      indicatorStyle={"white"}
      keyExtractor={(i, _) => _.toString()}
      scrollEventThrottle={16}
      numColumns={3}
      style={styles.container}
    />
  );
});

export default Tab01;

const themedStyles = StyleService.create({
  container: {
    flexWrap: "wrap",
  },
});
