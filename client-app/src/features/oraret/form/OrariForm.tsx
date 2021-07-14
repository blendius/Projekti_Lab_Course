import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import { Button, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { Orari } from "../../../app/models/orari";
import MyDataInput from "../../../app/common/form/MyDateInput";
import { useEffect } from "react";

export default observer(function OrariiForm() {
  const { orariStore } = useStore();
  const { lendaStore } = useStore();
  const { lendetByDate, loadLendet } = lendaStore;
  const { klasaStore } = useStore();
  const { klasatByVit, loadKlasat } = klasaStore;
  const { paraleljaStore } = useStore();
  const { loadParalelet, getParaleljaNumribyId } = paraleljaStore;

  const { selectedOrari, closeForm, createOrari, updateOrari, loading } =
    orariStore;

  const initialState = selectedOrari ?? {
    orariId: "",
    klasaId: "",
    hene1: "",
    hene2: "",
    hene3: "",
    hene4: "",
    hene5: "",
    hene6: "",
    marte1: "",
    marte2: "",
    marte3: "",
    marte4: "",
    marte5: "",
    marte6: "",
    merkure1: "",
    merkure2: "",
    merkure3: "",
    merkure4: "",
    merkure5: "",
    merkure6: "",
    enjte1: "",
    enjte2: "",
    enjte3: "",
    enjte4: "",
    enjte5: "",
    enjte6: "",
    premte1: "",
    premte2: "",
    premte3: "",
    premte4: "",
    premte5: "",
    premte6: "",
  };

  useEffect(() => {
    loadLendet();
    loadKlasat();
    loadParalelet();
  }, []);
  const [orari, setOrari] = useState(initialState);
  var lenda = lendetByDate;
  var arr: any = [];
  var len = lendetByDate.length;
  for (var i = 0; i < len; i++) {
    arr.push({
      text: lenda[i].emriLendes,
      value: lenda[i].emriLendes,
    });
  }
  var klaset = klasatByVit;
  var arr2: any = [];
  var len = klasatByVit.length;
  for (var i = 0; i < len; i++) {
    arr2.push({
      text: klaset[i].viti + "-" + getParaleljaNumribyId(klaset[i].paraleljaId),
      value: klaset[i].klasaId,
    });
  }

  function handleSubmit(orari: Orari) {
    orari.orariId ? updateOrari(orari) : createOrari(orari);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setOrari({ ...orari, [name]: value });
  }
  // const validationSchema = Yup.object({
  //   emri: Yup.string()
  //     .required("Emri i lendes eshte i nevojeshem")
  //     .min(3),
  //   pershkrimi: Yup.string()
  //     .required("pershkrimi i lendes eshte i nevojshem")
  //     .min(3),
  //   dataEShtimit: Yup.string()
  //     .required("dataEShtimit i lendes eshte i nevojshem")
  //     .nullable(),
  //   syllabusi: Yup.string().required("syllabusi i lendes eshte i nevojshem"),
  // });
  return (
    <Segment clearing>
      <Formik
        // validationSchema={validationSchema}
        enableReinitialize
        initialValues={initialState}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MySelectInput
              label="Klasa"
              options={arr2}
              placeholder="Klasa"
              name="klasaId"
            />
            <MySelectInput
              label="E Hene Ora 1"
              options={arr}
              placeholder="Lenda"
              name="hene1"
            />
            <MySelectInput
              label="E Hene Ora 2"
              options={arr}
              placeholder="Lenda"
              name="hene2"
            />
            <MySelectInput
              label="E Hene Ora 3"
              options={arr}
              placeholder="Lenda"
              name="hene3"
            />
            <MySelectInput
              label="E Hene Ora 4"
              options={arr}
              placeholder="Lenda"
              name="hene4"
            />
            <MySelectInput
              label="E Hene Ora 5"
              options={arr}
              placeholder="Lenda"
              name="hene5"
            />
            <MySelectInput
              label="E Hene Ora 6"
              options={arr}
              placeholder="Lenda"
              name="hene6"
            />
            <MySelectInput
              label="E Marte Ora 1"
              options={arr}
              placeholder="Lenda"
              name="marte1"
            />
            <MySelectInput
              label="E Marte Ora 2"
              options={arr}
              placeholder="Lenda"
              name="marte2"
            />
            <MySelectInput
              label="E Marte Ora 3"
              options={arr}
              placeholder="Lenda"
              name="marte3"
            />
            <MySelectInput
              label="E Marte Ora 4"
              options={arr}
              placeholder="Lenda"
              name="marte4"
            />
            <MySelectInput
              label="E Marte Ora 5"
              options={arr}
              placeholder="Lenda"
              name="marte5"
            />
            <MySelectInput
              label="E Marte Ora 6"
              options={arr}
              placeholder="Lenda"
              name="marte6"
            />
            <MySelectInput
              label="E Merkure Ora 1"
              options={arr}
              placeholder="Lenda"
              name="merkure1"
            />
            <MySelectInput
              label="E Merkure Ora 2"
              options={arr}
              placeholder="Lenda"
              name="merkure2"
            />
            <MySelectInput
              label="E Merkure Ora 3"
              options={arr}
              placeholder="Lenda"
              name="merkure3"
            />
            <MySelectInput
              label="E Merkure Ora 4"
              options={arr}
              placeholder="Lenda"
              name="merkure4"
            />
            <MySelectInput
              label="E Merkure Ora 5"
              options={arr}
              placeholder="Lenda"
              name="merkure5"
            />
            <MySelectInput
              label="E Merkure Ora 6"
              options={arr}
              placeholder="Lenda"
              name="merkure6"
            />
            <MySelectInput
              label="E Enjte Ora 1"
              options={arr}
              placeholder="Lenda"
              name="enjte1"
            />
            <MySelectInput
              label="E Enjte Ora 2"
              options={arr}
              placeholder="Lenda"
              name="enjte2"
            />
            <MySelectInput
              label="E Enjte Ora 3"
              options={arr}
              placeholder="Lenda"
              name="enjte3"
            />
            <MySelectInput
              label="E Enjte Ora 4"
              options={arr}
              placeholder="Lenda"
              name="enjte4"
            />
            <MySelectInput
              label="E Enjte Ora 5"
              options={arr}
              placeholder="Lenda"
              name="enjte5"
            />
            <MySelectInput
              label="E Enjte Ora 6"
              options={arr}
              placeholder="Lenda"
              name="enjte6"
            />
            <MySelectInput
              label="E Premte Ora 1"
              options={arr}
              placeholder="Lenda"
              name="premte1"
            />
            <MySelectInput
              label="E Premte Ora 2"
              options={arr}
              placeholder="Lenda"
              name="premte2"
            />
            <MySelectInput
              label="E Premte Ora 3"
              options={arr}
              placeholder="Lenda"
              name="premte3"
            />
            <MySelectInput
              label="E Premte Ora 4"
              options={arr}
              placeholder="Lenda"
              name="premte4"
            />
            <MySelectInput
              label="E Premte Ora 5"
              options={arr}
              placeholder="Lenda"
              name="premte5"
            />
            <MySelectInput
              label="E Premte Ora 6"
              options={arr}
              placeholder="Lenda"
              name="premte6"
            />
            <Button
              // disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={closeForm}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
