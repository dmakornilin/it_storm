import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  openEmailClient(
    to: string,
    subject: string = '',
    body: string = ''
  ): void {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const url = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;

    window.location.href = url;
  }
}
