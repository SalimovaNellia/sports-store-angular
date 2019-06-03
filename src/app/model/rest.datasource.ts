import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import {Product} from './product.model';
import {Cart} from './cart.model';
import {Order} from './order.model';
import 'rxjs/add/operator/map';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http
      .post(this.baseUrl + 'login', {name: user, password: pass}, {observe: 'response'})
      .map(response => {
        let success = response.body['success'];
        this.auth_token = success ? response.body['token'] : null;
        return success;
      });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products', {headers: this.getHeaders()});
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order, {headers: this.getHeaders()});
  }


  getHeaders(auth: boolean = false) {
    if (auth && this.auth_token != null)
      return new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`);
    else
      return new HttpHeaders();
  }
}
