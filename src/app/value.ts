import {FormDefinition} from './form-definition';

export class Value {
  FormFieldValueId: string;
  FormId: string;
  FormFieldDefinitionId: string;
  ValueString: string;
  ValueNumber: string;
  ValueBoolean: string;
  ValueDateTime: string;
  ValueLookupValueId: string;
  formDefinition: FormDefinition;
}


