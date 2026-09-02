import { Component, inject, input, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tms-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  readonly auth = inject(AuthService);
  course = input.required<Course>();
  enrollClicked = output<Course>();
  deleteClicked = output<number>();
}
