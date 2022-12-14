/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
            <div class="app">
                <h2>Enter your first and last name</h2>
                <div class="form">
                    <input type="text" placeholder="First Name" [(ngModel)]="firstName" (blur)="setUserName()"/>
                    <input type="text" placeholder="last Name" [(ngModel)]="lastName" (blur)="setUserName()"/>
                    
                </div>    
                <div>{{userName}}</div>  
            </div>         
                `,
    styles : [`
        .app {        
            width: 500px;
            padding-left: 0.6rem;
        }
        .form {
            display: flex;
            justify-content: center;
            flex-direction: row;
            input {
                margin: 0.6rem 0.6rem auto auto;
                padding: .6rem;
                border-radius: .3rem;
                width: 100%;
            }
        }
    `]
})
export class UserNameComponent {
    firstName: string = "";
    lastName: string = "";
    userName: string = "";

    setUserName() {
        this.userName = "";
        if (this.firstName && this.lastName) {
            this.userName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${Math.floor(Math.random() * 9) + 1}`;
        }
    }
}

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};