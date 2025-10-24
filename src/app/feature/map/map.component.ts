import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    searchCtrl: new FormControl(),
  });

  searchInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  isBtnActivated = signal(false);
  hasInputValue = signal(false);
  showList = signal(false);
  hasGotResult = signal(false);

  ngOnInit() {
    this.setupSearchListener();

    // timer(1000)
    //   .pipe(take(1))
    //   .subscribe(() => {
    //     const searchCtrl = this.form.get('searchCtrl');
    //     if (!searchCtrl) return;

    //     searchCtrl.setValue('民安三路一段');
    //   });
  }

  toggleActive() {
    const current = this.isBtnActivated();
    this.isBtnActivated.update((prev) => !prev);

    if (!current) {
      this.searchInputRef().nativeElement.focus();
    }
  }

  onSelectAddress() {
    const searchCtrl = this.form.get('searchCtrl');
    if (!searchCtrl) return;

    searchCtrl.setValue('民安三路一段185號');
    this.showList.set(false);
    this.hasGotResult.set(true);
  }

  resetSelect() {
    this.hasGotResult.set(false);

    const searchCtrl = this.form.get('searchCtrl');
    if (!searchCtrl) return;
    searchCtrl.setValue('');
  }

  setupSearchListener() {
    const searchCtrl = this.form.get('searchCtrl');

    if (!searchCtrl) return;

    searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.hasInputValue.set(!!value);
        this.showList.set(
          !!value && (value as string).includes('民安三路一段')
        );
      });
  }
}
