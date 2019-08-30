import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { HomeComponent } from "./client/Components/home/home.component";
import { CategoryComponent } from "./client/Components/category/category.component";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {
    path: "",
    component: ClientComponent,
    loadChildren:()=> import('./client/client.module').then(mod=>mod.ClientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
