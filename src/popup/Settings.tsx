import * as React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Switch, Button, H3 } from '@blueprintjs/core';

import { settings, Settings as SettingModel } from '../main';
import { updateStorage } from '../browserService';
import InputList from './InputList';

const submitForm = (values: SettingModel, actions: FormikHelpers<SettingModel>) =>
  updateStorage({ settings: values }).then(() => actions.setSubmitting(false));

const Settings = () => {
  return (
    <React.Fragment>
      <H3>Settings</H3>
      <Formik enableReinitialize initialValues={{ ...settings }} onSubmit={submitForm}>
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Switch
              id="popup-switch"
              label="Automatically track finished videos without popup"
              checked={values.popup}
              onChange={() => setFieldValue('popup', !values.popup)}
            />
            <Switch
              id="debug-switch"
              label="Enable debug information logging"
              checked={values.debug}
              onChange={() => setFieldValue('debug', !values.debug)}
            />
            <InputList
              id="blacklist-input"
              list={values.blacklist}
              updateList={value => setFieldValue('blacklist', value)}
            />

            <Button type="submit" icon="add">
              Save
            </Button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Settings;
