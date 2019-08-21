import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CategoryComponent } from "./category/category.component";
import { ClientComponent } from "./client.component";
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "category", component: CategoryComponent },
    { path:'404',component:NotFoundComponent},
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path:'**',redirectTo:'/404'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ClientRoutingModule {}
