import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as gameActions from '../actions/games.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllGames ,
GetAllGamesSuccess ,
GetAllGamesError ,
AddGame ,
AddGameSuccess ,
AddGameError,
UpdateGame,
UpdateGameSuccess,
UpdateGameError,
GetGame,
GetGameSuccess,
GetGameError,
DeleteGame,
DeleteGameSuccess,
DeleteGameError
}
from '../actions/games.actions';
import { GamesService } from '../services/games.service';
import { Game } from '../../shared/game';

@Injectable()
export class GameEffects {
  constructor(private actions$:Actions , private svc:GamesService){}

  @Effect()
  public getAllgames$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllGames>(gameActions.GET_GAMES),
        mergeMap((action:GetAllGames) =>
          this.svc.findAll().pipe(
            map((games: Game[]) => new GetAllGamesSuccess(games)),
            catchError(err => of(new GetAllGamesError(err)))
          )
      )
  );

  @Effect()
  public getGame$ : Observable<Action> =  this.actions$.pipe(
      ofType<GetGame>(gameActions.GET_GAME),
        mergeMap((action: GetGame) =>
          this.svc.findById(action.payload).pipe(
            map((game: Game) => new GetGameSuccess(game)),
              catchError(err => of(new GetGameError(err)))
        )
    )
  );

  @Effect()
  public createGame$ :  Observable<Action> = this.actions$.pipe(
      ofType<AddGame>(gameActions.CREATE_GAME),
        mergeMap((action:AddGame) =>
          this.svc.insert(action.payload).pipe(
              map((game:Game) => new AddGameSuccess(game.id)),
              catchError(err => of(new AddGameError(err)))
            )
        )
  );

  @Effect()
  public updateGame : Observable<Action> = this.actions$.pipe(
      ofType<UpdateGame>(gameActions.UPDATE_GAME),
        mergeMap((action:UpdateGame) =>
          this.svc.update(action.payload).pipe(
            map((game:Game) => new UpdateGameSuccess()),
            catchError(err => of(new UpdateGameError(err)))
        )
      )
  );

  @Effect()
  public deleteGame: Observable<Action> =  this.actions$.pipe(
      ofType<DeleteGame>(gameActions.DELETE_GAME),
        mergeMap((action:DeleteGame)  =>
          this.svc.delete(action.payload).pipe(
            map((game: Game) => new DeleteGameSuccess(game)),
            catchError(err => of(new DeleteGameError(err)))
          )
      )
  );

}
