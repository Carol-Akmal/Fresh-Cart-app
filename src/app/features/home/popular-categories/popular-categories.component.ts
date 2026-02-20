import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from './../../../core/model/categories/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly translateService = inject(TranslateService);

  CategoriesList: WritableSignal<Categories[]> = signal<Categories[]>([]);

  ngOnInit(): void {
    
    this.getAllCategoriesData();
    this.alllangchange()
   
    
  }
     alllangchange():void{
      this.translateService.onLangChange.subscribe({
      next: (data) => {
        this.CategoriesCustomOptions = {
          ...this.CategoriesCustomOptions,
          rtl: data.lang === 'ar' ? true : false
        };
      }
    });
     }  

  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  CategoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
      1120: { items: 6 }
    },
    nav: false,
    rtl: this.translateService.currentLang === 'ar' ? true : false
  };
}