import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-product-order',
  standalone: true,
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
  imports: [NgFor],
})
export class ProductOrderComponent implements OnInit {
  products: Product[] = [];
  orderItems: { productId: number; quantity: number }[] = [];
  userId: number = parseInt(localStorage.getItem('userId') || '0');
  jwtToken: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts().subscribe((data) => {
      this.products = data;
    });
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  addToOrder(product: Product): void {
    if (product.quantity > 0) {
      const existingItem = this.orderItems.find(
        (item) => item.productId === product.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.orderItems.push({ productId: product.id, quantity: 1 });
      }
      product.quantity--;
    }
  }

  submitOrder(): void {
    if (this.orderItems.length > 0 && this.userId && this.jwtToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`,
      });
      const body = {
        userId: this.userId,
        orderItems: this.orderItems,
      };
      this.http
        .post('http://localhost:8080/api/orders', body, { headers })
        .subscribe((response) => {
          console.log('Order submitted:', response);
          this.orderItems = []; // clear order after submission
        });
    }
  }
}
