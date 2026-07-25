import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
    /**
     * Application setting shared across all components. 
     * Pattern can be applied for other settings such as language, curreny, user, etc.
     */
    isDarkMode: WritableSignal<boolean> = signal<boolean>(false);

    setBackground(): void {
        const image: string = this.getState() ? 'dark' : 'light';
        document.getElementById('main')!.style.background = `url('/assets/images/bg-${image}.png') no-repeat center center fixed`;
    }

    getState(): boolean {
        return localStorage.getItem('isDarkMode') === 'true';
    }
}
