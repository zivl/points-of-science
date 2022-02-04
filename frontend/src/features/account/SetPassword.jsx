import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { AuthContext } from "../auth/AuthProvider";
import { ActivateAccountContext } from "./ActivateAccountProvider";
import { t } from "../i18n";
import FormAction from "./FormAction";

const ACTIVATE_ACCOUNT = gql`
  mutation activateAccount(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    activateAccount(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      type
      status
      message
      data {
        accessToken
        refreshToken
        user {
          id
          username
        }
      }
    }
  }
`;

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { username } = useContext(ActivateAccountContext);
  const { logInUser } = useContext(AuthContext);

  const [activateAccount, { data, loading, error }] =
    useMutation(ACTIVATE_ACCOUNT);

  useEffect(() => {
    if (data) {
      console.debug(data);
      if (data.activateAccount.type === "success") {
        const { user, accessToken, refreshToken } = data.activateAccount.data;
        logInUser(user, accessToken, refreshToken);
        setErrorMessage("");
      } else {
        setErrorMessage(data.activateAccount.message);
      }
    }
  }, [data, logInUser]);

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  return (
    <>
      <TextInput
        style={{ marginBottom: 16 }}
        label={t("Username")}
        value={username}
        disabled
        right={<TextInput.Icon name="check" />}
      />
      <TextInput
        label={t("Password")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label={t("Confirm password")}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <HelperText type="error" visible={errorMessage}>
        {errorMessage}
      </HelperText>
      <FormAction
        label={t("Activate account")}
        loading={loading}
        onPress={() => {
          activateAccount({
            variables: { username, password, confirmPassword },
          });
        }}
      />
    </>
  );
}
