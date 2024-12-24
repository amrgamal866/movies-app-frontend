import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone : true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  private apiUrl: string = 'http://localhost:8080/api/auth/login'; // Change this to your API endpoint

  constructor(private router: Router,private http:HttpClient) {}

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password,
    };
    this.http.post(this.apiUrl, loginData).subscribe(
      (response:any) => {
        console.log("response");
        console.log(response);
        
        // If login is successful, store the JWT token and navigate to the appropriate dashboard
        localStorage.setItem('token', response.token); // Store the token in localStorage (or sessionStorage)

        // Check user type and redirect accordingly
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'USER') {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        // Handle login failure
        this.loginError = 'Invalid credentials. Please try again.';
      }
    );
  }
}
