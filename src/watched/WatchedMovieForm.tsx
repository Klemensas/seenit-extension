import * as React from 'react';
import { MutationFunction } from '@apollo/client';
import { Formik } from 'formik';
import Rating from 'react-rating';
import { FormGroup, TextArea, Button, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { MovieQuery, AddWatchedMutation, AddWatchedMutationVariables, ItemType } from '../graphql';

interface Props {
  item: MovieQuery['movie'];
  onSubmit: MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
  isLoading: boolean;
}

const WatchedMovieForm: React.FC<Props> = ({ item, onSubmit, isLoading }) => {
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
      <Formik<{ review: string; rating: number | null; createdAt: number }>
        enableReinitialize
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
        }}
        onSubmit={(values, actions) => {
          onSubmit({
            variables: {
              ...values,
              itemId: item.id,
              itemType: ItemType.Movie,
              rating: values.rating
                ? {
                    value: values.rating,
                  }
                : undefined,
              review: values.review
                ? {
                    body: values.review,
                  }
                : undefined,
            },
          }).then(() => actions.setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup label="Date" labelFor="createdAt">
              <DateInput
                popoverProps={{
                  fill: true,
                }}
                formatDate={(date) => date.toLocaleString()}
                parseDate={(str) => new Date(str)}
                placeholder="M/D/YYYY"
                onChange={(date) => setFieldValue('createdAt', +new Date(date))}
                value={new Date(values.createdAt)}
              />
            </FormGroup>
            <FormGroup label="Review" labelFor="review">
              <TextArea fill growVertically large name="review" onChange={handleChange} value={values.review} />
            </FormGroup>
            <FormGroup label="Rating" labelFor="rating">
              <Rating
                initialRating={values.rating || undefined}
                fractions={2}
                onChange={(value) => setFieldValue('rating', value)}
              />
            </FormGroup>
            <Button type="submit" large fill intent={Intent.PRIMARY} loading={isLoading}>
              Add
            </Button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default WatchedMovieForm;
