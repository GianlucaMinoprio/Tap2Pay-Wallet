import React, { memo } from "react";
import {
  useWindowDimensions,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
  Button,
  Input,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Images } from "assets/images";
import Line from "components/Line";
import Carousel from "react-native-snap-carousel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ViewPhoto = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [liked, setLiked] = React.useState(false);
  const [likeNumber, setLikeNumber] = React.useState(139);
  const pressLike = React.useCallback(() => {
    setLiked(!liked);
  }, [liked]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const refCarousel = React.useRef(null);
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const wItem = width * 0.86;
  const renderItem = React.useCallback(({ item, index }) => {
    return (
      <Image
        source={item.image}
        style={{
          width: wItem,
          height: height / 1.95,
          flex: 1,
          borderRadius: 16,
        }}
      />
    );
  }, []);
  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToEnd={false}
        decelerationRate="fast"
      >
        {/* <Carousel
          data={DATA_ViewPhoto}
          layout="default"
          ref={refCarousel}
          sliderWidth={width/2}
          enableSnap={true}
          onSnapToItem={(index) => setActiveIndex(index)}
          itemWidth={wItem}
          renderItem={renderItem}
          autoplay={true}
          firstItem={activeIndex}
          autoplayDelay={600}
          autoplayInterval={3000}
          loop
          hasParallaxImages={true}
        /> */}

        <View style={styles.avatarView}>
          <View style={styles.flexRow}>
            <Avatar size="56" source={Images.toyFace1} />
            <View>
              <Text marginLeft={12} category="headline">
                {"Christine Stewart"}
              </Text>
              <Text
                category="subhead"
                status="snow"
                marginLeft={12}
                marginTop={8}
              >
                {"2 min ago"}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon
              name="menu"
              pack="assets"
              style={{ tintColor: theme["text-body-color"] }}
            />
          </TouchableOpacity>
        </View>
        <Text
          category="body"
          marginHorizontal={24}
          marginVertical={16}
          children="Non-fungible tokens (NFTs) seem to have exploded out of the ether this year."
        />
        <Line
          backgroundColor={theme["background-basic-color-2"]}
          marginHorizontal={16}
          marginBottom={18}
        />
        <View style={styles.flexRow}>
          <View
            style={[styles.flexRow, { width: width / 2.8, marginLeft: 16 }]}
          >
            <Button
              status={liked ? "info" : "transparent"}
              onPress={pressLike}
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name="like" />
              )}
              /* @ts-ignore */
              children={liked ? `${likeNumber + 1}` : `${likeNumber}`}
            />
            <Button
              status="transparent"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name="chat" />
              )}
              children="248"
            />
          </View>
          <Button
            onPress={goBack}
            status="transparent"
            accessoryLeft={(props) => (
              <Icon {...props} pack="assets" name="fire" />
            )}
          />
        </View>
        <Line
          marginHorizontal={16}
          marginTop={6}
          marginBottom={12}
          backgroundColor={theme["background-basic-color-2"]}
        />

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 24,
            marginBottom: 16,
          }}
        >
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
      </ScrollView>
      <Layout level="2" style={[styles.flexRow, { paddingBottom: bottom }]}>
        <Input
          style={{
            flex: 1,
            borderRadius: 0,
            backgroundColor: theme["background-color-basic-2"],
          }}
          placeholder="Type something..."
          status="disableFill"
          size="medium"
          accessoryRight={(props) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <Icon {...props} pack="assets" name="image" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon {...props} pack="assets" name="happyFace" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon {...props} pack="assets" name="menu" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Layout>
    </Container>
  );
});

export default ViewPhoto;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  icon: {
    width: 20,
    height: 22,
    marginRight: 3,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 18,
  },
});
export const DATA_ViewPhoto = [
  {
    id: 0,
    image: Images.rectangle1,
    aspectRatio: 1,
  },
  {
    id: 1,
    image: Images.rectangle3,
    aspectRatio: 1,
  },
  {
    id: 2,
    image: Images.rectangle2,
    aspectRatio: 1,
  },
  {
    id: 3,
    aspectRatio: 1,
    image: Images.rectangle4,
  },
  {
    id: 4,
    aspectRatio: 757 / 735,
    image: Images.rectangle4,
  },
];
