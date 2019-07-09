import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        drinkPreference: new FormControl('', [Validators.required]),
        hobbies: this.formBuilder.array([])
      }
    );
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(formValue['firstname'], formValue['lastname'], formValue['email'], formValue['drinkPreference'], formValue['hobbies'] ? formValue['hobbies'] : []);
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  onAddHobby() {
    const newHobbyControl = new FormControl('', Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get drinkPreference() {
    return this.userForm.get('drinkPreference');
  }

  getHobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

}
