import { Component } from '@angular/core';
import { OperationMap } from './calculator.operation/operationMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [OperationMap]
})

export class AppComponent {
  result:string;
  operation:string;
  firstOperand:string;
  secondOperand:string;

  history:Array<any> = [];

  operations:Array<string> = ['-', '+', '*', '/'];
  
  constructor(private operationMap: OperationMap) {
    this.result = '';
  }  

  processInput(value:string):void {
      this.result += value;

      // Set the operands. If there is an operation set, we should set the second operand and viceversa
      if (this.operation) {
        this.secondOperand ? this.secondOperand += value : this.secondOperand = value;
      } else {
        this.firstOperand ? this.firstOperand += value : this.firstOperand = value;
      }
  } 

  clearTotal():void {
      this.result = '';
      this.history = [];
      this.operation = undefined;
      this.firstOperand = undefined;
      this.secondOperand = undefined;
  }

  // I would have implemented in this way. SUPER SIMPLE. But the req said i must use OOP so...
  equal() {
    this.result = eval(this.result.toString());
  }

  setOperation(op:string):void {
    //check for the last character so we dont have multiple operations like 1++---5
    if (this.operations.indexOf(this.result[this.result.length -1]) !== -1 || !this.result) return;

    //if there is a previous operation set, calculare it before setting the new one
    if (this.operation) this.displayResult();

    this.result += op;
    this.operation = op;
  }

  displayResult() {
    if(!this.operation || !this.secondOperand) return;

    this.result = this.operationMap.getOperation(this.operation).runOperation(parseFloat(this.firstOperand), parseFloat(this.secondOperand));

    this.history.push(this.result);

    this.firstOperand = this.result;

    this.operation = undefined;
    this.secondOperand = undefined;
  }

  goBack() {
    if(!this.history.length || this.history.length === 1) return;

    this.history.pop();
    this.result = this.history[this.history.length -1];
    this.firstOperand = this.result;
  }
}
