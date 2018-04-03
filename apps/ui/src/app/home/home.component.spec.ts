import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {PeopleService} from "../people.service";
import {PeopleServiceMock} from "../people.service.mock";
import {Person} from "../person";

describe('HomeComponent Render Tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: PeopleService,
        useClass: PeopleServiceMock
      }],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update counts of characters with people map', () => {
    component.people = [{email_address: 'abc'} as Person, {email_address: 'aaa'} as Person];
    component.checkCount();

    expect(component.charactersSorted).toEqual([
      {character: 'a', quantity: 4},
      {character: 'b', quantity: 1},
      {character: 'c', quantity: 1}
    ])
  });

  it('should alert when people are not fetched before fuzzy matching', () => {
    spyOn(console, 'log');
    component.showFuzzyMatches('');

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Please fetch people before attempting fuzzy match');
  });

  it('should alert when no value is entered before fuzzy matching', () => {
    spyOn(console, 'log');
    component.people = [{email_address: 'abc'} as Person, {email_address: 'aaa'} as Person];
    component.showFuzzyMatches('');

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Please enter a value to match before attempting fuzzy match')
  });
});
