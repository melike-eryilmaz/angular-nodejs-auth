import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router : Router) {}

  
  registerForm: FormGroup;
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      email: null,
      password: null,
    });
  }
  registerUser() {
    const user = {
      email : this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }
   // console.log("xxxx",this.registerForm.controls);
    this.authService.registerUser(user).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/special']);
      },
      err =>console.log(err)   
    )
  }
}
