import { Component, OnInit } from '@angular/core';

import { Value }        from './value';
import { ValueService } from './value.service';

const FORM_ID = '9bc4a107-3ef5-4b22-aa2e-00001f3e3820';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  values: Value[] = [];
  currentId: string = "";
  constructor(private valueService: ValueService) { }

  ngOnInit(): void {
    // this.valueService.getValues(FORM_ID)
    //   .then(values => this.values = values);
  }

  search(): void {
    this.valueService.getValues(this.currentId)
    .then(values => this.values = values);
  }

  update(value): void {
    console.log(value);
    this.valueService.update(value);
  }
}
