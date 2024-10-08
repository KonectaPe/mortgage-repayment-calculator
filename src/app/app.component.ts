import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { ButtonComponent } from './components/button/button.component';
import { NgClass } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { parse } from 'path';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InputComponent,
    RadiobuttonComponent,
    ButtonComponent,
    NgClass,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mortgage-repayment-calculator';
  selectedRadioId: string = '';
  amount: string = '';
  term: string = '';
  rate: string = '';
  // errors: boolean = false;
  errorAmount: boolean = false;
  errorTerm: boolean = false;
  errorRate: boolean = false;
  errorTypeOperation: boolean = false;
  showResults: boolean = false;
  monthlyPayment: string | undefined;
  totalRepayment: string | undefined;

  @ViewChild('amountInput') amountInput!: InputComponent;
  // @ViewChild('termInput') termInput!: InputComponent;
  // @ViewChild('rateInput') rateInput!: InputComponent;

  onRadioChange(newId: string) {
    this.selectedRadioId = newId;
    this.errorTypeOperation = false;
  }
  submit(): void {
    if (this.amount === '') {
      // this.amountInput.focus();
      this.errorAmount = true;
    } else {
      this.errorAmount = false;
    }
    if (this.term === '') {
      // this.termInput.focus();
      this.errorTerm = true;
    } else {
      this.errorTerm = false;
    }
    if (this.rate === '') {
      // this.rateInput.focus();
      this.errorRate = true;
    } else {
      this.errorRate = false;
    }
    if (this.selectedRadioId === '') {
      this.errorTypeOperation = true;
    } else {
      this.errorTypeOperation = false;
    }

    if (
      !this.errorAmount &&
      !this.errorTerm &&
      !this.errorRate &&
      !this.errorTypeOperation
    ) {
      switch (this.selectedRadioId) {
        case 'repayment':
          this.calculateRepayment();
          this.showResults = true;
          break;
        case 'interestOnly':
          this.calculateRepayment();
          this.showResults = true;
          break;
        default:
          break;
      }
    } else {
      console.error('Error');
    }
  }
  reset(): void {
    this.amountInput.focus();
    this.amount = '';
    this.term = '';
    this.rate = '';
    this.selectedRadioId = '';
    this.errorAmount = false;
    this.errorTerm = false;
    this.errorRate = false;
    this.errorTypeOperation = false;
    this.showResults = false;
  }
  calculateRepayment(): void {
    const numberAmount = parseFloat(this.amount);
    const numberRate = parseFloat(this.rate);
    const numberTerm = parseFloat(this.term);
    const r = numberRate / 100 / 12;
    const n = numberTerm * 12;
    if (this.selectedRadioId === 'repayment') {
      const r = numberRate / 100 / 12;
      const n = numberTerm * 12;
      const monthlyPaymentRaw =
        (numberAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const totalRepaymentRaw = monthlyPaymentRaw * n;

      this.monthlyPayment = monthlyPaymentRaw.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.totalRepayment = totalRepaymentRaw.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else if (this.selectedRadioId === 'interestOnly') {
      const monthlyPaymentRaw = (numberAmount * (numberRate / 100)) / 12;
      const totalRepaymentRaw = monthlyPaymentRaw * (numberTerm * 12);

      this.monthlyPayment = monthlyPaymentRaw.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.totalRepayment = totalRepaymentRaw.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }
}
