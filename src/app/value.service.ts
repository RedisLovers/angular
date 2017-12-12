import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Value } from './value';

@Injectable()
export class ValueService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private valuesUrl = 'http://95.174.100.38:4040/api/form-values';  // URL to web api
  private formsUrl = 'http://95.174.100.38:4040/api/forms';  // URL to web api

  constructor(private http: Http) { }

  getValues(formId: string): Promise<any> {
    return this.http.get(this.valuesUrl + `/${formId}`)
               .toPromise()
               .then(response => response.json() as Value[])
               .catch(this.handleError);
  }


  getForms(): Promise<String[]>{
    return this.http.get(this.formsUrl)
                    .toPromise()
                    .then(response => response.json() as String[])
                    .catch(this.handleError);
  }

  // getHero(id: string): Promise<Value> {
  //   const url = `${this.valuesUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json() as Value)
  //     .catch(this.handleError);
  // }

  // delete(id: number): Promise<void> {
  //   const url = `${this.valuesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }

  // create(name: string): Promise<Value> {
  //   return this.http
  //     .post(this.valuesUrl, JSON.stringify({name: name}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json() as Value)
  //     .catch(this.handleError);
  // }

  update(value: Value, isRedis: Boolean): Promise<Value> {
    const url = `${this.valuesUrl}/${value.FormFieldValueId}`;
    let val = {...value};
    let data = {
      value: val,
      isRedis
    }
    return this.http
      .put(url, data, {headers: this.headers})
      .toPromise()
      .then(() => value)
      .catch(this.handleError);
  }

  updateMultiple(values: Value[], isRedis: Boolean): Promise<Value> {
    const url = `${this.valuesUrl}`;
    let data = {
      values: values,
      isRedis
    }
    return this.http
      .put(url, data, {headers: this.headers})
      .toPromise()
      .then(() => values)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

