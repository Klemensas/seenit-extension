import * as React from 'react';
import { Formik, Form } from 'formik';
import { Switch, Spinner, Button, H3, FormGroup, H4, NumericInput } from '@blueprintjs/core';

import Blacklist from './Blacklist';
import { useUserDataQuery, useUpdateSettingsMutation, useSettingsQuery } from '../graphql';
import { updateUserSettings } from '../common/apollo/helpers';

const Settings = () => {
  const { data: settingsData, loading } = useSettingsQuery();
  const { data: localUser } = useUserDataQuery();
  const currentSettings = settingsData?.settings;
  const [updateSettings] = useUpdateSettingsMutation({
    update: (cache, { data }) => {
      if (!data || !localUser) return;

      updateUserSettings(cache, {
        ...localUser.userData,
        settings: data.updateSettings,
      });
    },
  });

  const form =
    loading || !currentSettings
      ? null
      : {
          general: {
            autoConvert: currentSettings.general.autoConvert,
          },
          extension: {
            autoTrack: currentSettings.extension.autoTrack,
            minLengthSeconds: currentSettings.extension.minLengthSeconds,
            blacklist: currentSettings.extension.blacklist,
          },
        };

  return (
    <React.Fragment>
      <H3>Settings</H3>
      {!form ? (
        <Spinner size={16} />
      ) : (
        <Formik onSubmit={(values) => updateSettings({ variables: values })} enableReinitialize initialValues={form}>
          {({ values, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <div>
                <H4 className="mt-4">General</H4>
                <p className="mb-4">Site specific settings</p>

                <FormGroup
                  label="Auto tracked"
                  helperText="Enabling this saves identified auto tracked items directly to your watched list instead of a draft"
                >
                  <Switch
                    name="general.autoConvert"
                    label="Automatically save eligible items"
                    checked={values.general.autoConvert}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div>
                <H4 className="mt-4">Extension</H4>
                <p className="mb-4">Controls the browser extension behavior</p>

                <FormGroup
                  label="Tracking"
                  helperText="Enabling this removes the watched popup after finishing a video and instead automatically saves the item as a draft"
                >
                  <Switch
                    name="extension.autoTrack"
                    label="Automatically track finished videos"
                    checked={values.extension.autoTrack}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup
                  label="Minimum video length"
                  helperText="Specify minimum amount in seconds for videos to be registered as watched"
                >
                  <NumericInput
                    onValueChange={(value) => setFieldValue('extension.minLengthSeconds', value)}
                    value={values.extension.minLengthSeconds}
                  />
                </FormGroup>
                <Blacklist
                  list={values.extension.blacklist}
                  updateList={(list) => setFieldValue('extension.blacklist', list)}
                  helperTextPrefix={<p>List of domains that are not tracked</p>}
                />
              </div>
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </React.Fragment>
  );
};

export default Settings;
