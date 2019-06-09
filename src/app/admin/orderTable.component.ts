import {Component} from '@angular/core';
import {OrderRepository} from '../model/order.repository';
import {Order} from '../model/order.model';

@Component({
  templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
  includeShipped = false;

  constructor(private repository: OrderRepository) { }

  getOrders(): Order[] {
    return this.repository.getOrders().filter(o => this.includeShipped || !o.shipped);
  }

  markShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  delete(id: number) {
    this.repository.deleteOrder(id);
  }
}
