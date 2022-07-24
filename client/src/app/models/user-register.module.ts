import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export default interface UserRegisterModel {
  userName: string,
  mail: string,
  password: string,
  cardID: string,
  city: string,
  adress: string,
  birthDate: string
}