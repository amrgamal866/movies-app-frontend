import { Component ,OnInit} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  selectedMovies: any[] = [];

  constructor(private MovieService: MovieService) {}

  // Fetch movies from the backend when the component is initialized
  ngOnInit(): void {
    this.getMovies();
  }

  // Get movies from the backend API
  getMovies(): void {
    this.MovieService.getMovies().subscribe((response:any) => {
      this.movies = response.content;
    });
  }

  // Select or deselect a movie
  selectMovie(movie: any): void {
    const index = this.selectedMovies.indexOf(movie);
    if (index === -1) {
      this.selectedMovies.push(movie);
    } else {
      this.selectedMovies.splice(index, 1);
    }
  }

  // Delete selected movies
  deleteSelectedMovies(): void {
    if (confirm('Are you sure you want to delete the selected movies?')) {
      const movieIds = this.selectedMovies.map(movie => movie.id);  // Extract IDs

      this.MovieService.deleteMovies(movieIds).subscribe(
        (response:any) => {
          console.log('Movies deleted successfully:', response);
          this.getMovies();  // Refresh the movie list after deletion
          this.selectedMovies = [];  // Clear the selected movies
        },
        (error:any) => {
          console.error('Error deleting movies:', error);
        }
      );
    }
  }
}
