import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>
    import('./modules/auth/auth.module').then(module=>module.AuthModule)
  },
  // {path:'home',component:HomeComponent}
  {path:'home',loadChildren:()=>
    import('./modules/service/service.module').then(module=>module.ServiceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }