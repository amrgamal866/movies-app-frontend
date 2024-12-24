import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
interface Movice{
  name:string,
  id:string
}
@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  searchQuery: string = '';
  searchResults: any[] = [];
  selectedMovies: any[] = []; 

  constructor(private movieService: MovieService) {}

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery).subscribe((response) => {
      this.searchResults = response.Search;
    });
  }

  selectMovie(movie: any) {
    if (!this.selectedMovies.includes(movie)) {
      this.selectedMovies.push(movie);
    }
  }

  // Deselect a movie if it's already added
  deselectMovie(movie: any) {
    this.selectedMovies = this.selectedMovies.filter(m => m !== movie);
  }
  addMovies() {
    if (this.selectedMovies.length > 0) {
      this.movieService.addMovie(this.selectedMovies).subscribe(() => {
        alert('Movies added successfully');
        this.selectedMovies = [];  // Clear the selected movies after adding
      });
    } else {
      alert('Please select at least one movie to add.');
    }
  }

  deleteSelectedMovies(): void {
    if (confirm('Are you sure you want to delete the selected movies?')) {
      const movieIds = this.selectedMovies.map(movie => movie.id); // Extract movie IDs from selected movies

      // Call the backend to delete the selected movies
      this.movieService.deleteMovies(movieIds).subscribe(
        (response:any) => {
          console.log('Movies deleted successfully:', response);

          // Remove deleted movies from both searchResults and selectedMovies
          this.selectedMovies.forEach(movie => {
            const index = this.searchResults.indexOf(movie);
            if (index !== -1) {
              this.searchResults.splice(index, 1);
            }
          });
          this.selectedMovies = []; // Clear the selection
        },
        (error:any) => {
          console.error('Error deleting movies:', error);
        }
      );
    }
  }
}