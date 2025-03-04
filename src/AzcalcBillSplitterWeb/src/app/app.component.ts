import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

interface Cost {
  value: string;
}

interface PersonCost extends Cost {
  name: string;
  sum: number;
}

interface AdditionalCost extends Cost {
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people: PersonCost[] = [{ name: '', value: '0', sum: 0 }];
  additionalCosts: AdditionalCost[] = [{ name: '', value: '0' }];
  totalBill: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  addPerson() {
    this.people = [...this.people, { name: '', value: '0', sum: 0 }];
    this.cdr.detectChanges();
  }

  removePerson(index: number) {
    this.people = this.people.filter((_, i) => i !== index);
    this.calculateSums();
    this.cdr.detectChanges();
  }

  addAdditionalCost() {
    this.additionalCosts = [...this.additionalCosts, { name: '', value: '0' }];
    this.cdr.detectChanges();
  }

  removeAdditionalCost(index: number) {
    this.additionalCosts = this.additionalCosts.filter((_, i) => i !== index);
    this.calculateSums();
    this.cdr.detectChanges();
  }

  sanitizeNumber(value: string): string {
    if (!value) return '0';
    let sanitized = value.replace(',', '.').replace(/[^0-9.\-]/g, '');

    sanitized = sanitized.replace(/(\..*)\./g, '$1');
    sanitized = sanitized.replace(/^(-?)[^0-9]*/, '$1');

    return sanitized || '0';
  }

  sanitizeOnBlur(cost: Cost) {
    cost.value = this.sanitizeNumber(cost.value) || '0';
    this.calculateSums();
  }

  calculateSums() {
    const totalPeopleCost = this.people.reduce(
      (sum, person) => sum + parseFloat(this.sanitizeNumber(person.value)),
      0
    );

    const totalAdditionalCosts = this.additionalCosts.reduce(
      (sum, cost) => sum + parseFloat(this.sanitizeNumber(cost.value)),
      0
    );

    this.totalBill = totalPeopleCost + totalAdditionalCosts;

    const peopleCount = this.people.length;
    const sharedCost = peopleCount > 0 ? totalAdditionalCosts / peopleCount : 0;

    this.people = this.people.map(person => ({
      ...person,
      sum: parseFloat(this.sanitizeNumber(person.value)) + sharedCost
    }));

    this.cdr.detectChanges();
  }

  filterInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9.,-]/g, '');
    event.target.value = inputValue;
  }

  handleFocus(event: any, cost: Cost) {
    const inputField = event.target;

    if (cost.value === '0') {
      cost.value = '';
    } else {
      setTimeout(() => inputField.setSelectionRange(inputField.value.length, inputField.value.length), 0);
    }
  }
}

