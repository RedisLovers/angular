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
  redisValues: Value[] = [];
  mssqlValues: Value[] = [];
  formFieldDefinitions: Object;
  forms: Object[];
  currentFormId: string = "";
  constructor(private valueService: ValueService) {
    this.forms = []
  }

  ngOnInit(): void {
    this.valueService.getForms()
    .then(forms => this.forms = forms);
  }

  formSelected(): void {
    this.valueService.getValues(this.currentFormId)
    .then(data=> {
      this.redisValues = data.redis.sort(sortByFormFiledValueId);
      this.mssqlValues = data.mssql.sort(sortByFormFiledValueId);
      this.formFieldDefinitions = data.formFieldDefinitions;
    });
  }

  updateRedis(): void {
    this.valueService.updateMultiple(this.redisValues, true);
  }

  updateSql(): void {
    this.valueService.updateMultiple(this.mssqlValues, false);
  }
}

function sortByFormFiledValueId(a,b) {
  if (a.FormFieldDefinitionId < b.FormFieldDefinitionId)
    return -1;
  if (a.FormFieldDefinitionId > b.FormFieldDefinitionId)
    return 1;
  return 0;
}
