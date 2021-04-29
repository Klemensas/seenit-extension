import * as React from 'react';
import { MutationFunction } from '@apollo/client';
import { Formik } from 'formik';
import {
  FormGroup,
  TextArea,
  Button,
  MenuItem,
  MenuDivider,
  PopoverPosition,
  Intent,
  Tooltip,
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { ItemRenderer, Suggest } from '@blueprintjs/select';

import { TvQuery, AddWatchedMutation, AddWatchedMutationVariables, ItemType, TvItemType } from '../graphql';
import RatingInput from './RatingInput';

interface EpisodeSelection {
  id: string;
  name: string;
  value: { season: number; episode: number };
  seasonName: string;
  lastSeasonEpisode: boolean;
  lastSeason: boolean;
}

const renderEpisode: ItemRenderer<EpisodeSelection> = (episode, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) return null;

  return (
    <React.Fragment key={episode.id}>
      <MenuItem active={modifiers.active} text={episode.name} label={episode.seasonName} onClick={handleClick} />
      {!query && episode.lastSeasonEpisode && !episode.lastSeason && <MenuDivider />}
    </React.Fragment>
  );
};

const itemFilter = (query: string, items: EpisodeSelection[]) =>
  items.filter(({ name, seasonName }) => `${name} ${seasonName}`.toLowerCase().includes(query.toLowerCase()));

const getSelectOptions = (seasons: TvQuery['tv']['seasons']) =>
  seasons.reduce((acc: EpisodeSelection[], { season_number: season, episodes }, seasonIndex) => {
    acc.push(
      ...episodes.map(({ id, name, episode_number: episode }, episodeIndex) => ({
        id,
        name,
        seasonName: season ? `S${season}E${episode}` : '',
        value: { season, episode },
        lastSeasonEpisode: episodeIndex + 1 === episodes.length,
        lastSeason: seasonIndex + 1 === seasons.length,
      })),
    );

    return acc;
  }, []);

interface Props {
  item: TvQuery['tv'];
  season?: number;
  episode?: number;
  onSubmit: MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
  isLoading: boolean;
}

const WatchedTvForm = ({ item, season, episode, onSubmit, isLoading }: Props) => {
  const seasons = item.seasons || [];
  const options = getSelectOptions(seasons);
  const tvItemId =
    (season && episode
      ? seasons
          .find(({ season_number }) => season_number === season)
          ?.episodes.find(({ episode_number }) => episode_number === episode)?.id
      : '') || '';

  return (
    <div className="flex">
      {item.poster_path && (
        <div className="pr-3">
          <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} width="185" alt={`Poster for ${item.name}`} />
        </div>
      )}
      <Formik<{ review: string; rating: number | null; createdAt: number; tvItemId: string }>
        initialValues={{
          review: '',
          rating: null,
          createdAt: Date.now(),
          tvItemId,
        }}
        // TODO: submitting resetting results in a noop and a warning, adress this
        onSubmit={(values, actions) =>
          onSubmit({
            variables: {
              ...values,
              itemId: item.id,
              itemType: ItemType.Tv,
              tvItemType: values.tvItemId ? TvItemType.Episode : undefined,
              tvItemId: values.tvItemId,
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
          <form onSubmit={handleSubmit} className="flex-grow">
            <FormGroup label="Watched on" labelFor="createdAt">
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
            <FormGroup
              label="Episode"
              labelFor="tvItemId"
              helperText="Empty episode field indicates the whole show"
              style={{ position: 'relative' }}
            >
              <Suggest
                selectedItem={options.find(({ id }) => id === values.tvItemId) || null}
                inputValueRenderer={({ name }) => name}
                itemRenderer={renderEpisode}
                items={options}
                itemListPredicate={itemFilter}
                onItemSelect={({ id }) => setFieldValue('tvItemId', id)}
                noResults={<MenuItem disabled text="Got nothing :(" />}
                popoverProps={{
                  minimal: true,
                  fill: true,
                  usePortal: false,
                  position: PopoverPosition.BOTTOM,
                }}
                inputProps={{
                  placeholder: 'Select an episode',
                  rightElement: (
                    <Tooltip content="Clear selection">
                      <Button icon="cross" minimal onClick={() => setFieldValue('tvItemId', null)} />
                    </Tooltip>
                  ),
                }}
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
            <Button type="submit" fill intent={Intent.PRIMARY} loading={isLoading}>
              Add
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default WatchedTvForm;
