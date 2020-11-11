import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { Game } from '../../shared/game';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class GamesService {
  protected URL ='http://localhost:3000/api/games';

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Game[]>{
      return this.http.get<Game[]>(this.URL , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched games')),
          catchError(this.traceService.handleError<Game[]>('findAll', []))
      )
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Game> {
    return this.http.get<Game>(this.URL + '/' + id).pipe(
      tap(_ => this.traceService.log(`fetched game id=${id}`)),
      catchError(this.traceService.handleError<Game>(`findById id=${id}`))
    )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Game): Observable<Game>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Game>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newGame:Game) => this.traceService.log(`added game w/ id=${newGame.id}`)),
        catchError(this.traceService.handleError<Game>('insert'))
     )
   }

   /**
    * Update specific object into DB
    * @param game the object to be updated
    * @returns gets the response
    */
   public update(game: Game): Observable<Game> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Game>(this.URL + '/' + game.id, game, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated game id=${game.id}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Game> {
     return this.http.delete<Game>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted game id=${id}`)),
       catchError(this.traceService.handleError<Game>('delete'))
     )
   }
}
