import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { CategoryComponent } from "./Components/category/category.component";
import { ClientComponent } from "./client.component";
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { GoodsComponent } from './Components/goods/goods.component';
import { ItemsComponent } from './Components/items/items.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "category/:name", component: CategoryComponent },
    { path:'404',component:NotFoundComponent},
    { path:"goods/:name",component:GoodsComponent},
    { path:"list",component:ItemsComponent},
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path:'**',redirectTo:'/404'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ClientRoutingModule {}
