import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  constructor() { }

  formatTwoDecimalPlaces(n:number){
    var str = n.toString();
    var index =str.indexOf(".");
    if(index>0){ // input is a decimal
      var newNumber = (str.substring(0,index+3));  
      return parseFloat(newNumber);
    } 
    else{
      return n;
    }
      
    
  }
  IsInvalidInput(input:any){
    input = input.toString();
    var index =input.indexOf(".");

    if(index>0){ // input has a decimal point
      var state = (input.substring(index+1,input.length)).length>2; // state will be true if more than two decimal places
      if(state){ // true it is an error
        return true;
      } 
      else{
        return false;
      }
     
    }
    return false; // nothing to check, no error on decimal input
  }
}
