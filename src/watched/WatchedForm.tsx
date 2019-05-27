import * as React from 'react';
import { Formik } from 'formik';
import Rating from 'react-rating';
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/themes/material_green.css'
import { useAddWatchedMutation, TmdbMovie, TmdbTv } from '../graphql';
import { Title } from '../content/renderService';

export function WatchedForm({ item, title }: { item: TmdbMovie | TmdbTv, title?: Title }) {
  const tmdbId = item.id;
  const mediaType = item.media_type;
  // TODO: figure out how to make TS happy with dot notation
  const name: string = item['name'] || item['title'];

  const addWatched = useAddWatchedMutation();
  return (
    <React.Fragment>
      <div style={{display: 'flex'}}>
        {item.poster_path ? (<div><img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} /></div>) : null}
        <div style={{padding: '0 0.5em'}}>
          Did you enjoy watching {name}?
        </div>
      </div>
      <Formik
        initialValues={{ review: '', rating: null, createdAt: Date.now() }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          addWatched({
            variables: {
              ...values,
              rating: {
                value: values.rating
              },
              review: {
                body: values.review,
              },
              tmdbId,
              mediaType,
            }
          }).then(() => actions.setSubmitting(false))
        }
      }>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Flatpickr
                  value={values.createdAt}
                  onChange={(date) => setFieldValue('createdAt', +date[0])}
                  options={{
                    enableTime: true,
                    time_24hr: true,
                  }}
                />
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  placeholder="Any thoughts?"
                  value={values.review}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.review && touched.review ? 'text-input error' : 'text-input'}
                />
                {errors.review && touched.review && (
                  <div className="input-feedback">{errors.review}</div>
                )}
                <label>Rating</label>
                <Rating
                  initialRating={values.rating}
                  fractions={2}
                  onChange={(value) => setFieldValue('rating', value)}
                />
                <button type="submit">Add</button>
              </form>
            )
        }}
      </Formik>
    </React.Fragment>
  );
}
