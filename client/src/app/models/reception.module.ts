import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export default interface ReceptionModel {

  useraName:string , 
  orderDate:Date, 
  shipmentDate:Date,
  adress:string,
  prodName:string, 
  price:number, 
  count:number, 
  id:number,
  creditCard:string,
  const:string
}