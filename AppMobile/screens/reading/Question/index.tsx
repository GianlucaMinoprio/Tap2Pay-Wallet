import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import ItemQuestion from "./ItemQuestion";
import { RefreshControl } from "react-native-web-refresh-control";

const Question = memo(() => {
  const { goBack } = useNavigation();
  const { bottom } = useLayout();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isContinue, setContinue] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  React.useEffect(() => {
    if (selectedIndex !== 0) {
      setContinue(false);
    } else setContinue(true);
  }, [selectedIndex]);
  const onSelect = React.useCallback((num) => {
    setSelectedIndex(num);
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={
          <Text
            children="Skip"
            category="headline"
            status="primary"
            marginRight={16}
            onPress={goBack}
          />
        }
      />
      <Content
        contentContainerStyle={[styles.content]}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Text
          category="header"
          status="white"
          marginHorizontal={24}
          marginBottom={32}
        >
          How much time per day would you like{"\n"}to{" "}
          <Text category="header" status="primary">
            read book?
          </Text>
        </Text>
        <ItemQuestion
          numberBookPerWeek={4}
          minutes={30}
          isChoose={selectedIndex === 1}
          num={1}
          onPress={onSelect}
        />
        <ItemQuestion
          numberBookPerWeek={6}
          minutes={45}
          isChoose={selectedIndex === 2}
          num={2}
          onPress={onSelect}
        />
        <ItemQuestion
          numberBookPerWeek={8}
          minutes={60}
          isChoose={selectedIndex === 3}
          num={3}
          onPress={onSelect}
        />
        <ItemQuestion
          numberBookPerWeek={12}
          minutes={120}
          isChoose={selectedIndex === 4}
          num={4}
          onPress={onSelect}
        />
      </Content>
      <Button
        children="Continue"
        disabled={isContinue}
        size="large"
        style={[styles.continue, { marginBottom: bottom + 16 }]}
      />
    </Container>
  );
});

export default Question;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 8,
  },
  continue: {
    marginHorizontal: 24,
  },
});
