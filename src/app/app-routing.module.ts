import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

//Components
import { PageNotFoundComponent } from './shared/not-found/not-found.component';

const routes:Routes = [
  { path:'' , redirectTo:'/games' , pathMatch:'full'},
  {
    path:'games',
    loadChildren:'./games/games.module#GamesModule'
  }
];

@NgModule({
  imports:[RouterModule.forRoot(routes,{useHash:true})],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
