import * as React from 'react';
import { Formik, FormikActions } from 'formik';
import { Switch, Button } from '@blueprintjs/core';

import { settings, Settings as SettingModel } from '../main';
import { updateStorage } from '../browserService';
import InputList from './InputList';

const submitForm = (values: SettingModel, actions: FormikActions<SettingModel>) =>
  updateStorage({ settings: values }).then(() => actions.setSubmitting(false));

const Settings = () => {
  return (
    <React.Fragment>
      <h3 className="bp3-heading">Settings</h3>
      <Formik enableReinitialize initialValues={{ ...settings }} onSubmit={submitForm}>
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Switch
              id="popup-switch"
              label="Show popup after finishing a video"
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
