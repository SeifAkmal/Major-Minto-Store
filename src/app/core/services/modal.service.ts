import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  showLoginModal = signal<boolean>(false);
  showRegisterModal = signal<boolean>(false);

  openLogin(): void {
    this.showLoginModal.set(true);
    this.showRegisterModal.set(false);
  }

  closeLogin(): void {
    this.showLoginModal.set(false);
  }

  openRegister(): void {
    this.showRegisterModal.set(true);
    this.showLoginModal.set(false);
  }

  closeRegister(): void {
    this.showRegisterModal.set(false);
  }
}
