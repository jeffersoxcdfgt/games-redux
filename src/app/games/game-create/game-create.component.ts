import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddGame } from '../store/actions/games.actions';
import { Game } from  '../shared/game';
import { Assignee , listAssigne } from '../shared/assignee';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.sass']
})

export class GameCreateComponent implements OnInit {
  game:Game = new Game();
  listCretaeAssigne:Assignee[];
  selectedCretaeAssigne:Assignee;

  constructor(private router:Router , private store: Store<AppState>) {
    this.listCretaeAssigne = listAssigne;
  }

  ngOnInit() {
  }
  /**
   * If user is in view mode, back to edit mode else go to games page
   */
   onBack(){
     this.router.navigate(['/games']);
   }

   onSaveGame() {
     this.game.Assignee =this.selectedCretaeAssigne.id;
     this.store.dispatch(new AddGame(this.game));
   }
}
