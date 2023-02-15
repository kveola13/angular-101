import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemsService } from '../items.service';
import { items } from './items';
@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  constructor(private itemsService: ItemsService, private formBuilder: FormBuilder) { }

  list = this.itemsService.getItems()

  ngOnInit(): void {
  }

  handleClick() {
    console.log("Ping!")
  }

  onSubmit(): void {
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
