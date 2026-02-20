import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)



  errorMessage: WritableSignal<string> = signal<string>('')
  isloading: WritableSignal<boolean> = signal<boolean>(false)

  flag: boolean = true;

  registerForms!: FormGroup

  RefSubscription:Subscription=new Subscription()
  ngOnInit(): void {
    this.registerFormInitialization()
  }
 
  registerFormInitialization(): void {
    this.registerForms = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
    }, { validators: this.handleConfirmPassword })
  }

  handleConfirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value ? null : { mismatch: true }
  }

  submitRegisterForm(): void {

    if (this.registerForms.valid) {
      this.isloading.set(true)

      this.RefSubscription.unsubscribe()

      this.RefSubscription=  this.authService.sendRegisterData(this.registerForms.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isloading.set(false)
            this.registerForms.reset()
          }
          this.errorMessage.set('')
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000);
        },



        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.isloading.set(false)
          this.errorMessage.set(err.error.message)



        }
      })
    }
    else {
      Swal.fire({
        icon: "error",
        title: "OoOoPs...",
        text: "Something went wrong!!",

      });
    }
    this.showFirstError()
  }



  showFirstError(): void {
    const controls = this.registerForms.controls;
    for (const controlName in controls) {
      const control = controls[controlName]
      if (control.invalid) {
        control.markAsTouched();
        break;
      }

    }

  }
  togglePassType(): void {
    this.flag = !this.flag
  }
}
