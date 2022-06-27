import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export default interface UserModel {

  userType: string;
  status: string;
  userName: string;
  token: string;
  name: string;
  cartDate: Date
  totalPrice:number;
}