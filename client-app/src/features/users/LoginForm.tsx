import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";

import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { adminStore, commonStore } = useStore(); useEffect(() => {
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
          <Header as='h2' content='Kyçu në Shkollë!' color='teal' textAlign='center' />
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
            content="Kyçu"
            type="submit"
            fluid
          //onClick={AppLoadedAdmin}
          />
        </Form>
      )}
    </Formik>
  );
});
