import React, { memo } from "react";
import { View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  name: string;
  avatar: any;
  loves: number;
  following: number;
  follower: number;
}
interface DataProps {
  data: Props;
}

const HeaderProfile = memo(({ data }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text category="title4" uppercase center marginBottom={8}>
        {data.name}
      </Text>
      <Text category="subhead" status={"placeholder"} center>
        {"francisdixon@company.com"}
      </Text>
      <View style={styles.social}>
        <Icon pack="assets" name="fb1" style={styles.iconSocial} />
        <Icon pack="assets" name="tw" style={styles.iconSocial} />
        <Icon pack="assets" name="ig" style={styles.iconSocial} />
      </View>
      <Layout style={styles.footer} level={"2"}>
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.following}
          </Text>
          <Text category="caption1" center capitalize>
            following
          </Text>
        </View>
        <Layout style={styles.line} level={"7"} />
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.follower}
          </Text>
          <Text category="caption1" center capitalize>
            followers
          </Text>
        </View>
        <Layout style={styles.line} level={"7"} />
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.loves}
          </Text>
          <Text category="caption1" center capitalize>
            loves
          </Text>
        </View>
      </Layout>
    </View>
  );
});

export default HeaderProfile;

const themedStyles = StyleService.create({
  container: {},
  ability: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 8,
  },
  footerItem: {
    marginBottom: 22,
    marginTop: 21,
  },
  itemAbility: {
    borderRadius: 28,
    marginHorizontal: 8,
  },
  social: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  iconSocial: {
    width: 40,
    height: 40,
    marginHorizontal: 12,
  },
  footer: {
    borderRadius: 12,
    flexDirection: "row",
    marginHorizontal: 24,
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  line: {
    width: 1,
  },
});
