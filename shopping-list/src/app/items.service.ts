import { Injectable } from '@angular/core';
import { Item, items } from './display-items/items';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: Item[] = items;
  constructor() { }

  addItem(item: Item){
    this.items.push(item);
  }
  getItems(){
    return this.items;
  }
  deleteItem(item: Item){
    this.items.filter(i=> i.name === item.name)
  }
  clearItems(){
    return this.items = [];
  }
}
