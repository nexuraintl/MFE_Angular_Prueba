// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="header">
        <h1>🚀 Aplicación Angular con Microfrontend</h1>
      </header>
      
      <main class="main-content">
        <div class="card">
          <h2>Aplicación Principal (Host)</h2>
          <p>Esta es la aplicación host que carga el microfrontend</p>
        </div>

        <div class="microfrontend-container">
          <app-hello-world></app-hello-world>
        </div>
      </main>

      <footer class="footer">
        <p>Angular v17+ | Microfrontends Architecture</p>
      </footer>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .header h1 {
      margin: 0;
      font-size: 2rem;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .card h2 {
      color: #667eea;
      margin-top: 0;
    }

    .microfrontend-container {
      margin-top: 2rem;
    }

    .footer {
      background: #f7f7f7;
      padding: 1rem;
      text-align: center;
      color: #666;
      margin-top: auto;
    }
  `]
})
export class AppComponent {
  title = 'angular-microfrontend-app';
}