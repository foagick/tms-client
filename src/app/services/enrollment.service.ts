import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private http = inject(HttpClient);
  // private baseUrl = 'http://localhost:5029/api/courses/1/enrollments';
  private baseUrl = 'http://localhost:5029/api/v2/enrollments';

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  // approve(id: string): Observable<void> {
  //   return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  // }
  approve(id: string): Observable<Enrollment> {
  return this.http.post<Enrollment>(`/api/v2/enrollments/${id}/approve`, {});
}
}
