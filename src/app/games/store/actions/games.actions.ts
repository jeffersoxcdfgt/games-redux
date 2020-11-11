import { Action } from '@ngrx/store';
import { Game } from '../../shared/game';

export const GET_GAMES = '[All] Games';
export const GET_GAMES_SUCESSS ='[All]  Games Success';
export const GET_GAMES_ERROR ='[All] Games Error';

export const GET_GAME = '[GET] Game';
export const GET_GAME_SUCCESS = '[GET] Game Succes';
export const GET_GAME_ERROR = '[GET] Game Error';

export const CREATE_GAME ='[Create] Game';
export const CREATE_GAME_SUCCESS = '[Create] Game Sucess';
export const CREATE_GAME_ERROR = '[Create] Game Error';

export const UPDATE_GAME = '[Update] Game';
export const UPDATE_GAME_SUCCESS = '[Update] Game Success';
export const UPDATE_GAME_ERROR = '[Update] Game Error';

export const DELETE_GAME = '[Delete] Game';
export const DELETE_GAME_SUCCESS = '[Delete] Game Success';
export const DELETE_GAME_ERROR = '[Delete] Game Error';

//List Games

export class GetAllGames implements Action {
    readonly type = GET_GAMES;
}

export class GetAllGamesSuccess implements Action {
    readonly type  = GET_GAMES_SUCESSS;
    constructor(public payload: Game[]){}
}

export class GetAllGamesError implements Action {
    readonly type = GET_GAMES_ERROR;
    constructor(public payload: Error){}
}

//Get Game by Id

export class GetGame implements Action {
    readonly type = GET_GAME;
    constructor(public payload: number){}
}

export class GetGameSuccess implements Action {
  readonly  type = GET_GAME_SUCCESS;
  constructor(public payload: Game){}
}

export class  GetGameError implements Action {
  readonly type =  GET_GAME_ERROR;
  constructor(public payload: Error){}
}

//Add Game

export class AddGame implements Action {
    readonly type = CREATE_GAME;

    constructor(public payload: Game){}
}

export class AddGameSuccess implements Action {
    readonly type = CREATE_GAME_SUCCESS;

    constructor(public payload: number) {}
}

export class AddGameError implements Action {
    readonly type = CREATE_GAME_ERROR;

    constructor(public payload: Error){}
}

//Update Game

export class UpdateGame implements Action {
    readonly type =  UPDATE_GAME;

    constructor(public payload:Game){}
}

export class UpdateGameSuccess implements Action {
    readonly type = UPDATE_GAME_SUCCESS;
}

export class UpdateGameError implements Action {
    readonly type = UPDATE_GAME_ERROR;

    constructor(public payload: Error){}
}


//Delete Game

export class DeleteGame implements Action {
  readonly  type = DELETE_GAME;

  constructor(public payload: number){}
}

export class DeleteGameSuccess implements Action{
  readonly type = DELETE_GAME_SUCCESS;

  constructor(public payload: Game){}
}

export class DeleteGameError implements Action {
  readonly type = DELETE_GAME_ERROR;

  constructor(public payload:Error){}
}
