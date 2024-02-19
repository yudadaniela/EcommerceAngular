import { Component } from '@angular/core';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularEcommerce';
  constructor(
    private filterService:FilterService
  ){}
  chooseCategory(category:string, event:Event){
  event?.preventDefault()
   console.log(category);
   this.filterService.emitSearch(category)
  }
}
