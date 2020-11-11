import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Game } from '../shared/game';
import { getGame } from '../store/reducers/games.reducers';
import {  Observable  } from 'rxjs';
import {  GetGame } from '../store/actions/games.actions';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.sass']
})
export class GameDetailComponent implements OnInit {

  game:Observable<Game>;

  constructor(private route: ActivatedRoute ,
              private store: Store<AppState>){
  }

  ngOnInit() {
      this.route.params.subscribe( params => {
          this.store.dispatch(new GetGame(+params['id']))
      });
      this.game=this.store.select(getGame);
  }
}
