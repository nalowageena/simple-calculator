import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  currentNumber = '0'; //gets the current number which is entered
  firstOperand = ''; // contains the recent value entered before the operation
  tmp = '0'; // displays the operation on the calculator screen
  operator = ''; // contains the operator + - * / =
  waitForSecondNumber = false; // turns true when the next number after an operation has been entered
  result = '';
  doneCalculation = false;

  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = '0'; // before the second number is entered, current value is emptied
      this.waitForSecondNumber = false;
    }
    this.currentNumber === '0'
      ? (this.currentNumber = v)
      : (this.currentNumber += v);

    if (this.tmp === '0' || this.doneCalculation === true) {
      this.tmp = this.currentNumber;
      // this.firstOperand = '';
    } else {
      this.tmp += v;
    }
    this.doneCalculation = false;
  }
  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
      this.tmp += '.';
    }
  }

  private doCalculation(op: string, secondOp: string) {
    // this.tmp = this.firstOperand;
    // this.tmp = this.tmp + op + secondOp;
    this.currentNumber = '0';
    this.firstOperand = '';
    this.waitForSecondNumber = false;
    console.log(this);
    try {
      this.result = eval(this.tmp);
      if((this.result == 'NaN')||(this.result == 'Infinity')){
        this.result = 'Math Error'
      }
    } catch (error) {
      this.result = 'Invalid operation';
    }
    
    return this.result;
  }

  public getOperation(op: string) {
    console.log(op);
    if (this.firstOperand === '') {
      this.firstOperand = this.currentNumber;
    } else if (this.operator !== '') {
      const result = this.doCalculation(this.operator, this.currentNumber);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    if (op === '=') {
      this.doCalculation(this.operator, this.currentNumber);
      this.operator = '';
      this.doneCalculation = true;
      console.log(this.currentNumber);
    } else {
      this.tmp += op;
    }

    console.log(this.firstOperand);
  }

  public clearAll() {
    this.currentNumber = '0';
    this.firstOperand = '';
    this.operator = '';
    this.waitForSecondNumber = false;
    this.tmp = '0';
    this.result = '';
  }
  public clear(){
   
    this.tmp = this.tmp.substring(0, this.tmp.length - 1);
    if(this.tmp === '')
      this.tmp = '0';
    this.currentNumber = this.tmp;
  }

  constructor() {}

  ngOnInit(): void {}
}
