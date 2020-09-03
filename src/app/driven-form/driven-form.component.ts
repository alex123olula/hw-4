import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector   : 'app-driven-form',
    templateUrl: './driven-form.component.html',
    styleUrls  : ['./driven-form.component.scss']
})
export class DrivenFormComponent implements OnInit {
    @ViewChild('drivenForm') drivenForm: NgForm;

    constructor() { }

    ngOnInit(): void {
    }

    onSubmit() {

        if (this.drivenForm.valid) {
            const value = this.drivenForm.value;
            console.log(value);
            this.drivenForm.reset();
        }
    }
}
