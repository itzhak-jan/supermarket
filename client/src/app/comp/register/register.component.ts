import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserRegisterModel from 'src/app/models/user-register.module';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersService: UserService, private router: Router) { }

  errorMassege: string = '';
  //--------------------------------------------------

  page01Register: boolean = true;

  mail: string = '';
  userName: string = '';
  password: string = '';
  repeatPassword: string = '';
  birthDate: string = '';

  // ----------------------------------------------
  page02Register: boolean = false;

  adress: string = '';
  city: string = '';
  cardID: string;

  user: UserRegisterModel

  //--------------------------------------------------

  ngOnInit(): void {
  }

  validPage01() {
    this.errorMassege = ''

    if (!this.mail) {
      this.errorMassege += "MailEmpty";
    }
    else if (!this.isMailNotReal()) {
      this.errorMassege += "isMailNotReal";
    }
    if (!this.userName) {
      this.errorMassege += "UserNameEmpty";
    }
    if (!this.password) {
      this.errorMassege += "PasswordEmpty";
    }
    else if (this.password.length < 6) {
      this.errorMassege += "PasswordShort";
    }
    if (this.repeatPassword != this.password) {
      this.errorMassege += "RepeatPasswordNotGood ";
    }
    if (!this.birthDate) {
      this.errorMassege += "BirthDateEmpty";
    }
    if (this.errorMassege != '') {
      return
    }

    this.page01Register = false
    this.page02Register = true

  }

  validPage02() {
    this.errorMassege = ''

    if (!this.adress) {
      this.errorMassege += "adressEmpty";
    }
    if (!this.city) {
      this.errorMassege += "cityEmpty";
    }
    if (!this.cardID) {
      this.errorMassege += "cardIDEmpty";
    }
    else if (this.cardID.toString().length != 9) {
      this.errorMassege += "cardIDNotGood";
    }
    if (this.errorMassege != '') {
      return
    }
    this.user = {
      userName: this.userName,
      mail: this.mail,
      password: this.password,
      cardID: this.cardID,
      city: this.city,
      adress: this.adress,
      birthDate: this.birthDate
    }

    const observable = this.usersService.register(this.user);
    observable.subscribe(Response => {
      this.router.navigate(['/login'])
    },
      error => {
        alert('login failed')
      }
    )
  }

  isMailNotReal(): boolean {
    if (this.mail.includes(`@gmail.`)) {
      return true
    }
    if (this.mail.includes(`@yahoo.`)) {
      return true
    }
    if (this.mail.includes(`@outlook.`)) {
      return true
    }
    return false
  }
}
