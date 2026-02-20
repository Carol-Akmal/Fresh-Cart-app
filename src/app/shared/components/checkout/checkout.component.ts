import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly fb=inject(FormBuilder)
  private readonly cartService=inject(CartService)
  private readonly _router = inject(Router)




  cartId:string | null = null

  ngOnInit(): void {
    this.CheckOutFormInitialization()
    this.getCartId();
  }

  CheckOutForm!:FormGroup;

 CheckOutFormInitialization():void{
  this.CheckOutForm=this.fb.group({
   
    shippingAddress: this.fb.group({
      details:[null ,[Validators.required]],
      phone:[null ,[Validators.required ,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
      city:[null ,[Validators.required]]
    }),
  

  })
 }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.cartId=urlParams.get('id')
      }
    })
  }

  onSubmitCheckOutForm():void{
    if(this.CheckOutForm.valid){
      // console.log(this.CheckOutForm.value)
      // console.log(this.cartId)
      this.cartService.checkOutSession(this.cartId , this.CheckOutForm.value).subscribe({
        next:(res)=>{
          if(res.status==='success'){
            window.open(res.session.url , '_self')
          }

        },
        
        
        error:(err)=>{console.log(err)}
      })


    }
  }
onSubmitCashOrder(): void {
  if (this.CheckOutForm.valid) {
    
    this.cartService.createCashOrder(this.cartId, this.CheckOutForm.value.shippingAddress).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this._router.navigate(['/allorders', res.data.user]);
          
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
}
