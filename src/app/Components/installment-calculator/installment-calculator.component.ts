import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InstallmentService } from 'src/app/Services/installment.service';

@Component({
  selector: 'app-installment-calculator',
  templateUrl: './installment-calculator.component.html',
  styleUrls: ['./installment-calculator.component.css']
})
export class InstallmentCalculatorComponent implements OnInit {

installments:number[] = [1,2,3,4];
gross:number = 0;
installment:number = 0;
numberOfInstallment = 0;
firstInstallment:any;
secondInstallment:any;
thirdInstallment :any;
fourthInstallment :any;
errorMessage:any;
errorState:boolean=false;

  constructor( private installmentService:InstallmentService,private fb:FormBuilder) { }

  form = this.fb.group({  
    numberOfInstallment: new FormControl('', [Validators.required]) ,
    gross: new FormControl("",[Validators.required]) 
  });  
    
  ngOnInit(): void {
  this.form.valueChanges.subscribe(res=>{
    this.gross = res.gross;
    this.errorState = this.installmentService.IsInvalidInput(this.gross);
    if(this.errorState){
      this.errorMessage = "Error, invalid Input " // set the error message
    } else{
      this.errorMessage = ""; // clear the error
    }
    this.numberOfInstallment = res.numberOfInstallment
  })
}
  onCalc(){
    this.clearParameter() // clear table installments 
    // check if gross is negative => process a refund in one installment
    if(this.gross<0){
      // this.numberOfInstallment = 1;
      this.installment = this.gross;
      this.firstInstallment = this.gross;
    }
    
    else{
      // gross less than 100: gross is paid in first installment
      // the other installment will be zero based on # of installment
      if(this.gross<100 && this.numberOfInstallment>1){ 
        this.firstInstallment = this.gross;
        if(this.numberOfInstallment==2) {
          this.secondInstallment = 0;
        }
        if(this.numberOfInstallment==3){
          this.secondInstallment = 0;this.thirdInstallment = 0;
        }       
        if(this.numberOfInstallment ==4){ 
                this.secondInstallment = 0;
                  this.thirdInstallment = 0;
                  this.fourthInstallment =0 
                }
      } else{// other amount greated tahn 100
        
      // get equal installments
        var temp = (this.gross/this.numberOfInstallment)
        var equal:number  = this.installmentService.formatTwoDecimalPlaces(temp)
        
        // find if there is uneven fraction installment
        var remaining = this.gross - equal*this.numberOfInstallment 
        // all installment are divided by # installment evenly and there is no more that two decimal places
        if(remaining ==0){ 
          this.firstInstallment = equal.toFixed(2);
        } else{ //
          this.firstInstallment = (equal+remaining).toFixed(2)
        }
        //calculate the amount for each installment based on # installments
        for(let i=1;i<=this.numberOfInstallment;i++){
         if(i==2){
            this.secondInstallment = equal.toFixed(2);
          } else if(i==3){
            this.thirdInstallment = equal.toFixed(2);
          } else if (i==4){
            this.fourthInstallment = equal.toFixed(2);
          }
        }
      }
    }
  }
  clearParameter(){
    this.firstInstallment=null;
    this.secondInstallment= null;
    this.thirdInstallment  = null;
    this.fourthInstallment = null;
  }
}
