import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {
isSiderBarOPen:boolean=false;
  constructor(
  private toggleService:ToggleService
){}

ngOnInit():void{
  this.toggleService.getIsOpen().subscribe(isOpen=>{
    this.isSiderBarOPen = isOpen
  })
}

}
