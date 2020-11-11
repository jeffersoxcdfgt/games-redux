import * as fromGames from './games/store/reducers/games.reducers';

export interface AppState {
  games:fromGames.State;
}
