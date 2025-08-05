// src/app/models/feedback.model.ts

export interface UserFeedback {
  professionalism: number;
  serviceEfficiency: number;
  responseTime: number;
  productKnowledge: number;
}

export interface Feedback {

  user_feedback: UserFeedback;
  feedback_comments: string;

}

