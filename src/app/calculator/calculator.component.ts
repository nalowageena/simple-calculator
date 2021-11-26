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
  tmp = ''; // displays the operation on the calculator screen
  operator = ''; // contains the operator + - * / =
  waitForSecondNumber = false; // turns true when the next number after an operation has been entered

  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = '0'; // before the second number is entered, current value is emptied
      this.waitForSecondNumber = false;
    }
    this.currentNumber === '0'
      ? (this.currentNumber = v)
      : (this.currentNumber += v);
      this.tmp += this.currentNumber
    }
  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
      this.tmp += this.currentNumber;

    }
  }

  private doCalculation(op:string, secondOp:string) {
    this.tmp = this.firstOperand;
    this.tmp = this.tmp + op + secondOp;
    this.currentNumber='0';
    this.firstOperand='';
    this.waitForSecondNumber=false;
    console.log(this);
    return eval(this.tmp);
  }

  public getOperation(op: string) {
    console.log(op);
    this.tmp += op;
    if (this.firstOperand === '') {
      this.firstOperand = this.currentNumber;
    } else if (this.operator !== '') {
      const result = this.doCalculation(
        this.operator,
        this.currentNumber
      );
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    if(op === '='){
      this.operator='';
    }

    console.log(this.firstOperand);
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = '';
    this.operator = '';
    this.waitForSecondNumber = false;
    this.tmp = '0';
  }

  constructor() {}

  ngOnInit(): void {}
}
