import React, { memo } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";

const ConditionHeatMap = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [state, setstate] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <Container style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={state}
        style={[StyleSheet.absoluteFill, { opacity: 0.25 }]}
      />
      <NavigationAction marginRight={4} style={[styles.goBack, { top: top }]} />
      <ScrollView style={[{ paddingTop: top }, styles.content]}>
        <Image source={Images.sally5} style={{ marginTop: -top }} />
        <View style={styles.timeLocal}>
          <Text category="subhead" status="white" marginRight={6} center>
            Today, {dayjs().format("MM/DD/YYYY")}
          </Text>
          <Text status="success" category="caption1" center marginTop={2}>
            (AVG: 80m/s)
          </Text>
        </View>
        <View style={styles.didRun}>
          <Text status="white" category="extra-1" center>
            2.45
          </Text>
          <Text
            category="subhead"
            status="grey500"
            marginLeft={8}
            marginTop={46}
            children="Km"
          />
        </View>
        <View style={styles.stepNTime}>
          <View>
            <Text category="header" status="white" children="3,246" />
            <Text
              children="Step"
              category="body"
              status="grey500"
              marginTop={-2}
            />
          </View>
          <View>
            <Text category="header" status="white" children="10:25" />
            <Text children="Time" category="body" status="grey500" />
          </View>
        </View>
        <Image
          source={Images.vector1}
          /* @ts-ignore */
          style={styles.vector}
        />
      </ScrollView>
      <Button
        children="Share Now"
        style={[styles.share, { marginBottom: bottom + 26 }]}
        onPress={goBack}
      />
    </Container>
  );
});

export default ConditionHeatMap;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  content: {},
  timeLocal: {
    flexDirection: "row",
    marginTop: 16,
    marginHorizontal: 34,
  },
  stepNTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    marginHorizontal: 34,
  },
  vector: {
    alignSelf: "center",
    marginTop: 60,
  },
  goBack: {
    position: "absolute",
    right: 0,
    zIndex: 10,
  },
  didRun: {
    flexDirection: "row",
    marginHorizontal: 34,
  },
  share: {
    marginLeft: 40,
    marginRight: 44,
  },
});
