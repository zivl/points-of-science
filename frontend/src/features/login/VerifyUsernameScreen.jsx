import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import styles from "../../shared/styles";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import FormView from "./FormView";
import NavigationLink from "./NavigationLink";
import { t } from "../i18n";

const VERIFY_USERNAME = gql`
  query verifyUsername($username: String!) {
    verifyUsername(username: $username) {
      type
      status
      message
    }
  }
`;

export default function VerifyUsernameScreen() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setVerifiedUsername } = useContext(ActivateAccountContext);

  const [verifyUsername, { called, loading, data }] =
    useLazyQuery(VERIFY_USERNAME);

  useEffect(() => {
    if (data) {
      console.debug(data);
      if (data.verifyUsername.type === "success") {
        setVerifiedUsername(username);
        setErrorMessage("");
      } else {
        setErrorMessage(data.verifyUsername.message);
      }
    }
  }, [data, username, setVerifiedUsername]);

  return (
    <FormView>
      <TextInput
        label={t("Username")}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <Button
        mode="contained"
        loading={called && loading}
        style={styles.formAction}
        onPress={() => {
          verifyUsername({ variables: { username } });
        }}
      >
        {t("Verify username")}
      </Button>
      <NavigationLink
        label={t("Log in")}
        message={t("Already activated your account?")}
        screenName="Login"
      />
    </FormView>
  );
}
