import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export default interface ItemCartModel {

  id: number;
  name: string;
  price: number;
  img: string;
  amount: number;
  productId: number
}