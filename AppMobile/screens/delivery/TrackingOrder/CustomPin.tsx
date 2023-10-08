import React, { memo } from "react";
import { StyleService, useStyleSheet, Icon, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { LatLng, Marker } from "react-native-maps";

interface CustomPinProps {
  coordinate: LatLng;
  size?: "large" | "medium";
  icon: string;
}

const CustomPin = memo(
  ({ icon, coordinate, size = "large" }: CustomPinProps) => {
    const { width } = useLayout();
    const styles = useStyleSheet(themedStyles);
    const sizeL = 48 * (width / 375);
    const sizeM = 36 * (width / 375);
    return (
      <Marker
        style={styles.container}
        coordinate={{
          latitude:
            size === "large"
              ? coordinate.latitude - 0.0024
              : coordinate.latitude - 0.0016,
          longitude: coordinate.longitude,
        }}
      >
        <Layout
          style={[
            styles.marker,
            {
              width: size === "large" ? sizeL : sizeM,
              height: size === "large" ? sizeL : sizeM,
              top: 24,
            },
          ]}
        >
          <Icon
            pack="assets"
            name={icon}
            style={size == "large" ? styles.iconLarge : styles.iconMedium}
          />
        </Layout>
      </Marker>
    );
  }
);

export default CustomPin;

const themedStyles = StyleService.create({
  container: {
  },
  marker: {
    borderWidth: 1,
    borderColor: "text-basic-color",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLarge: {
    width: 24,
    height: 24,
    tintColor: "text-basic-color",
  },
  iconMedium: {
    width: 20,
    height: 20,
    tintColor: "text-basic-color",
  },
});
