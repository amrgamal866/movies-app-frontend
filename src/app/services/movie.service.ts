import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  private getAuthToken(): string | null {
    return localStorage.getItem('token');  // Assuming the token is stored here after login
  }
  searchMovies(query: string,page: number = 1): Observable<any> {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }
    return this.http.get<any>(`${this.apiUrl}/admin/search?query=${query}&page=${page}`, {headers});
  }

  addMovie(movie: any[]) {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }
    return this.http.post(`${this.apiUrl}/admin/add`, movie,{headers});
  }

  getMovies() {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }
    return this.http.get<any>(`${this.apiUrl}/admin/movies`,{headers});
  }
  getMovies1() {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }
    return this.http.get<any>(`${this.apiUrl}/user/movies`,{headers});
  }

  getMovieDetails(id: number) {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }
    return this.http.get<any>(`${this.apiUrl}/user/movies/${id}`,{headers});
  }
  saveRating(movieId: number, rating: number): Observable<any> {
    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }

    const ratingRequest = { movieId, rating };
    return this.http.post(`${this.apiUrl}/user/rate`, ratingRequest,{headers});
  }
  deleteMovies(movieIds: number[]): Observable<any> {

    const token = this.getAuthToken();
    console.log('Token:', token);  // Log token for debugging
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.log('No token found!');  // Log if no token is found
    }

    return this.http.post<any>(`${this.apiUrl}/admin/deleteMovies`, movieIds,{headers});
  }
}
