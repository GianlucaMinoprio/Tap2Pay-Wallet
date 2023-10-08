import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";

import Text from "components/Text";
import Line from "components/Line";
import CurrencyText from "components/CurrencyText";
import { Category_Types_Enum, Format_Types_Enum } from "constants/Type";

interface Props {
  id: string;
  subTotal: number;
  promoCode: number;
  delivery: number;
  total: number;
}
interface ItemProps {
  data: Props;
}
const CardID = ({ data }: ItemProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container} level="4">
      <View style={styles.flexRow}>
        <Text category="body" status="snow">
          ID
        </Text>
        <Text children={data.id} category="headline" status="white" />
      </View>
      <Line
        level="2"
        marginTop={14}
        marginBottom={16}
        backgroundColor={theme["color-basic-2000"]}
      />
      <View style={styles.flexRow}>
        <Text category="body" status="snow">
          Sub total
        </Text>
        <CurrencyText
          category="headline"
          status="white"
          children={data.subTotal}
        />
      </View>
      <Line
        level="2"
        marginTop={14}
        marginBottom={16}
        backgroundColor={theme["color-basic-2000"]}
      />
      <View style={styles.flexRow}>
        <Text category="body" status="snow">
          Promo Code
        </Text>
        <CurrencyText
          category="headline"
          status="white"
          children={data.promoCode}
          type={Category_Types_Enum.Expense}
          formatType={Format_Types_Enum.Inky}
        />
      </View>
      <Line
        level="2"
        marginTop={14}
        marginBottom={16}
        backgroundColor={theme["color-basic-2000"]}
      />
      <View style={styles.flexRow}>
        <Text category="body" status="snow">
          Delivery
        </Text>
        <CurrencyText
          category="headline"
          status="white"
          children={data.delivery}
        />
      </View>
      <Line
        level="2"
        marginTop={14}
        marginBottom={16}
        backgroundColor={theme["color-basic-2000"]}
      />
      <View style={styles.flexRow}>
        <Text uppercase category="body" status="snow">
          TOTAL
        </Text>
        <CurrencyText
          category="headline"
          status="primary"
          children={data.total}
        />
      </View>
    </Layout>
  );
};

export default CardID;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 6,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
