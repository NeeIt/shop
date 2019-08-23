import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./Components/home/home.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { HeaderComponent } from "./Components/header/header.component";
import { CategoryComponent } from "./Components/category/category.component";
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BurgerMenuComponent } from './Components/burger-menu/burger-menu.component';
import { NavComponent } from './Components/nav/nav.component';
import { NavService } from './services/nav.service';


@NgModule({
  declarations: [
    HomeComponent,
    ClientComponent,
    HeaderComponent,
    CategoryComponent,
    NotFoundComponent,
    FooterComponent,
    BurgerMenuComponent,
    NavComponent
    
  ],
  imports: [CommonModule, ClientRoutingModule],
  providers:[NavService],
})
export class ClientModule {}
