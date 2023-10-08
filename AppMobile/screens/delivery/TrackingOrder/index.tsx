import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import CustomPin from "./CustomPin";
import StartPin from "./StartPin";
import FooterTracking from "./FooterTracking";
import { Images } from "assets/images";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";
import useToggle from "hooks/useToggle";

const TrackingOrder = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { bottom, height } = useLayout();
  const refMap = React.useRef<MapView | null>(null);

  const startLocation = { latitude: 37.7733358, longitude: -122.4161628 };
  const myLocation = { latitude: 37.7583358, longitude: -122.4262328 };
  const destination = {
    latitude: 37.7727554036838,
    longitude: -122.40456238389014,
  };
  const endLocation = { latitude: 37.7583358, longitude: -122.4425687 };

  const [showMore, setShowMore] = useToggle(false);

  const progress = useDerivedValue(() => {
    return showMore ? withSpring(1) : withTiming(0);
  }, [showMore]);

  const styleBottom = useAnimatedStyle(() => {
    const heighBtn = interpolate(
      progress.value,
      [0, 1],
      [height / 1.5, height / 3],
      Extrapolate.EXTEND
    );
    return {
      position: "absolute",
      bottom: -heighBtn,
    };
  }, [progress.value]);

  const _onMore = () => {
    setShowMore();
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        appearance={"control"}
        title="Order Tracking"
        accessoryRight={<NavigationAction icon="menu" />}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={{
          latitude: 37.7583358,
          longitude: -122.4262328,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0531,
        }}
        onPress={(e) => console.log(e.nativeEvent.coordinate)}
        customMapStyle={customMapStyle}
      >
        <Polyline
          coordinates={[endLocation, myLocation, startLocation, destination]}
          strokeColor="#F0DF67"
          strokeWidth={2}
          lineDashPattern={[10, 40, 70]}
        />
        <StartPin coordinate={endLocation} />
        <CustomPin icon="shop" coordinate={destination} />
        <CustomPin icon="motorcycle" coordinate={myLocation} size="medium" />
      </MapView>
      <Animated.View style={styleBottom}>
        <FooterTracking
          shipper={SHIPPER}
          distance={"10"}
          time={"15-20 minitues"}
        />
      </Animated.View>
      <Button
        children="More details"
        style={[styles.more, { bottom: bottom + 24 }]}
        onPress={_onMore}
      />
    </Container>
  );
});

export default TrackingOrder;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -10,
    bottom: 0,
  },
  shop: {
    width: 48,
    height: 48,
    borderRadius: 99,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  more: {
    bottom: 0,
    position: "absolute",
    left: 24,
    right: 24,
  },
});
const SHIPPER = {
  id: 0,
  name: "Le Thanh Hai",
  typeShipper: "Food-Shipper",
  rateStar: 10,
  avatar: Images.avatar6,
};
export const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1F2933",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "rgba(40, 67, 95, 1)",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1F2933",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "rgba(40, 67, 95, 1)",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "rgba(40, 67, 95, 1)",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#1F2933",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#1F2933",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#29394A",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#28435F",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#28435F",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#28435F",
      },
    ],
  },
];
