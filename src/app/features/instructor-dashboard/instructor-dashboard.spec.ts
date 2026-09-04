import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { InstructorDashboard } from './instructor-dashboard';
import { LiveSyncService } from '../../services/live-sync.service';

describe('InstructorDashboard', () => {
  let component: InstructorDashboard;
  let fixture: ComponentFixture<InstructorDashboard>;

  beforeAll(() => {
    (globalThis as any).IntersectionObserver = class IntersectionObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
      unobserve() {}
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDashboard],
      providers: [
        provideRouter([]),
        {
          provide: LiveSyncService,
          useValue: {
            events$: of(),
            connect: () => {},
            disconnect: () => {},
            on: () => of(null),
            off: () => {},
            stream: () => of(null),
            hubConnection: null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});