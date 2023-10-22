import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
// import { AdMobBanner } from "expo-ads-admob";
import { adUnitID } from "utils/ads";

interface Props {
  bannerSize?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
  marginBottom?: number;
  marginTop?: number;
}

const AdMob = ({ marginBottom, marginTop, bannerSize = "banner" }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          alignItems: "center",
          marginBottom: marginBottom,
          marginTop: marginTop,
        },
      ]}
    >
      {/* <AdMobBanner
        bannerSize={bannerSize}
        adUnitID={adUnitID}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      /> */}
    </TouchableOpacity>
  );
};

export default AdMob;
