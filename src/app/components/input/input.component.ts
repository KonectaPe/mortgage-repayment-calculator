import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass, FormsModule, ErrorComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() textLabel: string = '';
  @Input() direction: string = 'row';
  @Input() value: string = '';
  @Input() error: boolean = false;
  @Input() textTitle: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('inputElement') inputElement!: ElementRef;

  onValueChange(newValue: string): void {
    this.valueChange.emit(newValue);
    if (newValue != '') {
      this.error = false;
    } else {
      this.error = true;
    }
  }
  focus() {
    this.inputElement.nativeElement.focus();
  }
}
