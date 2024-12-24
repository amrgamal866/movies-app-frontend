import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId!: number; 
  movieDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the movie ID from the URL
    this.movieId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fetch movie details using MovieService
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (movie) => {
        this.movieDetails = movie;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.router.navigate(['/user']); // Redirect to user dashboard on error
      }
    });
  }
}
