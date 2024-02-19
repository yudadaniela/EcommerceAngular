import { Component } from '@angular/core';
import { FilterService } from './services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularEcommerce';
  constructor(
    private filterService:FilterService,
    private router:Router
  ){}
  chooseCategory(category:string, event:Event){
   event?.preventDefault()
   console.log(category);
   this.filterService.emitCategory(category)
   this.router.navigate(['/home/homeProducts'],{ queryParams:{category:category}})
  }
}
