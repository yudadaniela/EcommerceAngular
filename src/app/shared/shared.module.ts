import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './components/counter/counter.component';
import { RouterModule } from '@angular/router';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';



@NgModule({
  declarations: [
    CounterComponent,
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    SiderBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    SiderBarComponent
  ]
})
export class SharedModule { }
