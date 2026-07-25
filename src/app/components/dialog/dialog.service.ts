import { API_ENDPOINTS } from '../../core/constants/api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DialogService {
  private http = inject(HttpClient);

  getLastClosePrice(symbol: string): Observable<any> {
    const params = { symbol }
    return this.http.get(API_ENDPOINTS.stock.quote, { params });
  }
}