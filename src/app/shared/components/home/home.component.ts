import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { product } from '../../../core/model/product/product.interface';
import { CardComponent } from '../card/card.component';
import { MainSliderComponent } from "../../../features/home/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "../../../features/home/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "../../../features/home/popular-products/popular-products.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  

}
