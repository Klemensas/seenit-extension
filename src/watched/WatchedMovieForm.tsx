import * as React from 'react';
import { Formik } from 'formik';
import Rating from 'react-rating';
import { FormGroup, TextArea, Button, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { useAddWatchedMutation, TmdbMediaType, useMovieQuery } from '../graphql';

const WatchedMovieForm: React.FC<{
  id: string;
}> = ({ id }) => {
  const [addWatched] = useAddWatchedMutation();
  const { data, loading } = useMovieQuery({
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const item = data.movie;

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        {item.poster_path ? (
          <div>
            <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt="" />
          </div>
        ) : null}
        <div style={{ padding: '0 0.5em' }}>Did you enjoy watching {item.title}?</div>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
        }}
        onSubmit={(values, actions) => {
          addWatched({
            variables: {
              ...values,
              itemId: item.id,
              rating: {
                value: values.rating,
              },
              review: {
                body: values.review,
              },
              mediaType: TmdbMediaType.Movie,
            },
          }).then(() => actions.setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup label="Date" labelFor="createdAt">
              <DateInput
                popoverProps={{
                  fill: true
                }}
                formatDate={date => date.toLocaleString()}
                parseDate={str => new Date(str)}
                placeholder="M/D/YYYY"
                onChange={date => setFieldValue('createdAt', +new Date(date))}
                value={new Date(values.createdAt)}
              />
            </FormGroup>
            <FormGroup label="Review" labelFor="review">
              <TextArea fill growVertically large name="review" onChange={handleChange} value={values.review} />
            </FormGroup>
            <FormGroup label="Rating" labelFor="rating">
              <Rating initialRating={values.rating} fractions={2} onChange={value => setFieldValue('rating', value)} />
            </FormGroup>
            <Button type="submit" large fill intent={Intent.PRIMARY}>Add</Button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default WatchedMovieForm;
