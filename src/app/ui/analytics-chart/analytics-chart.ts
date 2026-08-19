import { Component, computed, input } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-analytics-chart',
  standalone: true,
  templateUrl: './analytics-chart.html',
  styleUrl: './analytics-chart.scss',
})
export class AnalyticsChart {

  data = input.required<Enrollment[]>();

  approvedCount = computed(() => this.data().filter(e => e.status === 'Approved').length);
  pendingCount = computed(() => this.data().filter(e => e.status === 'Pending').length);
  rejectedCount = computed(() => this.data().filter(e => e.status === 'Rejected').length);

  approvedHeight = computed(() => Math.max(20, this.approvedCount() * 3));
  pendingHeight = computed(() => Math.max(20, this.pendingCount() * 3));
  rejectedHeight = computed(() => Math.max(20, this.rejectedCount() * 3));


}
