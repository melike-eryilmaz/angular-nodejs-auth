import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  
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
   // console.log("xxxx",this.registerForm.controls);
    
  }
}
