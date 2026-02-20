import { AuthService } from './../../../core/services/authentication/auth.service';
import { Component, computed, inject, Input, input, PLATFORM_ID, Renderer2, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CartService } from '../cart/service/cart.service';
import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { STORED_KEYS } from '../../../core/constant/storedKey';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface language{
  code:string;
  name:string;

}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive , TranslatePipe ,UpperCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
 
export class NavbarComponent {
  @Input ({required:true}) islogin!:boolean;
  
   private readonly flowbiteService = inject(FlowbiteService)
   private readonly authService = inject(AuthService)
   private readonly cartService = inject(CartService)
   private readonly plat_id = inject(PLATFORM_ID)
   private readonly translateService = inject(TranslateService)
   private readonly renderer = inject(Renderer2)



   count:Signal<number>=computed(  ()=>this.cartService.cartCount()  )


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if(isPlatformBrowser(this.plat_id)){
      const token=localStorage.getItem(STORED_KEYS.userToken)
      if (token){
        this.getAllCartData()
      }
    }
  }

  SignOut():void{
    this.authService.userLogOut()
  }

  getAllCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{this.cartService.cartCount.set(res.numOfCartItems)}
    })
  }

  

  isOpen = false;

languages: language[] = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' }
];

selectedLanguage: language = { code: this.translateService.getCurrentLang(), name: 'English' };


toggleDropdown(): void {
  this.isOpen = !this.isOpen;
}

changeLanguage(language: language): void {
  this.selectedLanguage = language;
  this.isOpen = false;
  this.translateService.use(language.code);
  this.renderer.setAttribute(document.documentElement , 'lang' , language.code)

  this.renderer.setAttribute(document.documentElement , 'dir' , language.code=='en' || language.code=='de' ?'ltr' : 'rtl' )

}
}
   