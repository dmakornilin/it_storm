import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiRootModule} from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRootModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
