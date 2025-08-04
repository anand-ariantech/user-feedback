import { Routes } from '@angular/router';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'feedback/:userId', component: FeedbackFormComponent },
  { path: '**', component: PageNotFoundComponent },
];
