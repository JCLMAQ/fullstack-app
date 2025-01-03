import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // Set to false for dynamic updates
})
export class FilterArrayPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: string): unknown[] {
    if (!items || !searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => item[key].toLowerCase().includes(searchText));
  }
}

// template usage
// <li *ngFor="let item of items | filter: 'angular': 'name'">{{ item.name }}</li>

// Base on : https://medium.com/@stream2085/angular-pipes-a-guide-to-creating-custom-pipes-e9d17a5657db
