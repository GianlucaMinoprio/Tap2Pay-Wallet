import React, { memo } from "react";
import {
  useWindowDimensions,
  View,
  Image,
  FlatList,
  Animated,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import NavigationAction from "components/NavigationAction";
import NewFeedList from "./NewFeedList";
import { DATA_HOME } from "./NewFeed";
import { Images } from "assets/images";

const SendPhotoVoice = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const VISIBLE_ITEMS = DATA_Share.length;
  const ITEM_WIDTH = width * 0.9;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
  const [data, setData] = React.useState(DATA_Share);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryRight={<NavigationAction marginRight={8} />} />
      <Text marginLeft={16} marginBottom={16} category="title2">
        Share with friend
      </Text>
      <NewFeedList data={DATA_HOME} level="1" />

      <FlingGestureHandler
        key="right"
        direction={Directions.UP}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="bottom"
          direction={Directions.DOWN}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={styles.flatList}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [60, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / 2, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateY: translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Layout
                    style={[{ zIndex: data.length - index + 1 }, styles.photos]}
                    level="4"
                  >
                    <Text
                      marginVertical={4}
                      marginHorizontal={8}
                      category="caption1"
                    >{`${data.length} Photos`}</Text>
                  </Layout>
                  <Image
                    source={item.image}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          {/* </View> */}
        </FlingGestureHandler>
      </FlingGestureHandler>
      <Button size="large" children="Share Now" style={styles.btn} />
    </Container>
  );
});

export default SendPhotoVoice;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  photos: {
    top: 16,
    right: 16,
    borderRadius: 16,
    alignItems: "center",
    position: "absolute",
  },
  btn: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  flatList: {
    flex: 1,
    justifyContent: "center",
    marginTop: 24,
  },
});
const DATA_Share = [
  {
    id: 0,
    name: "Image 01",
    image: Images.rectangle1,
    date: 1631186795000,
  },
  {
    id: 1,
    name: "Image 02",
    image: Images.rectangle3,
    date: 1631186795000,
  },
  {
    id: 2,
    name: "Image 03",
    image: Images.rectangle2,
    date: 1631186795000,
  },
  {
    id: 3,
    name: "Image 03",
    image: Images.rectangle2,
    date: 1631186795000,
  },
  {
    id: 4,
    name: "Image 03",
    image: Images.rectangle2,
    date: 1631186795000,
  },
];
