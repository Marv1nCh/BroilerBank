import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Broiler Thursday!');
}
