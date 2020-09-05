import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service wroking');
    
  }
  public token1;
  public br;
  tokencall()
  {
    this.token().subscribe(res => {
      let tokend = {} as any;
      tokend = res;
      this.token1=tokend.token;
      //console.log(this.token1);
      this.br='Bearer '+this.token1;
      //console.log(this.br);
    },err=>{
      console.log(err);
      return false;
    });
  }
  token()
  {
    return this.http.get('token');
  }
  getQuery(query: string) {
    
    
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({ Authorization:
        // tslint:disable-next-line:max-line-length
        this.br });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    /* const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      Authorization:
        'Bearer BQBM84nMi7yCsPq3sLeqGPQ1GMIkvpVFCY8iyaHPSyBv4vew3Dt07rFS9cQpRlbhWiwgP_Y9ZBtznuOZTto'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {
      headers
    }).pipe(map(data => data['albums'].items)); */

    return this.getQuery('browse/new-releases?limit=20').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe(map(data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks/?country=ES`)
    .pipe(map(data => data['tracks']));
  }
}
