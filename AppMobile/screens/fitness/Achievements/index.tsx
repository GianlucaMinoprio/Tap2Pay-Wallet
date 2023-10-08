import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import ItemAchievements from "./ItemAchievements";

const Achievements = memo(() => {
  const { width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <ItemAchievements item={item} />;
  }, []);
  return (
    <Container style={styles.container}>
      <Layout level="4" style={[styles.header, { paddingTop: top - 12 }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction marginLeft={4} icon="leftArrow" />}
          accessoryRight={<NavigationAction marginRight={4} icon="crown" />}
        />
        <Text category="title2" status="white" marginLeft={16} marginBottom={8}>
          Achievements
        </Text>
      </Layout>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.level}>
            <Image source={Images.achievements} />
            <Text category="title3" marginLeft={16}>
              Level 01
            </Text>
          </View>
        )}
        keyExtractor={(i, _) => i.id.toString()}
        renderItem={renderItem}
        horizontal={false}
        numColumns={3}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
      />
    </Container>
  );
});

export default Achievements;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {},
  level: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 16,
  },
  content: {
    justifyContent: "space-between",
    marginHorizontal: 32,
  },
});
const data = [
  { id: 0, title: "1 km", image: Images.achievements1km, isPass: true },
  { id: 1, title: "5 km", image: Images.achievements5km, isPass: true },
  { id: 2, title: "15 km", image: Images.achievements15km, isPass: true },
  { id: 3, title: "21 km", image: Images.achievements21km },
  { id: 4, title: "40 km", image: Images.achievements40km },
  { id: 5, title: "80 km", image: Images.achievements80km },
  { id: 6, title: "150 km", image: Images.achievements150km },
  { id: 7, title: "3 days", image: Images.achievements3days },
  { id: 8, title: "7 days", image: Images.achievements7days },
  { id: 9, title: "15 days", image: Images.achievements15days },
  { id: 10, title: "30 days", image: Images.achievements30days },
  { id: 11, title: "66 days", image: Images.achievements66days },
  { id: 12, title: "100 days", image: Images.achievements100days },
];
