import React, { useContext, useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import HeaderTitle from "./HeaderTitle";
import styles from "./styles";

function Reflection({ navigation }) {
  const challenge = useContext(ChallengeContext);
  const { reflection } = challenge;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <HeaderTitle subtitle={t("Reflection")} title={challenge.name} />
        );
      },
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{reflection.title}</Text>
          <TextInput
            style={styles.textarea}
            multiline
            autoFocus
            label={t("Reflection")}
          />
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => navigation.navigate("challenge:completed")}
      >
        {t("Complete challenge")}
      </Button>
    </View>
  );
}

export default Reflection;
