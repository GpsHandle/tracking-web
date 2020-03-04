import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class UniversalStorage {

    private isBrowser: boolean;
    private keys = [];
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    setItem(k: string, v: string) {
        if (this.isBrowser) {
            localStorage.setItem(k, v);
            this.keys.push(k);
        }
    }

    getItem(k: string): string {
        if (this.isBrowser) {
            return localStorage.getItem(k);
        }
    }

    clearAll() {
        localStorage.clear();
    }

    isPlatformBrowser(): boolean {
        return this.isBrowser;
    }
}
