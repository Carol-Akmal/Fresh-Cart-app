
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesDetailsService } from '../products/services/model/categories-details/categories-details.service';
import { Categories } from '../products/services/model/categoriesInterface/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css', 
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesDetailsService = inject(CategoriesDetailsService)
  CategoriesList:WritableSignal<Categories[]> = signal<Categories[]>([])


  ngOnInit(): void {
    this.categoriesDetailsService.getAllcategories().subscribe({
      next: (res) => {  
        this.CategoriesList.set(res.data)
        console.log(res)
      },
      error: (err) => { console.log(err) }
    })
  }
}
