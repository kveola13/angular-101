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

  submitted = false;
  onSubmit() { this.submitted = true; }

  model:Item = { description: "" };

  get items() {
    return this.allItems;
  }

  findItem(description: String){
    return this.allItems.find(i=> i.description === description)
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
    this.model.description = ""
  }
  removeItem(item: Item) {
    if (this.items.find(i => i === item)) {
      this.allItems = this.allItems.filter(i => i !== item)
    }
  }

  showFormControls(form: any) {
    return form && form.controls.description &&
    form.controls.description.value;
  }
}
