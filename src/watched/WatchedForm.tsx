import { Formik } from 'formik';
import * as React from 'react';
import Flatpickr from 'react-flatpickr';
import Rating from 'react-rating';

import 'flatpickr/dist/themes/material_green.css';
import { Title } from '../content/renderService';
import { TmdbMovie, TmdbTv, useAddWatchedMutation } from '../graphql';

export default function WatchedForm({
  item,
}: // title,
{
  item: TmdbMovie | TmdbTv;
  title?: Title;
}): React.ReactElement {
  const tmdbId = item.id;
  const mediaType = item.media_type;
  // TODO: figure out how to make TS happy with dot notation
  // const name: string = item['name'] || item['title'];
  const name = (item as TmdbTv).name || (item as TmdbMovie).title;

  const addWatched = useAddWatchedMutation();
  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        {item.poster_path ? (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
              alt=""
            />
          </div>
        ) : null}
        <div style={{ padding: '0 0.5em' }}>Did you enjoy watching {name}?</div>
      </div>
      <Formik
        initialValues={{ review: '', rating: null, createdAt: Date.now() }}
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
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
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
            <label htmlFor="review">
              <span>Review</span>
              <textarea
                id="review"
                placeholder="Any thoughts?"
                value={values.review}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.review && touched.review
                    ? 'text-input error'
                    : 'text-input'
                }
              />
            </label>
            {errors.review && touched.review && (
              <div className="input-feedback">{errors.review}</div>
            )}
            <label htmlFor="rating">
              Rating
              <Rating
                initialRating={values.rating}
                fractions={2}
                onChange={value => setFieldValue('rating', value)}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
