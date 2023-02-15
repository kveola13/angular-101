import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Item } from './items';
@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent {
  title = "Todo";
  filter: "all" | "active" | "done" = "all";
  disableButton = false;
  allItems = [
    { description: 'eat'},
    { description: 'sleep' },
    { description: 'play'},
    { description: 'laugh'},
  ];

  get items() {
    return this.allItems;
  }

  handleChange(test: any) {
    console.log(test)
  }

  addItem(description: string) {
    if (description) {
      this.allItems.push({
        description
      })
    }
  }
  removeItem(item: Item) {
    if (this.items.find(i => i === item)) {
      this.allItems = this.allItems.filter(i => i !== item)
    }
  }
}
