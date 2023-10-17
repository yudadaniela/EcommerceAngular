import { ProductHome } from 'src/app/interface/products-home';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  car:ProductHome|undefined
  subscription!: Subscription;
  constructor(
    private apiService:ApiServiceService,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    const id: number | null = Number(this.route.snapshot.paramMap.get('id'));
    
    this.subscription = this.apiService.getDataId(id).subscribe((data)=>{
    this.car=data
    })

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
