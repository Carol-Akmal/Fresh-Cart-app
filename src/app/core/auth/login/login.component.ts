import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { STORED_KEYS } from '../../constant/storedKey';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)



  errorMessage: WritableSignal<string> = signal<string>('')
  isloading: WritableSignal<boolean> = signal<boolean>(false)


  flag: boolean = true;
  loginForms!: FormGroup
  refSubscription:Subscription=new Subscription()

  ngOnInit(): void {
    this.loginFormInitialization()
  }

  loginFormInitialization(): void {
    this.loginForms= new FormGroup({

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    })

  }

  submitloginForm(): void {

    if (this.loginForms.valid) {
      this.isloading.set(true)

      this.refSubscription.unsubscribe()

      this.refSubscription= this.authService.sendloginData(this.loginForms.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isloading.set(false)
            this.loginForms.reset()

            localStorage.setItem(STORED_KEYS.userToken ,res.token  );
            this.authService.decodeUserToken()
          
          this.errorMessage.set('')
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1000);}
        },



        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.isloading.set(false)
          this.errorMessage.set(err.error.message)



        }
      })
    }

  }
  togglePasswordType(): void {
    this.flag = !this.flag
  }
}
