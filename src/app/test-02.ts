/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" value="" (ngModelChange)="setField($event)" [(ngModel)]="field"/>'
})
export class TextField {
    field = "";
    @Output() getField = new EventEmitter<string>();

    setField(val: string) {
        this.getField.emit(val);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (getField)="getTextField($event)"></textfield>`
})
export class ChildComponent {
    @Output() getField = new EventEmitter<string>();

    getTextField(value: string) {
        this.getField.emit(value);
    }

}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (getField)="getComponentText($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    getComponentText(value) {
        this.title = value;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};

function output() {
    throw new Error('Function not implemented.');
}
