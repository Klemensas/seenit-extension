import * as React from 'react';
import { MutationFunction } from '@apollo/client';
import { Formik } from 'formik';
import { FormGroup, TextArea, Button, Intent, PopoverPosition } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { MovieQuery, AddWatchedMutation, AddWatchedMutationVariables, ItemType } from '../graphql';
import RatingInput from './RatingInput';

interface Props {
  item: MovieQuery['movie'];
  onSubmit: MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
  isLoading: boolean;
}

const WatchedMovieForm: React.FC<Props> = ({ item, onSubmit, isLoading }) => {
  return (
    <div className="flex">
      {item.poster_path ? (
        <div className="pr-3">
          <img
            src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
            width="185"
            alt={`Poster for ${item.title}`}
          />
        </div>
      ) : null}
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
          <form onSubmit={handleSubmit} className="flex-grow">
            <FormGroup label="Date" labelFor="createdAt">
              <DateInput
                popoverProps={{
                  minimal: true,
                  fill: true,
                  usePortal: false,
                  position: PopoverPosition.TOP,
                }}
                timePrecision="second"
                formatDate={(date) => date.toLocaleString()}
                parseDate={(str) => new Date(str)}
                placeholder="M/D/YYYY"
                onChange={(date) => setFieldValue('createdAt', +new Date(date))}
                value={new Date(values.createdAt)}
              />
            </FormGroup>
            <FormGroup label="Review" labelFor="review">
              <TextArea
                fill
                growVertically
                large
                name="review"
                onChange={handleChange}
                placeholder="Any thoughts on what you watched?"
                value={values.review}
              />
            </FormGroup>
            <FormGroup label="Rating" labelFor="rating">
              <div className="flex flex-content-between flex-items-center">
                <div>
                  <RatingInput
                    value={values.rating || 0}
                    onChange={(value) => setFieldValue('rating', value)}
                    className="seen-rating"
                  />
                  <span> {values.rating || '?'}/5</span>
                </div>
                {values.rating && (
                  <Button
                    icon="cross"
                    intent={Intent.DANGER}
                    minimal
                    small
                    onClick={() => setFieldValue('rating', undefined)}
                  />
                )}
              </div>
            </FormGroup>
            <Button type="submit" large fill intent={Intent.PRIMARY} loading={isLoading}>
              Add
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default WatchedMovieForm;
