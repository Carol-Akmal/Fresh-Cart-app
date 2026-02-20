import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsDetailsService } from '../products/services/model/brands-details/brands-details.service';
import { Brands } from '../products/services/model/brands-interface/brands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
 private readonly brandsDetailsService = inject(BrandsDetailsService)
 brandsList:WritableSignal<Brands[]> = signal<Brands[]>([])

 ngOnInit(): void {
   this.brandsDetailsService.getAllBrands().subscribe({
    next:(res)=>{
      this.brandsList.set(res.data)
      console.log(res.data)},
    error:(err)=>{console.log(err)}
   })
 }
}
