import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";

import MyTextInput from "../../app/common/form/MyTextInput";
import AppLoadedAdmin from "../../app/layout/AppLoadedAdmin";
import { useStore } from "../../app/stores/store";


//const { handleSetAdminMode } = adminStore;



export default observer(function LoginForm() {
const { adminStore, commonStore } = useStore();useEffect(() => {
  //if(adminMode){ 
  if (commonStore.token) {
    adminStore.getUser().finally(() => commonStore.setAppLoaded())
  }
}, [commonStore, adminStore])
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        adminStore
          .login(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off ">
          <Header as='h2' content='Kyqu ne Shkolle!' color='teal' textAlign='center' />
          <MyTextInput name="email" placeholder="Email" />

          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Kyqu"
            type="submit"
            fluid
          //onClick={AppLoadedAdmin}
          />
        </Form>
      )}
    </Formik>
  );
});
