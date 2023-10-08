import React from "react";
import { View, Image } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { Images } from "assets/images";

interface Props {
  pressPlayPause?(): void;
  pressNext?(): void;
  pressPrv?(): void;
  pressRedo?(): void;
  pressUndo?(): void;
  playPause: boolean;
  loading: boolean;
}

const CustomController = ({
  pressUndo,
  pressNext,
  pressPlayPause,
  pressPrv,
  pressRedo,
  playPause,
  loading,
}: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container]}>
      <Button
        accessoryRight={<Icon pack="assets" name="leftChevron" />}
        status="transparent"
        onPress={pressPrv}
      />
      <Button
        accessoryRight={<Icon pack="assets" name="undo" />}
        status="transparent"
        onPress={pressUndo}
      />
      {loading ? (
        <Image
          source={Images.spinner}
          /* @ts-ignore */
          style={styles.spinner}
        />
      ) : (
        <Button
          onPress={pressPlayPause}
          status="control"
          size="80"
          accessoryRight={
            <Icon pack="assets" name={playPause ? "pause" : "play"} />
          }
        />
      )}
      <Button
        accessoryRight={<Icon pack="assets" name="redo" />}
        status="transparent"
        onPress={pressRedo}
      />
      <Button
        accessoryRight={<Icon pack="assets" name="rightChevron" />}
        status="transparent"
        onPress={pressNext}
      />
    </View>
  );
};

export default CustomController;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -12,
    marginTop: 40,
    marginBottom: 32,
  },
  spinner: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },
});
