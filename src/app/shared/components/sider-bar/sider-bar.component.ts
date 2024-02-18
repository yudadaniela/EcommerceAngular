import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent {
@Input() isOpen:boolean=false;
@Output() toggel = new EventEmitter<void>



}
