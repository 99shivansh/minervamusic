
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private spotify: SpotifyService) {}
  title = 'app';
  ngOnInit(){
    this.spotify.tokencall();
  }
}
