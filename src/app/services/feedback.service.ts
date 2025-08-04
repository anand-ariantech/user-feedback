import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Feedback } from "../models/feedback.model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = `${environment.apiBaseUrl}api/user/submit-feedback`;

  constructor(private http: HttpClient) {}

  submitFeedback(userId: string, feedback: Feedback): Observable<any> {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.http.put<any>(url, feedback);
  }
}
