import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly activeModal = signal<'login' | 'register' | 'checkout' | null>(null);

  open(modal: 'login' | 'register' | 'checkout'): void {
    this.activeModal.set(modal);
  }

  close(): void {
    this.activeModal.set(null);
  }
}
