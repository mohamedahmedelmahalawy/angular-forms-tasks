import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Register],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'day3-forms-tasks';
}
