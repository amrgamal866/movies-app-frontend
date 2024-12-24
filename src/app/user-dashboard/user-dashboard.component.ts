import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { RouterLink } from '@angular/router';
import { NgFor,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone:true,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  imports: [RouterLink, CommonModule,FormsModule],
})
export class UserDashboardComponent  {
  movies: any[] = [];
  ratings: { [movieId: number]: number } = {};
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies1().subscribe((response:any) => {
      this.movies = response.content;

      this.movies.forEach((movie) => {
        this.ratings[movie.id] = movie.rating || 0; // Default to 0 if no rating is found
      });
    });
  }
  rateMovie(movieId: number, rating: number) {
    this.ratings[movieId] = rating;
    // Call saveRating to update the backend
    this.movieService.saveRating(movieId, rating).subscribe(
      (response:any) => {
        console.log(`Movie ID: ${movieId} rated with: ${rating} stars`);
      },
      (error) => {
        console.error('Error saving rating', error);
      }
    );
  }

}
