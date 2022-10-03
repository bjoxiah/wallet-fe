/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from '@angular/common';
import { Component, Input,NgModule, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{ (loan_amount && loan_amount > 0) ? (get_monthly_payment()|currency) : 'N/A' }} <br/>
                    <b>Late Payment Fee : {{ (loan_amount && loan_amount > 0) ? (get_late_payment()|currency) : 'N/A' }}</b> <br/>
                </div>`
})
export class Test01Component {
      
    loan_amount:number = 900;
    monthly_payment:number = 200;
    late_payment = 10;

    get_monthly_payment(): number {
        this.monthly_payment = (2/100)*this.loan_amount;
        return this.monthly_payment;
    }

    get_late_payment(): number {
        const monthly_payment = this.get_monthly_payment();
        this.late_payment = (5/100) * monthly_payment;
        return this.late_payment;
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}