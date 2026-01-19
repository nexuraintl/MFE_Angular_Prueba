// src/app/components/hello-world/hello-world.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="microfrontend-card">
      <div class="badge">Microfrontend</div>
      <h2>{{ title }}</h2>
      <p class="message">{{ message }}</p>
      
      <div class="counter-section">
        <button class="btn btn-decrement" (click)="decrement()">-</button>
        <span class="counter">{{ counter }}</span>
        <button class="btn btn-increment" (click)="increment()">+</button>
      </div>

      <div class="info">
        <p><strong>Fecha de carga:</strong> {{ loadTime | date:'medium' }}</p>
        <p><strong>Estado:</strong> <span class="status">✓ Activo</span></p>
      </div>
    </div>
  `,
  styles: [`
    .microfrontend-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 16px;
      padding: 2rem;
      color: white;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      position: relative;
      overflow: hidden;
    }

    .microfrontend-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .badge {
      display: inline-block;
      background: rgba(255,255,255,0.3);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }

    h2 {
      margin: 1rem 0;
      font-size: 2rem;
      position: relative;
      z-index: 1;
    }

    .message {
      font-size: 1.1rem;
      margin: 1rem 0 2rem;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }

    .counter-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin: 2rem 0;
      position: relative;
      z-index: 1;
    }

    .counter {
      font-size: 3rem;
      font-weight: bold;
      min-width: 80px;
      text-align: center;
    }

    .btn {
      background: rgba(255,255,255,0.9);
      color: #f5576c;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .btn:hover {
      transform: scale(1.1);
      background: white;
    }

    .btn:active {
      transform: scale(0.95);
    }

    .info {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.3);
      font-size: 0.9rem;
      position: relative;
      z-index: 1;
    }

    .info p {
      margin: 0.5rem 0;
    }

    .status {
      color: #90EE90;
      font-weight: bold;
    }
  `]
})
export class HelloWorldComponent implements OnInit {

  title = '¡Hola Mundo!';
  message = 'Consultando servicio...';
  counter = 0;
  loadTime = new Date();

  private readonly apiUrl =
    'https://apig-pre-qa-functions-new-r2q3xgg.uc.gateway.dev/v1/special/task';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMessageFromApi();
  }

  private loadMessageFromApi(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Reemplaza este token por el real
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1NDRkMGZmMDU5MGYwMjUzMDE2NDNmMzI3NWJmNjg3NzY3NjU4MjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NDU2ODU1NTc5MTkzNDY4MjY4IiwiaGQiOiJuZXh1cmEuY29tIiwiZW1haWwiOiJzdmFsZW56dWVsYUBuZXh1cmEuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIZHluMGpyeFRSeTdrbXFSbzMyaEh3IiwibmJmIjoxNzY4ODM4ODc1LCJpYXQiOjE3Njg4MzkxNzUsImV4cCI6MTc2ODg0Mjc3NSwianRpIjoiNzRmYmYzMmNkOGQyMzA1ZThkOGZiYzkxMmY2ZTIyYjEzNGE4NzBjYiJ9.GrNY5uuxi7C85Gzs0kaxmrZZdCHCqaxyDr2piaTXTvF-rQxi51mIHjEnQ4fCG26KErlPUhrlRqeZc7l96YTJQ-66UzpbAOl48atrQzSUURYG6Ohhz4dxJlbAIIyxAUIEntSEy37neTVjWkAqQG_2vhhNArfzjZ3wAg1AAs4eumiTHjxkGl0KOOGUZTMUiS0tpuRWe2Odyn19hZfV6RK28eiXxZdV75dXtLOBGPWYD1pn9kmLcObpUQo--iLD7JHA48GP8UPP3nGOVNCo61b5LRY82FVx1pE0VQybVp76Gr0hovd1ico2acJ1PEyf1oOQIqwnmP1mSMXl52HYzjcGnQ'
    });

    this.http.post<{ message: string }>(
      this.apiUrl,
       {
      "message": "Test desde Postman para Servicio A"
      }, // body vacío
      { headers }
    ).subscribe({
      next: response => {
        this.message = response.message;
      },
      error: error => {
        console.error('Error en el POST', error);
        this.message = 'Error al consultar el servicio';
      }
    });
  }

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    this.counter--;
  }
}

