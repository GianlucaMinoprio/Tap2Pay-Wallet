import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import NavigationAction from "components/NavigationAction";
import Handle from "./Handle";
import { toRad } from "react-native-redash";

import { Images } from "assets/images";

const OrderTracking = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [invisible, setInvisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const snapPoints = React.useMemo(() => ["27%", height - top], []);
  const [playPause, setPlayPause] = React.useState(false);
  const handleSheetChanges = React.useCallback(
    (index: number) => {
      setIndex(index);
      setInvisible(invisible);
      bottomSheetRef.current?.snapToIndex(index);
    },
    [index, invisible]
  );
  const pressPlayPause = React.useCallback(() => {
    if (playPause) {
      return setPlayPause(false);
    } else {
      return setPlayPause(true);
    }
  }, [playPause]);
  React.useEffect(() => {
    if (index === 0) {
      return setInvisible(true);
    } else {
      return setInvisible(false);
    }
  }, [index, invisible]);

  return (
    <Container style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={() => null}
        handleStyle={styles.handleStyle}
        handleComponent={(props) => (
          <Handle
            {...props}
            onPress={() => {
              if (index === 1) {
                return bottomSheetRef.current?.snapToIndex(0);
              } else {
                return bottomSheetRef.current?.snapToIndex(1);
              }
            }}
          />
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: theme["background-basic-color-2"] }}
          contentContainerStyle={{
            paddingBottom: bottom + 180,
            backgroundColor: theme["background-basic-color-2"],
          }}
        >
          <Layout style={[styles.contentContainer]} level="2">
            <Text category="title1" status="white">
              Metmoi is big dark ui kit with 120+ screen for ios screen
            </Text>
            <View style={styles.description}>
              <Layout style={styles.line} />
              <Text category="body" status="snow" marginLeft={16}>
                The author, vice chairman of Ogilvy, shares why what’s
                irrational often works better than what’s considered to be
                rational.
              </Text>
            </View>
            <Text category="body" status="snow" marginBottom={16}>
              The author, vice chairman of Ogilvy, shares why what’s irrational
              often works better than what’s considered to be rational. Rory
              explains we take some actions based on a psychological rather than
              logical level. As marketers, we should appeal to this irrational
              side of our thinking
            </Text>
            <Layout level="4" style={[{ width: width - 48 }, styles.layout]}>
              <Text category="body" status="snow">
                As marketers, we should appeal to this irrational side of our
                thinking and try what seems to be counterintuitive.
              </Text>
            </Layout>
          </Layout>
        </BottomSheetScrollView>
      </BottomSheet>
      <Layout style={[styles.bottom, { paddingBottom: bottom }]} level="1">
        <View style={styles.control}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={Images.book1}
              /* @ts-ignore */
              style={styles.book}
            />
            <View>
              <Text category="headline" status="white">
                The wolrd, your life
              </Text>
              <Text category="caption1" status="grey500" marginTop={4}>
                June Cook
              </Text>
            </View>
          </View>
          <Button
            size="32"
            status="control"
            onPress={pressPlayPause}
            style={styles.playPause}
            accessoryRight={
              <Icon pack="assets" name={playPause ? "pause" : "play"} />
            }
          />
        </View>
        <Layout style={styles.bottomTab}>
          <NavigationAction icon="notification" />
          <Image
            source={Images.logo4}
            /* @ts-ignore */
            style={styles.logo}
          />
          <NavigationAction icon="book" />
        </Layout>
      </Layout>
    </Container>
  );
});

export default OrderTracking;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  line: {
    height: 72,
    width: 4,
    backgroundColor: "color-salmon-600",
    borderRadius: 8,
  },
  description: {
    flexDirection: "row",
    marginLeft: 0,
    marginVertical: 24,
  },
  layout: {
    borderRadius: 8,
    padding: 16,
  },
  book: {
    width: 32,
    height: 43,
    marginRight: 12,
  },
  playPause: {
    width: 32,
    height: 32,
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 48,
  },
  logo: {
    width: 28,
    height: 28,
  },
  handleStyle: {
    backgroundColor: "background-basic-color-2",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
