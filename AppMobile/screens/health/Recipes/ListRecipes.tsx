import React from "react";
import { View, FlatList } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "components/Text";
import keyExtractor from "utils/keyExtractor";
import MealRecipesItem from "./MealRecipesItem";
import { MealRecipesProps } from "./types";

interface DataProps {
  title: string;
  dataList: MealRecipesProps[];
}

const ListRecipes = ({ title, dataList }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <MealRecipesItem data={item} />;
  }, []);
  return (
    <View style={styles.container}>
      <Text category="title3" status="white" marginLeft={24} capitalize>
        {title}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

export default ListRecipes;

const themedStyles = StyleService.create({
  container: {
    marginTop: 32,
  },
  content: {
    marginTop: 24,
    paddingLeft: 24,
    paddingRight: 16,
  },
});
