import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Order } from '../types/order.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  createOrder(productId: number, userId: number) {
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const newOrder = {
      product: productId,
      user: userId,
      quantity: 1,
    };

    return this.http.post(env.orderApiURL, newOrder, httpOptions);
  }

  updateOrder(existingOrder, n: number) {
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedOrder = {
      ...existingOrder,
      quantity: n,
    };

    return this.http.put(
      `${env.orderApiURL}/${existingOrder.id}`,
      updatedOrder,
      httpOptions
    );
  }

  deleteOrder(orderId) {
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.delete(`${env.orderApiURL}/${orderId}`, httpOptions);
  }

  deleteAllOrder(orderId) {
    return this.http.delete(`${env.orderApiURL}/${orderId}`)
  }

  getOrders() {
    return this.orders;
  }
}
