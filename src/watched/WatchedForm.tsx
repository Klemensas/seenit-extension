import * as React from 'react';
import { Formik } from 'formik';
import Rating from 'react-rating';
// import Select, { components } from 'react-select';
import { FormGroup, TextArea, Button, MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { Select } from '@blueprintjs/select';

import { Title } from '../content/renderService';
import { TmdbMovie, TmdbTv, useAddWatchedMutation, TmdbMediaType, useTvQuery } from '../graphql';

// const SingleValue = ({ children, ...props }: React.PropsWithChildren<any>) => {
//   const { data } = props;
//   return (
//     <components.SingleValue {...props}>
//       {children}
//       <span style={{ opacity: 0.5, paddingLeft: '0.5em', fontWeight: 300 }}>({data.seasonName})</span>
//     </components.SingleValue>
//   );
// };

const renderEpisode = (episode, { handleClick, modifiers }) => {
  // if (!modifiers.matchesPredicate) {
  //     return null;
  // }
  return (
    <MenuItem
      active={modifiers.active}
      key={episode.season}
      label={episode.label}
      onClick={handleClick}
      text={episode.season}
    />
  );
};

const WatchedForm: React.FC<{
  item: TmdbMovie | TmdbTv;
  title?: Title;
}> = ({ item, title }) => {
  const tmdbId = item.id;
  const mediaType = item.media_type;
  const name = (item as TmdbTv).name || (item as TmdbMovie).title;

  const addWatched = useAddWatchedMutation();
  const tvQuery = useTvQuery({
    variables: { tmdbId: item.id },
    skip: mediaType !== TmdbMediaType.Tv,
  });

  if (tvQuery.loading) {
    return <div>Loading...</div>;
  }

  const seasons = tvQuery.data && tvQuery.data.tv ? tvQuery.data.tv.seasons : [];
  const seasonOptions = seasons.map(({ season_number: season, episode_count: episodeCount, name: label }) => ({
    label,
    season,
    options: Array.from({ length: episodeCount }).map((val, i) => ({
      label: `Episode ${i + 1}`,
      value: { season, episode: i + 1 },
      seasonName: label,
    })),
  }));
  let defaultTvData;
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
        enableReinitialize
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
          tvData,
        }}
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
            <FormGroup label="Date" labelFor="createdAt" inline>
              <DateInput
                formatDate={date => date.toLocaleString()}
                parseDate={str => new Date(str)}
                placeholder="M/D/YYYY"
                onChange={date => setFieldValue('createdAt', +new Date(date))}
                value={new Date(values.createdAt)}
              />
            </FormGroup>
            {mediaType === TmdbMediaType.Tv && (
              <FormGroup label="Episode" labelFor="tvData" inline>
                <div>yes? {JSON.stringify(seasonOptions)}</div>
                <Select itemRenderer={renderEpisode} items={seasonOptions} onItemSelect={handleChange}>
                  <Button text={'Select a Semester'} rightIcon="caret-down" />
                </Select>
                {/* <Select
                  id="tvData"
                  defaultValue={defaultTvData}
                  options={seasonOptions}
                  onChange={handleChange}
                  components={{ SingleValue }}
                /> */}
              </FormGroup>
            )}
            <FormGroup label="Review" labelFor="review" inline>
              <TextArea growVertically large name="review" onChange={handleChange} value={values.review} />
            </FormGroup>
            <FormGroup label="Rating" labelFor="rating" inline>
              <Rating initialRating={values.rating} fractions={2} onChange={value => setFieldValue('rating', value)} />
            </FormGroup>
            {/* <label htmlFor="review">
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
            {errors.review && touched.review && <div className="input-feedback">{errors.review}</div>} */}
            {/* <label htmlFor="rating">
              Rating
              <Rating initialRating={values.rating} fractions={2} onChange={value => setFieldValue('rating', value)} />
            </label> */}
            <Button type="submit">Add</Button>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default WatchedForm;
