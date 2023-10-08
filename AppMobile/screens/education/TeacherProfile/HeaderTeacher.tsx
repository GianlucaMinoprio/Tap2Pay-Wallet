import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  name: string;
  avatar: any;
  student: string;
  course: number;
  following: number;
  ability: string[];
}
interface DataProps {
  data: Props;
}

const HeaderTeacher = memo(({ data }: DataProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text category="title4" uppercase center marginBottom={8}>
        {data.name}
      </Text>
      <View style={styles.ability}>
        {data.ability.map((item, i) => {
          return (
            <Layout level={"7"} key={i} style={styles.itemAbility}>
              <Text category="subhead" marginHorizontal={8} marginVertical={4}>
                {item}
              </Text>
            </Layout>
          );
        })}
      </View>
      <View style={styles.social}>
        <Icon pack="assets" name="fb1" style={styles.iconSocial} />
        <Icon pack="assets" name="tw" style={styles.iconSocial} />
        <Icon pack="assets" name="ig" style={styles.iconSocial} />
      </View>
      <Layout style={styles.footer} level={"2"}>
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.student}
          </Text>
          <Text category="caption1" center>
            Student
          </Text>
        </View>
        <Layout style={styles.line} level={"7"} />
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.course}
          </Text>
          <Text category="caption1" center>
            Course
          </Text>
        </View>
        <Layout style={styles.line} level={"7"} />
        <View style={styles.footerItem}>
          <Text category="title3" center marginBottom={7}>
            {data.following}
          </Text>
          <Text category="caption1" center>
            Following
          </Text>
        </View>
      </Layout>
    </View>
  );
});

export default HeaderTeacher;

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
