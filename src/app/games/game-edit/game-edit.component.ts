import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetGame , UpdateGame } from '../store/actions/games.actions';
import { getGame } from '../store/reducers/games.reducers';
import {  Game } from '../shared/game';
import { Assignee , listAssigne } from '../shared/assignee';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.sass']
})
export class GameEditComponent implements OnInit {
  game:Game;
  listUpdateAssigne:Assignee[];
  selectedUpdateAssigne:Assignee;

  constructor(private route:ActivatedRoute, private store:Store<AppState>) {
      this.listUpdateAssigne = listAssigne;
  }

  ngOnInit() {
    this.route.params.subscribe( params =>{
        this.store.dispatch(new GetGame(+params['id']))
    })

    this.store.select(getGame).subscribe( game => {
        if(game != null){
            this.game = game
            this.selectedUpdateAssigne = new Assignee;
            this.selectedUpdateAssigne.id =this.game.Assignee
            this.selectedUpdateAssigne.value =this.game.Assignee
        }
    });
  }

  onSaveGame(){
    this.game.Assignee =this.selectedUpdateAssigne.id;
    this.store.dispatch(new UpdateGame(this.game));
  }
}
