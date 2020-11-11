import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Game } from '../../shared/Game';
import  * as gameActions from '../actions/games.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Game[];
  selected:Game;
  action:string;
  done:boolean;
  error?:Error;
}

const initialState: State  = {
  data:[],
  selected:null,
  action:null,
  done:false,
  error:null
}

export function reducer (state = initialState , action :AppAction){
    switch(action.type){
      case gameActions.GET_GAMES:
        return {
          ...state,
          action: gameActions.GET_GAMES,
          done:false,
          selected:null,
          error:null
        }
      case gameActions.GET_GAMES_SUCESSS:
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      case gameActions.GET_GAMES_ERROR:
        return {
          ...state,
          done:true,
          selected:null,
          error:action.payload
        }
      /*Get Actions By Id*/
      case gameActions.GET_GAME:
          return {
          ...state,
            action: gameActions.GET_GAME,
            done: false,
            selected: null,
            error:  null
          }
      case gameActions.GET_GAME_SUCCESS:
        return {
            ...state,
            selected: action.payload,
            done: true,
            error:  null
        }
      case gameActions.GET_GAME_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error:  action.payload
        }
      case gameActions.CREATE_GAME:
        return {
          ...state,
          selected: action.payload,
          action: gameActions.CREATE_GAME,
          done: false,
          error:  null
        }
      case gameActions.CREATE_GAME_SUCCESS:
        const newGame = {
          ...state.selected,
          id: action.payload
        }
        const data = [
          ...state.data,
          newGame
        ]
        return {
          ...state,
          data,
          selected: null,
          done: true,
          error:null
        }
     case gameActions.CREATE_GAME_ERROR:
          return {
            ...state,
            selected: null,
            done: true,
            error: action.payload
          }
    case gameActions.UPDATE_GAME:
          return {
            ...state,
            selected: action.payload,
            action: gameActions.UPDATE_GAME,
            done: false,
            error: null
          }
    case  gameActions.UPDATE_GAME_SUCCESS:
            const index = state
            .data
            .findIndex(h => h.id === state.selected.id);
            if (index >= 0) {
              const data = [
                ...state.data.slice(0, index),
                state.selected,
                ...state.data.slice(index + 1)
              ];
              return {
                ...state,
                data,
                done: true,
                selected: null,
                error: null
              };
            }
            return state;
      case gameActions.UPDATE_GAME_ERROR:
          return {
            ...state,
            done: true,
            selected : null ,
            error: action.payload
          }
      case gameActions.DELETE_GAME:
          const selected = state.data.find(h => h.id === action.payload)
          return  {
            ...state,
            selected,
            action: gameActions.DELETE_GAME,
            done: false,
            error:null
          }
      case gameActions.DELETE_GAME_SUCCESS:
        {
          const data = state.data.filter( h => h.id !== state.selected.id)
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          }
        }
      case gameActions.DELETE_GAME_ERROR:
          return {
            ...state,
            selected: null,
            done:true,
            error:action.payload
          }
      }
    return state;
}

export const getGamesState = createFeatureSelector < State > ('games');
export const getAllGames = createSelector( getGamesState , (state: State ) => state.data);
export const getGame = createSelector( getGamesState , ( state : State ) => {
  if(state.action === gameActions.GET_GAME && state.done){
    return state.selected;
  } else{
    return null;
  }
});
export const isCreated =  createSelector( getGamesState , ( state: State ) =>
  state.action === gameActions.CREATE_GAME && state.done && !state.error);

export const isUpdated = createSelector(getGamesState , (state : State ) =>
  state.action === gameActions.UPDATE_GAME && state.done && !state.error);

export const isDeleted = createSelector(getGamesState , (state: State) =>
  state.action === gameActions.DELETE_GAME && state.done && !state.error);

export const getCreateError = createSelector( getGamesState , (state: State) => {
    return state.action === gameActions.CREATE_GAME
     ? state.error
     : null;
  });

export const getDeleteError = createSelector(getGamesState, (state: State) => {
    return state.action === gameActions.DELETE_GAME
      ? state.error
     : null;
  });

export const getUpdateError = createSelector(getGamesState, (state: State) => {
    return state.action === gameActions.UPDATE_GAME
      ? state.error
     : null;
  });

  export const getGamesError = createSelector(getGamesState, (state: State) => {
    return state.action === gameActions.GET_GAMES
      ? state.error
     : null;
  });

  export const getGameError = createSelector(getGamesState, (state: State) => {
    return state.action === gameActions.GET_GAME
      ? state.error
     : null;
  });

  export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
  export const isRouterLog = createSelector( selectRouterState, router => router.state);
