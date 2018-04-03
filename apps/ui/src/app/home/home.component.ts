import {Component} from '@angular/core';
import {PeopleService} from '../people.service';
import {Person} from '../person';
import * as Fuse from 'fuse.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  people: Array<Person> = [];
  characterMap = new Map();
  charactersSorted: Array<{ character: string, quantity: number }> = [];
  fuse;
  fuzzyMatches: Array<string> = [];

  static sortByQuantity(a, b) {
    if (a.quantity < b.quantity)
      return 1;
    if (a.quantity > b.quantity)
      return -1;
    return 0;
  }

  constructor(private peopleService: PeopleService) {
  }

  getData() {
    this.peopleService.getPeople()
      .subscribe((result: any) => {
        this.people = result.data;
        this.fuse = new Fuse(this.people, {
          shouldSort: true,
          includeScore: true,
          threshold: 0.5,
          minMatchCharLength: 5,
          keys: ['email_address'],
          id: 'email_address'
        })
      })
  }

  checkCount() {
    this.people.map((person: Person) => {
      person.email_address.split('').map((letter: string) => {
        if (this.characterMap.get(letter)) {
          this.characterMap.set(letter, this.characterMap.get(letter) + 1);
        } else {
          this.characterMap.set(letter, 1);
        }
      })
    });
    const characters = Array.from(this.characterMap.entries());

    for (const [character, quantity] of characters) {
      this.charactersSorted.push({character: character, quantity: quantity});
    }

    this.charactersSorted.sort(HomeComponent.sortByQuantity)
  }

  showFuzzyMatches(matchVal) {
    this.fuzzyMatches = [];
    const possibleMatches = this.fuse.search(matchVal);
    for (const match of possibleMatches) {
      this.fuzzyMatches.push(match['item']);
    }
  }

}
