import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeFilmsComponent } from './liste-films/liste-films.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListeFilmsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
  filliere = 'GISIBA';
}
