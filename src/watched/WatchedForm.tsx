import { Formik } from 'formik';
import * as React from 'react';
import Flatpickr from 'react-flatpickr';
import Rating from 'react-rating';
import Select, { components } from 'react-select';

import 'flatpickr/dist/themes/material_green.css';
import { Title } from '../content/renderService';
import { TmdbMovie, TmdbTv, useAddWatchedMutation, Season, TmdbMediaType } from '../graphql';

const SingleValue = ({ children, ...props }: React.PropsWithChildren<any>) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      {children}
      <span style={{ opacity: 0.5, paddingLeft: '0.5em', fontWeight: 300 }}>({data.seasonName})</span>
    </components.SingleValue>
  );
};

export default function WatchedForm({
  item,
  title,
  seasons,
}: {
  item: TmdbMovie | TmdbTv;
  title?: Title;
  seasons?: Season[];
}): React.ReactElement {
  const tmdbId = item.id;
  const mediaType = item.media_type;
  const name = (item as TmdbTv).name || (item as TmdbMovie).title;
  const addWatched = useAddWatchedMutation();
  const seasonOptions = (seasons || []).map(({ season_number: season, episode_count: episodeCount, name: label }) => ({
    label,
    season,
    options: Array.from({ length: episodeCount }).map((val, i) => ({
      label: `Episode ${i + 1}`,
      value: { season, episode: i + 1 },
      seasonName: label,
    })),
  }));

  let defaultTvData = null;
  if (title && title.season) {
    const group = seasonOptions.find(({ season }) => +title.season === season);
    defaultTvData = group ? group.options.find(({ value }) => value.episode === +title.episode) : null;
  }
  const tvData = title
    ? {
        season: title.season,
        episode: title.episode,
      }
    : null;

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        {item.poster_path ? (
          <div>
            <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt="" />
          </div>
        ) : null}
        <div style={{ padding: '0 0.5em' }}>Did you enjoy watching {name}?</div>
      </div>
      <Formik
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
          tvData,
        }}
        enableReinitialize
        onSubmit={(values, actions) => {
          addWatched({
            variables: {
              ...values,
              rating: {
                value: values.rating,
              },
              review: {
                body: values.review,
              },
              tmdbId,
              mediaType,
            },
          }).then(() => actions.setSubmitting(false));
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="createdAt">
              <span>Date</span>
              <Flatpickr
                id="createdAt"
                value={values.createdAt}
                onChange={date => setFieldValue('createdAt', +date[0])}
                options={{
                  enableTime: true,
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  time_24hr: true,
                }}
              />
            </label>
            {mediaType === TmdbMediaType.Tv ? (
              <label htmlFor="tvData">
                <span>Episode</span>
                <Select
                  id="tvData"
                  defaultValue={defaultTvData}
                  options={seasonOptions}
                  onChange={handleChange}
                  components={{ SingleValue }}
                />
              </label>
            ) : null}
            <label htmlFor="review">
              <span>Review</span>
              <textarea
                id="review"
                placeholder="Any thoughts?"
                value={values.review}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.review && touched.review ? 'text-input error' : 'text-input'}
              />
            </label>
            {errors.review && touched.review && <div className="input-feedback">{errors.review}</div>}
            <label htmlFor="rating">
              Rating
              <Rating initialRating={values.rating} fractions={2} onChange={value => setFieldValue('rating', value)} />
            </label>
            <button type="submit">Add</button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
