import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  standalone: true,
  imports: [NgClass],
  templateUrl: './radiobutton.component.html',
  styleUrl: './radiobutton.component.css',
})
export class RadiobuttonComponent {
  @Input() textLabel: string = '';
  @Input() id: string = '';
  @Input() isSelected: boolean = false;
  @Output() radioChange: EventEmitter<void> = new EventEmitter();
  toggleSelection() {
    this.radioChange.emit();
  }
}
