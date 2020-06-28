import * as React from 'react';
import { MutationFunction } from 'react-apollo';
import { Formik } from 'formik';
import Rating from 'react-rating';
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

interface EpisodeSelection {
  id: string;
  name: string;
  value: { season: number; episode: number };
  seasonName: string;
  lastSeasonEpisode: boolean;
  lastSeason: boolean;
}
interface ItemSelection {
  id: string;
  name: string;
  seasonName: string;
  lastSeasonEpisode: boolean;
  lastSeason: boolean;
}

const renderEpisode: ItemRenderer<EpisodeSelection> = (episode, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

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
  seasons.reduce((acc: ItemSelection[], { season_number: season, episodes }, seasonIndex) => {
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

const WatchedTvForm: React.FC<Props> = ({ item, season, episode, onSubmit, isLoading }) => {
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
          tvItemId: '',
        }}
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
            <FormGroup label="Episode" labelFor="tvItemId" helperText="Empty episode field indicates the whole show">
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
