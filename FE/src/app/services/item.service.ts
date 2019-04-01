import { Injectable } from '@angular/core';
import { Item } from '../model/item'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:1000";

  getAllItems() {
    return this.http.get<Item[]>(this.baseUrl + '/api/items');
  }

  addItem(item: Item) {
    return this.http.post(this.baseUrl + '/api/item', item);
  }

  updateItem(item: Item) {
    return this.http.put(this.baseUrl + '/api/item/' + item.itemname, item);
  }

  deleteItem(itemname: string) {
    return this.http.delete(this.baseUrl + "/api/item/" + itemname);
  }

}
