/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
    selector : 'ng-app',
    template : `<form method="post" class="form">
                    <h2>Login</h2>
                    <div class="form-element">
                        <input type="email" [value]="email" name="email" (keyup)="email = $event.target.value"/>
                        <div class="error" [innerHTML]="emailError"></div>
                    </div>
                    <div class="form-element">
                        <input type="password" [value]="password" name="password" (keyup)="password = $event.target.value"/>
                        <div class="error" [innerHTML]="passwordError"></div>
                    </div>
                    <div class="form-element">
                        <button type="button" (click)="submitForm()" class="btn">Submit</button>
                    </div>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`,
    styles: [`
        .form {
            display: flex;
            flex-direction: column;
            width: 20rem;
            justify-content: center;
            align-items: center;
            margin: 5rem auto;
        }
        .form-element {
            width: 100%;
            margin: 1rem auto auto auto;
            display: flex;
            flex-direction: column;
            input {
                width: 100%;
                padding: 0.5rem;
                border-radius: .3rem
            }
            .error {
                color: red;
                font-size: 0.7rem;
            }
            
        }
        .btn {
            width: 100%;
            outline: none;
            border-radius: .3rem;
            background: #000;
            color: #fff;
            padding: 0.5rem
        }
    `]
})
export class Test03Component {

    email: string = "";
    password: string = "";
    logged_in: boolean = false;
    passwordError: string = "";
    emailError: string = "";

    submitForm() {
        this.emailError = "";
        this.passwordError = "";
        let valid = true;
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
            this.emailError = "Provide a valid email address";
            valid = false;
        }
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password)) {
            this.passwordError = `Password must contain: 
                <br/>1. At least one special character
                <br/>2. One upper case character
                <br/>3. One lower case character
                <br/>4. One number
                <br/>5. A minium of 8 characters in length`;
            valid = false;
        }

        this.logged_in = valid;
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};