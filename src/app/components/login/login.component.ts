import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  iniciarSesion() {
    console.log(this.loginForm.value);    
    if (this.loginForm.invalid) {
      

      return;
    }
  }
}
