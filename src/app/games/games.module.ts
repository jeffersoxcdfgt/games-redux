import { NgModule } from '@angular/core';
import { GamesService } from './store/services/games.service';
import { gamesRoutedComponents , GamesRoutingModule} from './games-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects/games.effects';
import  * as gamesReducers from './store/reducers/games.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

export const reducers: ActionReducerMap<any> = {
  games:gamesReducers.reducer,
  router: routerReducer
}

@NgModule({
  imports:[
    SharedModule,
    GamesRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GameEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge:25
    })
  ],
  declarations:[gamesRoutedComponents],
  providers:[ GamesService , TraceService ]
})
export class GamesModule {

}
