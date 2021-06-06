import { ErrorMessage, Formik } from "formik";
import { values } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Label } from "semantic-ui-react";

import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { adminStore } = useStore();
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
          />
        </Form>
      )}
    </Formik>
  );
});
