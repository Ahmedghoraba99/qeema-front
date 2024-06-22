import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-make-order',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet],
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css',
})
export class MakeOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  fetchOrders(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/orders', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
