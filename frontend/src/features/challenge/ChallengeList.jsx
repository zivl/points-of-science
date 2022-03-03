import React from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { Chip, Text, TouchableRipple, withTheme } from "react-native-paper";
import { NoContent, Surface } from "../../shared/components";
import { t } from "../i18n";
import themedStyles from "./ChallengeList.style";
import { getDifficultyColor } from "./difficulty";

const fallbackImage = require("./assets/challenge.png");

function ChallengeListItem({ challenge, theme, onPress }) {
  const styles = themedStyles(theme);
  const imageSource = challenge.image
    ? { uri: challenge.image }
    : fallbackImage;

  const renderDifficulty = () => {
    const color = getDifficultyColor(challenge.difficulty);
    const textStyle = {
      color: color.isLight() ? "#000" : "#fff",
    };
    const style = {
      backgroundColor: color.string(),
      borderColor: color.darken(0.4).string(),
    };
    return (
      <Chip style={style} textStyle={textStyle} mode="outlined">
        {t(challenge.difficulty)}
      </Chip>
    );
  };

  const renderReward = () => {
    return !challenge.reward ? null : (
      <Chip style={styles.chip}>
        {challenge.reward.maxPoints} {t("points")}
      </Chip>
    );
  };

  return (
    <Surface style={styles.surface}>
      <TouchableRipple borderless style={styles.ripple} onPress={onPress}>
        <ImageBackground style={styles.image} source={imageSource}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{challenge.name}</Text>
            </View>
            <View style={styles.meta}>
              {renderDifficulty()}
              {renderReward()}
            </View>
          </View>
        </ImageBackground>
      </TouchableRipple>
    </Surface>
  );
}

function ChallengeList({ route, navigation, theme }) {
  const { category } = route.params;
  const { challenges } = category;

  if (!challenges.length) {
    return <NoContent message={t("Couldn't find any challenges")} />;
  }

  const styles = themedStyles(theme);

  return (
    <ScrollView>
      <View style={styles.list}>
        {challenges.map((challenge) => {
          return (
            <ChallengeListItem
              key={challenge.id}
              challenge={challenge}
              theme={theme}
              onPress={() => {
                navigation.navigate("challenge:main", {
                  challenge,
                });
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

export default withTheme(ChallengeList);
