import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Course, CourseDetail, PagedResponse } from "../models/course.model";

@Injectable({
  providedIn: "root" // ensures the service is available app-wide
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5029/api/v2/courses";

  getAll(page=1, pageSize=50) {
    return this.http.get<PagedResponse<Course>>(this.baseUrl, {
      params: { page: page.toString(), pageSize: pageSize.toString()
    },
  }).pipe(map((p) => p.items));
}

// getAll(page = 1, pageSize = 50) {
//   return this.http.get<any>(this.baseUrl, {
//     params: { page: page.toString(), pageSize: pageSize.toString() }
//   }).pipe(
//     map((response) => {
//       // v1: response has "items"
//       if (response.items) {
//         return response.items;
//       }
//       // v2: response is a raw array
//       if (Array.isArray(response)) {
//         return response;
//       }
//       // fallback: if you wrapped v2 into { data: [...] }
//       if (response.data) {
//         return response.data;
//       }
//       return [];
//     })
//   );
// }

  getById(id: string) {
    return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
  }
}
