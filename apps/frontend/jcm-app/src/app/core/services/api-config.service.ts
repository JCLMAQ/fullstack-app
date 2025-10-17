import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = environment.API_BACKEND_URL || 'http://localhost:3100';
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getFileUrl(relativePath: string): string {
    // Si le chemin commence par /files/, construire l'URL complète
    if (relativePath.startsWith('/files/')) {
      return `${this.apiUrl}${relativePath}`;
    }

    // Si c'est déjà une URL complète, la retourner telle quelle
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    // Pour tout autre cas, retourner le chemin tel quel
    return relativePath;
  }
}
