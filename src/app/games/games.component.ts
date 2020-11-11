import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllGames } from './store/actions/games.actions';
import { isCreated , isUpdated , isDeleted ,getDeleteError ,getUpdateError , getGamesError } from './store/reducers/games.reducers';

@Component({
  selector:'app-games',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getGamesError).subscribe((error) => this.loadingError(error));

    this.store.dispatch(new GetAllGames());
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert Game Succesfull');
    });

    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update Game Succesfull');
    });

    this.store.select(isDeleted).subscribe((done) => {
        this.actionSuccess(done,'Delete Game Succesfull');
    });

    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the game');
    });

    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the game');
    });
    //this.store.select(state => state).subscribe(route => console.log('router obj', route));
  }

  /**
   * Display error message if load of games fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of games');
    }
  }

  /**
   * Display success message after execute specific action over the game
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/games']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }

}
