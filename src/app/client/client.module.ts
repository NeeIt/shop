import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { HeaderComponent } from "./header/header.component";
import { CategoryComponent } from "./category/category.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    ClientComponent,
    HeaderComponent,
    CategoryComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [CommonModule, ClientRoutingModule]
})
export class ClientModule {}
