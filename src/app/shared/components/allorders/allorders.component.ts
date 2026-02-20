import { AllordersService } from './../cart/service/allorders.service';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode'; // استيراد مكتبة فك التشفير
import { STORED_KEYS } from '../../../core/constant/storedKey';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allordersService = inject(AllordersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly plat_id = inject(PLATFORM_ID);

  ordersList: WritableSignal<any[]> = signal<any[]>([]);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      
      
      this.activatedRoute.paramMap.subscribe({
        next: (params) => {
          let userId = params.get('id');

        
          if (!userId) {
            const token = localStorage.getItem(STORED_KEYS.userToken);
            if (token) {
              try {
                const decoded: any = jwtDecode(token);
                userId = decoded.id; 
              } catch (error) {
                console.error('Invalid Token:', error);
              }
            }
          }

          
          if (userId) {
            this.getAllUsersOrdersData(userId);
          } else {
            this.isLoading.set(false);
          }
        },
      });
    }
  }

  getAllUsersOrdersData(id: string): void {
    this.allordersService.getAllUsersOrders(id).subscribe({
      next: (res) => {
        
        this.ordersList.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('Error fetching orders:', err);
        this.isLoading.set(false);
      }
    });
  }
}