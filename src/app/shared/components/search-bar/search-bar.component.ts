import { Component, EventEmitter, Output } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
searchTerm : string = ''
constructor(
  private filterService:FilterService
){}

search(){
 this.filterService.emitSearch(this.searchTerm)
}
}
