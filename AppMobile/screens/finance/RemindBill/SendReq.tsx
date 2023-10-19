import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";
import {Dimensions} from 'react-native';



import dayjs from "utils/dayjs";
import { BillFragment, SendRequestFragment } from "constants/Type";

interface BillProps {
  item: SendRequestFragment;
  onPress?(): void;
}
const windowWidth = Dimensions.get('window').width;


const SendReq = ({ item, onPress }: BillProps) => {
  const { category } = item;
  const { width } = useLayout();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        { width: width * 0.4 },
        { backgroundColor: category?.color },
      ]}
      onPress={onPress}
    >
      <View style={styles.top}>
        <View style={styles.row}>
          
          <View>
            <Text category="title2" status="black">
              {category?.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SendReq;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: 16,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 16,
    paddingRight: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 8,
    height: 60,
    width: (windowWidth / 2) - 16 ,
  },
});
