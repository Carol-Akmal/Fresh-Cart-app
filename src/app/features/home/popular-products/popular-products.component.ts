
import { ProductsService } from '../../../core/services/products/products.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { product } from '../../../core/model/product/product.interface';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);





  productList:WritableSignal<product[]>= signal<product[]> ([])

  ngOnInit(): void {
    this.ProductsService.getAllProducts().subscribe({
      next:(res)=>{
       
        this.productList.set(res.data)
      
      },
      error: (err)=>{
        console.log(err)
      }
      

    })
  }

  
}
