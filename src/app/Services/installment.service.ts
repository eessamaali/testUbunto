import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { Installment } from '../Models/installment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  public $subject = new Subject<Installment>();
  constructor(private http:HttpClient) { }

  calculateInstallments(gross:number, numberInstallments:number):Observable<any>{
    var url:string = "https://localhost:44303/api/installment"
    var payload = {Gross:gross,NumberInstallments:numberInstallments}
    return this.http.post(url,payload);
  }


  formatTwoDecimalPlaces(str:string){
    var index =str.indexOf(".");
    if(index>0){ // input is a decimal
      if((str.substring(index,str.length)).length>1){
        var newNumber = (str.substring(0,index+3));  // keep oly two decimal 
        return newNumber;
      } else{
        var newNumber = (str.substring(0,index+2));   // if we have only decimal place then we add zero
        return newNumber+'0'; //
      }
      
    } 
    else{
      return str;
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

 

    calcInstallment(gross:Number,numberOfInstallment:Number,result:Installment ){
 
    if(gross<0){
      // this.numberOfInstallment = 1;
      result.gross = gross;
      result.installment1 = gross;
    }
    
    else{
      // gross less than 100: gross is paid in first installment
      // the other installment will be zero based on # of installment
      if(gross<100 && numberOfInstallment>1){ 
        result.installment1 = gross;
        if(numberOfInstallment==2) {
          result.installment2 = 0;
        }
        if(numberOfInstallment==3){
          result.installment2 = 0;
          result.installment3 = 0;
        }       
        if(numberOfInstallment ==4){ 
                result.installment2 = 0;
                result.installment3 = 0;
                result.installment4 =0 
                }
      } else{// other amount greated tahn 100
        
      // get equal installments
      // keep all three decimal point before start formating
        let temp = (Number(gross)/Number(numberOfInstallment)).toFixed(3); 
        let equal  = this.formatTwoDecimalPlaces(temp)
        
        // find if there is uneven fraction installment
        var remaining = Number(gross) - Number(equal)*Number(numberOfInstallment) 
        // all installment are divided by # installment evenly and there is no more that two decimal places
        if(remaining ==0){ 
          result.installment1 = equal;
        } else{ //
          result.installment1 = ((Number(equal)+remaining).toFixed(2))
        }
        //calculate the amount for each installment based on # installments
        for(let i=1;i<=numberOfInstallment;i++){
         if(i==2){
          result.installment2 = equal;
          } else if(i==3){
            result.installment3 = equal;
          } else if (i==4){
            result.installment4 = equal;
          }
        }
      }
    }
    result.gross=gross;
    result.numberOfInstallments=numberOfInstallment
    this.$subject.next(result)
  
 

    
  }
  clearParameter(installment: Installment){
    installment.installment1=null;
    installment.installment2= null;
    installment.installment3  = null;
    installment.installment4 = null;
  }
}
