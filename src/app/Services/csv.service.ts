import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor(private http: HttpClient) {}

  // Fetch and parse CSV data
  fetchCsvData(filePath: string): Observable<any[]> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((csvData: string) => {
        const parsedData: any[] = [];
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            parsedData.push(...result.data);
          },
        });
        return parsedData;
      }),
      catchError((error) => {
        console.error('Error fetching CSV data:', error);
        return throwError(error);
      })
    );
  }

  // Send new CART_ID to the server for validation and update
  updateCartIDOnServer(cartID: string): Observable<any> {
    return this.http.post('http://localhost:3000/update-cart-id', { cartData: { CART_ID: cartID } }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error updating server CSV:', error);
        return throwError(error);
      })
    );
  }

  updateOrderIDOnServer(orderID: string): Observable<any> {
    return this.http.post('http://localhost:3000/update-order-id', { orderData: { ORDER_ID: orderID } }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error updating server CSV:', error);
        return throwError(error);
      })
    );
  }

  //#region "Add Order to CSV file."
  appendToCsv(filePath: string, data: any[]): Observable<void> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((existingData) => {
        const csvHeaders = this.extractHeaders(existingData);
        const csvContent = this.appendRows(existingData, data, csvHeaders);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
      }),
      catchError((error) => {
        console.error('Error reading CSV file:', error);
        throw error;
      })
    );
  }
  
  // Extract headers from existing CSV
  private extractHeaders(csvData: string): string[] {
    const [headerRow] = csvData.split('\n');
    return headerRow.split(',').map((header) => header.trim());
  }
  
  // Append new rows to the existing CSV data
  private appendRows(csvData: string, newData: any[], headers: string[]): string {
    const existingRows = csvData.split('\n');
    const rowsToAdd = newData.map((item) =>
      headers.map((header) => item[header] || '').join(',')
    );
    return [...existingRows, ...rowsToAdd].join('\n');
  }
  
  //#endregion

}
