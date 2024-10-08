import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label: string = 'Calculate Repayments';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  onClickButton(): void {
    this.onClick.emit();
  }
}
