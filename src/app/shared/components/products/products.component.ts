import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { product } from '../../../core/model/product/product.interface';
import { CardComponent } from "../card/card.component";
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
})
export class ProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);
 


  productList: WritableSignal<product[]> = signal<product[]>([])

  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0
  }

  ngOnInit(): void {
    this.getAllProductsData()
   
  }
  getAllProductsData(): void {
    this.ProductsService.getAllProducts(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (res) => {
       
        this.productList.set(res.data)
        this.pagination.totalItems = res.results

      },
      error: (err) => {
       

        console.log(err)
      }


    })
  }
  pageChanged(page: number): void {
    this.pagination.currentPage = page;
    this.getAllProductsData()
  }
  text: string = ''
}
