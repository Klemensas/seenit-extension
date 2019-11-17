import * as React from 'react';
import { MutationFn } from 'react-apollo-hooks';
import { Formik } from 'formik';
import Rating from 'react-rating';
import { FormGroup, TextArea, Button, MenuItem, MenuDivider, PopoverPosition, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { Select, ItemRenderer } from '@blueprintjs/select';

import { TmdbMediaType, TvQuery, AddWatchedMutation, AddWatchedMutationVariables } from '../graphql';

interface EpisodeSelection {
  id: string;
  name: string;
  value: { season: number; episode: number };
  seasonName: string;
  lastSeasonEpisode: boolean;
  lastSeason: boolean;
}

const renderEpisode: ItemRenderer<EpisodeSelection> = (episode, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <React.Fragment key={episode.id}>
      <MenuItem active={modifiers.active} text={episode.name} label={episode.seasonName} onClick={handleClick} />
      {episode.lastSeasonEpisode && !episode.lastSeason && <MenuDivider />}
    </React.Fragment>
  );
};

const itemFilter = (query: string, items: EpisodeSelection[]) =>
  items.filter(({ name, seasonName }) => `${name} ${seasonName}`.toLowerCase().includes(query.toLowerCase()));

const getSelectOptions = (seasons: TvQuery['tv']['seasons']) =>
  seasons.reduce(
    (acc, { season_number: season, episodes }, seasonIndex) =>
      acc.concat(
        episodes.map(({ id, name, episode_number: episode }, episodeIndex) => ({
          id,
          name,
          seasonName: season ? `S${season}E${episode}` : null,
          value: { season, episode },
          lastSeasonEpisode: episodeIndex + 1 === episodes.length,
          lastSeason: seasonIndex + 1 === seasons.length,
          isSpecials: !season,
        })),
      ),
    [],
  );

interface Props {
  item: TvQuery['tv'];
  season?: number;
  episode?: number;
  onSubmit: MutationFn<AddWatchedMutation, AddWatchedMutationVariables>;
  isLoading: boolean;
}

const WatchedTvForm: React.FC<Props> = ({ item, season, episode, onSubmit, isLoading }) => {
  console.error('rerender');
  const seasons = item.seasons || [];
  const options = getSelectOptions(seasons);
  const tvData =
    season || episode
      ? {
          season,
          episode,
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
        <div style={{ padding: '0 0.5em' }}>Did you enjoy watching {item.name}?</div>
      </div>
      <Formik
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
          tvData,
        }}
        onSubmit={(values, actions) =>
          onSubmit({
            variables: {
              ...values,
              itemId: item.id,
              mediaType: TmdbMediaType.Tv,
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
          }).then(() => actions.setSubmitting(false))
        }
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup label="Date" labelFor="createdAt">
              <DateInput
                popoverProps={{
                  fill: true,
                }}
                formatDate={date => date.toLocaleString()}
                parseDate={str => new Date(str)}
                placeholder="M/D/YYYY"
                onChange={date => setFieldValue('createdAt', +new Date(date))}
                value={new Date(values.createdAt)}
              />
            </FormGroup>
            <FormGroup label="Episode" labelFor="tvData">
              <Select
                itemRenderer={renderEpisode}
                items={options}
                itemListPredicate={itemFilter}
                onItemSelect={({ value }) => setFieldValue('tvData', value)}
                popoverProps={{
                  minimal: true,
                  fill: true,
                  position: PopoverPosition.BOTTOM,
                }}
              >
                <Button
                  fill
                  text={
                    values.tvData
                      ? `Season ${values.tvData.season}, Episode ${values.tvData.episode}`
                      : 'Select an episode'
                  }
                  rightIcon="caret-down"
                />
              </Select>
            </FormGroup>
            <FormGroup label="Review" labelFor="review">
              <TextArea fill growVertically large name="review" onChange={handleChange} value={values.review} />
            </FormGroup>
            <FormGroup label="Rating" labelFor="rating">
              <Rating initialRating={values.rating} fractions={2} onChange={value => setFieldValue('rating', value)} />
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

export default WatchedTvForm;
