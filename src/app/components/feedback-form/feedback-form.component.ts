import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  imports: [CommonModule, FormsModule, MatChipsModule, MatIconModule],
  styleUrl: './feedback-form.component.css',
})
export class FeedbackFormComponent {
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.userId = params.get('userId') || '';
    });
  }

  ratings: { label: string; value: number }[] = [
    { label: 'Professionalism', value: 0 },
    { label: 'Service Efficiency ', value: 0 },
    { label: 'Response Time', value: 0 },
    { label: 'Product Knowledge', value: 0 },
  ];

  comment: string = '';

  setRating(index: number, value: number) {
    this.ratings[index].value = value;
  }

  submitFeedback() {
    const hasRating = this.ratings.some((r) => r.value > 0);
    const isCommentFilled = this.comment.trim().length > 0;

    if (!hasRating || !isCommentFilled) {
      this.snackBar.open(
        'Please fill the feedback before submitting.',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
      return; // Prevent API call
    }

    const feedback: Feedback = {
      feedback_comments: this.comment,

      user_feedback: {
        professionalism: this.ratings[0].value,
        serviceEfficiency: this.ratings[1].value,
        responseTime: this.ratings[2].value,
        productKnowledge: this.ratings[3].value,
      },
    };

    this.feedbackService.submitFeedback(this.userId, feedback).subscribe({
      next: (res) => {
        console.log('Feedback submitted successfully:', res);
        this.snackBar.open('Feedback submitted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
        this.snackBar.open(
          err?.error?.message || 'Something went wrong.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      },
    });
  }
}
