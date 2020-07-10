import { Component, OnInit } from '@angular/core';
import establishmentData from '../assets/establishment-data.json';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Logex Frontend Test';
  venues: any[] = establishmentData;
  dataSource = new MatTableDataSource;
  cities: string[];
  startYears: string[];
  filters: any = {
    name: '',
    cities: [],
    date: '',
  }
  expandedVenue: any | null;

  ngOnInit(): void {
    this.setFilters();
    
    const cityArr = this.venues.map(venue => venue.location.city);
    this.cities = [...new Set(cityArr)].sort();

    let yearsArr = this.venues.map(venue =>
      venue.dates.startdate && venue.dates.startdate.slice(venue.dates.startdate.length - 4)
    );
    yearsArr = [...new Set(yearsArr)].sort();
    yearsArr.pop();
    this.startYears = yearsArr;
  }

  setFilters(): void {
    this.dataSource = new MatTableDataSource(this.venues);
    this.dataSource.filterPredicate = function (data: any, filters: any): boolean {
      const date = data.dates.startdate;
      return (
        (data.title.toLowerCase().includes(filters.name.toLowerCase().trim()) ||
          data.location.zipcode.toLowerCase().includes(filters.name.toLowerCase().trim())) &&
        (filters.cities.length ? filters.cities.includes(data.location.city) : true) &&
        (filters.date && !date ? false : true) &&
        (filters.date ? Date.parse(date.slice(date.length - 4)) === Date.parse(filters.date) : true)
      )
    }
  }

  handleSearchName(search: string) {
    this.filters.name = search;
    this.dataSource.filter = this.filters;
  }

  handleCitySelect(cities: string[]) {
    this.filters.cities = cities;
    this.dataSource.filter = this.filters;
  }

  handleYearSelect(year: string) {
    this.filters.date = year;
    this.dataSource.filter = this.filters;
  }

  handleClearFilters() {
    this.filters = {
      name: '',
      cities: [],
      date: '',
    }
    this.dataSource.filter = this.filters;
  }
}
