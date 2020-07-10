import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  constructor() { }

  @Input() venuesData: any;

  markers: any[] = [];
  lat: number = 52.1326;
  lng: number = 5.2913;

  infoWindowOpened = null;
  previous_info_window = null;

  close_window() {
    if (this.previous_info_window != null) {
      this.previous_info_window.close()
    }
  }

  select_marker(infoWindow) {
    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow
      this.previous_info_window.close()
    }
    this.previous_info_window = infoWindow
  }

  ngOnChanges(): void {
    this.markers = this.venuesData.map(data => {
      return {
        lat: data.location.latitude.replace(/,/g, '.'),
        lng: data.location.longitude.replace(/,/g, '.'),
        name: data.title,
        description: data.details.nl.shortdescription,
        url: data.urls[0],
        image: data.media[0] && data.media[0].url
      }
    });
  }

}
