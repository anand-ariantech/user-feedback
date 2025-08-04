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


// export type PurchasePotential = 'Definitely' | 'Very likely' | 'Likely' | 'Not Likely';

// export type TimeFrame = '< 15 days' | '15 days – 3 months' | '3 – 6 months' | '> 6 months';

