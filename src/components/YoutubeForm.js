import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "mridul",
  email: "",
  channel: "",
  Comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  userNumbers: [""],
};

const savedValues = {
  name: "mridul",
  email: "mridul@gmail.com",
  channel: "codeevulation",
  Comments: "welcome to formik",
  address: "3222 , house1",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  userNumbers: [""],
};

const onSubmit = (values, submitProps) => {
  console.log("form values", values);
  console.log("Submit Props", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
  comments: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const YoutubeForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div>
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                name="channel"
                id="channel"
                placeholder="Channel Name"
              />
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                name="comments"
                id="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  console.log("Field Render");
                  const { field, form, meta } = props;

                  return (
                    <div>
                      <input type="text" id="addres" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" name="facebook" id="facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">twitter</label>
              <Field type="text" name="twitter" id="twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPh">Praimary Phone</label>
              <Field type="text" name="phoneNumbers[0]" id="primaryPh" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone</label>
              <Field type="text" name="phoneNumbers[1]" id="secondaryPh" />
            </div>
            <div className="form-control">
              <label>User Phones</label>
              <FieldArray name="userNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { userNumbers } = values;
                  console.log("Form errors", form.errors);
                  return (
                    <div>
                      {userNumbers.map((userNumber, index) => (
                        <div key={index}>
                          <Field name={`userNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateField()}>
              Validate All
            </button>

            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                })
              }
            >
              visite fields
            </button> */}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
