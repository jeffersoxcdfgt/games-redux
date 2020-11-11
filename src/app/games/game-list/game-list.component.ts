import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Game } from '../shared/game';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  gamesActions from '../store/actions/games.actions';
import { getAllGames } from '../store/reducers/games.reducers';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})
export class GameListComponent implements OnInit {
  title = 'List Of games';
  games : Observable<Game[]>;


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    //this.games = this.store.select(getAllGames);
    this.games = this.store.select(getAllGames);
    this.games.subscribe( data =>{
          this.games = from(data)
            .pipe(
                distinct((x:Game) => (x.id)),
                toArray()
            )
      });
  }

  /**
   * Delete the selected game
   * @param {number} id the game id
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this Game?')) {
      this.store.dispatch(new gamesActions.DeleteGame(id));
    }
  }
}
