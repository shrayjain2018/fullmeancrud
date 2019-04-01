import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { Item } from '../../model/item';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})

export class ItemlistComponent implements OnInit {
  item: Item[];
  addForm: FormGroup;
  editForm: FormGroup;
  toggle: boolean = false;
  submitted: boolean = false;

  constructor(private itemservice: ItemService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.itemservice.getAllItems().subscribe(data => {
      this.item = data;
    });
    this.addForm = this.formBuilder.group({
      _id: [],
      itemname: ['', Validators.required],
      itemqty: ['', Validators.required],
      itembought: [false, Validators.required]
    });
    this.editForm = this.formBuilder.group({
      _id: [],
      itemname: ['', Validators.required],
      itemqty: ['', Validators.required],
      itembought: [false, Validators.required],
      __v: []
    });
  }

  onAddItem() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.itemservice.addItem(this.addForm.value).subscribe(data => {
      alert('Record Added!');
    });
  }

  toDeleteItem(item: Item): void {
    let result = confirm("Are you sure you want to delete this record?")
    if (result) {
      this.itemservice.deleteItem(item.itemname).subscribe(data => {
        this.item = this.item.filter(u => u !== item);
      })
      alert('Record Deleted!');
    }
  }

  onEditItem() {
    this.itemservice.updateItem(this.editForm.value)
      .pipe(first())
      .subscribe();
    this.toggle = false;
    alert('Record Updated!');
  }

  toUpdateItem(itm) {
    this.toggle = true;
    this.editForm.setValue(itm);
  }

  onCancelEditItem() {
    this.toggle = false;
  }
}
