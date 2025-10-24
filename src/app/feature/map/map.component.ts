import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  isBtnActivated = signal(true);

  toggleActive() {
    this.isBtnActivated.update((prev) => !prev);
  }
}
