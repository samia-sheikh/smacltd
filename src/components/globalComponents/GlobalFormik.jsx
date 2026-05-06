import { Form, Formik } from 'formik';
import React from 'react'

const GlobalFormik = (Component, initialValues, onSubmit) => {
  return  (props) => (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <Form>
          <Component {...props} formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
}

export default GlobalFormik
