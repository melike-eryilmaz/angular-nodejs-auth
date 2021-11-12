import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: null,
      password: null,
    });
  }

  loginUser() {
    const user = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    this.authService.loginUser(user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token',res.token);
      },
      (err) => console.log(err)
    );
  }
}
