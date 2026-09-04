import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v2.0/enrollments';

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl).pipe(
      map((enrollments) =>
        enrollments.map((enrollment) => ({
          ...enrollment,
          id: String(enrollment.id),
          status: enrollment.status || 'Pending',
        })),
      ),
    );
  }

  approve(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }
}
