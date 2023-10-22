import React from "react";
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native";
import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface ReadMoreProps {
  children: string;
  more?: string;
  less?: string;
  style?: ViewStyle;
  numberOfLines?: number;
  status?: string;
  marginBottom?: number;
  marginTop?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  category?:
    | "roboto"
    | "h6"
    | "extra"
    | "extra-1"
    | "header"
    | "title1"
    | "title2"
    | "title3"
    | "title4"
    | "body"
    | "call-out"
    | "headline"
    | "subhead"
    | "footnote"
    | "caption1"
    | "caption2"
    | "label";
}

const ReadMore = ({
  children,
  more = "Read More",
  less = "Less",
  style,
  marginBottom,
  marginHorizontal,
  marginTop,
  marginVertical,
  status,
  numberOfLines = 3,
  category = "body",
}: ReadMoreProps) => {
  const { width } = useLayout();
  const [fullTextSlice, setFullTextSlice] = React.useState(0);
  const [isShowFullText, setShowFullText] = React.useState(false);
  const [layout, setLayout] = React.useState(0);

  const onShowMore = () => {
    setShowFullText(!isShowFullText);
  };
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout.width);
  }, []);
  React.useEffect(() => {
    if (isShowFullText) {
      setFullTextSlice(children.length);
    } else {
      setFullTextSlice(layout / (children.length / layout + numberOfLines));
    }
  }, [isShowFullText, layout]);
  return (
    <View
      style={[
        style,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          marginVertical: marginVertical,
        },
      ]}
    >
      <Text
        category={category}
        status={status}
        numberOfLines={isShowFullText ? undefined : numberOfLines}
        lineHeight={24}
        onLayout={onLayout}
      >
        {children.slice(0, fullTextSlice)}
        {isShowFullText ? " " : "... "}
        <Text
          style={styles.buttonShowMore}
          onPress={onShowMore}
          status="primary"
          category="body"
          lineHeight={24}
        >
          {isShowFullText ? less : more}
        </Text>
      </Text>
    </View>
  );
};

export default ReadMore;
const styles = StyleSheet.create({
  invisible: {
    position: "absolute",
    opacity: 0,
  },
  buttonShowMore: {
    marginTop: 16,
  },
});
