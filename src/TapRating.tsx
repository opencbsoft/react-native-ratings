import _ from "lodash";

import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";

import Star from "./components/Star";

export type TapRatingProps = {
  /**
   * Total number of ratings to display.
   *
   * @default 5
   */
  count?: number;

  /**
   * Labels to show when each value is tapped.
   *
   * e.g. If the first star is tapped, then value in index 0 will be used as the label.
   *
   * @default ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
   */
  reviews?: string[];

  /**
   * Determines if to show the reviews above the rating.
   *
   * @default true
   */
  showRating?: boolean;

  /**
   * Color value for review.
   *
   * @default #f1c40f
   */
  reviewColor?: string;

  /**
   * Size value for review.
   *
   * @default 40
   */
  reviewSize?: number;

  /**
   * Initial value for the rating
   *
   * @default 3
   */
  defaultRating?: number;

  /**
   * Style for star container
   *
   * @default undefined
   */
  starContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for rating container
   *
   * @default undefined
   */
  ratingContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Callback method when the user finishes rating. Gives you the final rating value as a whole number
   */
  onFinishRating?: (number) => void;

  /**
   * Whether the rating can be modiefied by the user
   *
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Color value for filled stars.
   *
   * @default #004666
   */
  selectedColor?: string;

  /**
   * Color value for not filled stars.
   *
   * @default #BDC3C7
   */
  unSelectedColor?: string;

  /**
   * Size of rating image
   *
   * @default 40
   */
  size?: number;

  /**
   * Pass in a custom base image source
   */
  starImage?: string;

  /**
   * Style for star
   */
  starStyle?: StyleProp<ViewStyle>;
};

const TapRating: React.FunctionComponent<TapRatingProps> = (props) => {
  const {
    defaultRating = 3,
    count = 5,
    reviews = ["Terrible", "Bad", "Okay", "Good", "Great"],
    showRating = true,
    reviewColor = "rgba(230, 196, 46, 1)",
    reviewSize = 25,
  } = props;

  const [position, setPosition] = useState<number>(defaultRating);

  useEffect(() => {
    if (defaultRating === null || defaultRating === undefined) {
      setPosition(3);
    } else {
      setPosition(defaultRating);
    }
  }, [defaultRating]);

  const renderStars = (rating_array) => {
    return _.map(rating_array, (star) => {
      return star;
    });
  };

  const starSelectedInPosition = (position) => {
    const { onFinishRating } = props;

    if (typeof onFinishRating === "function") {
      onFinishRating(position);
    }

    setPosition(position);
  };

  const rating_array = [];
  const starContainerStyle = [styles.starContainer];

  if (props.starContainerStyle) {
    starContainerStyle.push(props.starContainerStyle);
  }

  const ratingContainerStyle = [styles.ratingContainer];

  if (props.ratingContainerStyle) {
    ratingContainerStyle.push(props.ratingContainerStyle);
  }

  _.times(count, (index) => {
    rating_array.push(
      <Star
        key={index}
        position={index + 1}
        starSelectedInPosition={(value) => {
          starSelectedInPosition(value);
        }}
        fill={position >= index + 1}
        {...props}
      />
    );
  });

  return (
    <View style={ratingContainerStyle}>
      {showRating && (
        <Text
          style={[
            styles.reviewText,
            { fontSize: reviewSize, color: reviewColor },
          ]}
        >
          {reviews[position - 1]}
        </Text>
      )}
      <View style={starContainerStyle}>{renderStars(rating_array)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: {
    fontWeight: "bold",
    margin: 10,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TapRating;
