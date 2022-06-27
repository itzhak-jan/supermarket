import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export default interface ItemModel {
  id: number;
  name: string;
  category?: string;
  price: number;
  img: string;
  categoryID?:number;
}
