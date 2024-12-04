import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, PopupMessageComponent, FooterComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {
 // workoutPrograms = [
  //   { id: 1, title: 'Weights Training', description: 'Build muscle strength through weights.' },
  //   { id: 2, title: 'Body Weight Training', description: 'Use your own body weight to get fit.' },
  //   { id: 3, title: 'Cardio Program', description: 'Boost endurance with intense cardio.' }
  // ];
  
  //#region "Global Variables."

  showPopup: boolean = false;
  @ViewChild(PopupMessageComponent) popup!: PopupMessageComponent;

  private workoutProgramIndex: number = 0;
  workoutProgramsPerPage: number = 3;

  private coachingProgramIndex: number = 0;
  coachingProgramsPerPage: number = 3;

  formData = {
    name: '',
    email: '',
    goals: ''
  };

  emailFocused = false;
  //#endregion.

  //#region "Programs."
 workoutPrograms = [
    { id: 1, title: 'Full Body Strength (Weights)', description: 'A 3-day full body routine focused on building strength using compound lifts.' },
    { id: 2, title: 'Push/Pull/Legs Split (Weights)', description: 'A 6-day split program targeting specific muscle groups each day for maximum hypertrophy.' },
    { id: 3, title: 'Upper/Lower Split (Weights)', description: 'A 4-day upper and lower body split to balance strength and muscle growth.' },
    { id: 4, title: 'Powerlifting Program (Weights)', description: 'A 5-day powerlifting-focused program with heavy compound lifts for strength gains.' },
    { id: 5, title: 'Hypertrophy Circuit (Weights)', description: 'A 3-day muscle-building circuit with high-rep ranges to boost size and endurance.' },
  
    { id: 6, title: 'Bodyweight Strength Routine', description: 'A 4-day bodyweight workout for strength endurance and core stability.' },
    { id: 7, title: 'Calisthenics Program', description: 'A 5-day advanced body control workout using bodyweight exercises like muscle-ups and pistol squats.' },
    { id: 8, title: 'Full Body Bodyweight Program', description: 'A 3-day program focusing on bodyweight exercises for full-body endurance.' },

    { id: 9, title: 'HIIT Sprint Program (Cardio)', description: 'A 3-day high-intensity sprint routine to improve speed and endurance.' },
    { id: 10, title: 'Cardio Endurance Program', description: 'A 5-day steady-state cardio program aimed at building long-term endurance with running, cycling, and rowing.' }
];


  coachingPrograms = [
    { id: 1, title: 'Field Hockey Program', description: 'Field Hockey program for all ages.' },
    { id: 2, title: 'Rugby program', description: 'Rugby program for under 13 and below.' },
    { id: 3, title: 'Long-Distance Athletics Program', description: 'Boost endurance with intense cardio.' }
  ];
  //#endregion

  constructor(private http: HttpClient, private router: Router) {
    this.workoutProgramIndex = 0;
    this.coachingProgramIndex = 0;
  }

  //#region "Workout & Coaching programs display."
  //Workouts.
  getVisibleWorkoutPrograms(): any[]{
    const startIndex = this.workoutProgramIndex;
    return this.workoutPrograms.slice(startIndex, startIndex + this.workoutProgramsPerPage);
  }

  nextWorkoutProgram(): void{
    const totalPrograms = this.workoutPrograms.length;
    this.workoutProgramIndex = (this.workoutProgramIndex + this.workoutProgramsPerPage) % totalPrograms;
  }

  prevWorkoutProgram(): void{
    const totalPrograms = this.workoutPrograms.length;
    this.workoutProgramIndex = (this.workoutProgramIndex - this.workoutProgramsPerPage + totalPrograms) % totalPrograms;
  }

  getCurrentWorkoutPage(): number{
    return Math.floor(this.workoutProgramIndex / this.workoutProgramsPerPage) + 1;
  }

  getTotalWorkoutPages(): number{
    return Math.ceil(this.workoutPrograms.length / this.workoutProgramsPerPage);
  }

  //Coach
  getVisibleCoachPrograms(): any[]{
    const startIndex = this.coachingProgramIndex;
    return this.coachingPrograms.slice(startIndex, startIndex + this.coachingProgramsPerPage);
  }

  nextCoachProgram(): void{
    const totalPrograms = this.coachingPrograms.length;
    this.coachingProgramIndex = (this.coachingProgramIndex + this.coachingProgramsPerPage) % totalPrograms;
  }

  prevCoachProgram(): void{
    const totalPrograms = this.coachingPrograms.length;
    this.coachingProgramIndex = (this.coachingProgramIndex - this.coachingProgramsPerPage + totalPrograms) % totalPrograms;
  }

  getCurrentCoachPage(): number{
    return Math.floor(this.coachingProgramIndex / this.coachingProgramsPerPage) + 1;
  }

  getTotalCoachPages(): number{
    return Math.ceil(this.coachingPrograms.length / this.coachingProgramsPerPage);
  }
  //#endregion.

  //#region "Download Programs."
  // Navigate to a specific program's detailed page
  viewWorkoutProgram(programId: number): void {
    const fileUrl = this.getWorkoutFileUrl(programId);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = this.getWorkoutFileName(programId);
    link.click();
  }

  getWorkoutFileUrl(programId: number): string{
    switch(programId){
      case 1: return 'assets/training/Workout-1.pdf';
      case 2: return 'assets/training/PPL-Gym-Split.pdf';
      case 3: return 'assets/training/Workout-2.pdf';
      case 4: return 'assets/training/Workout-1.pdf';
      case 5: return 'assets/training/Workout-2.pdf';
      default: return 'assets/training/Workout-1.pdf';
    }
  }

  getWorkoutFileName(programId: number): string{
    switch(programId) {
      case 1: return 'Workout-1.pdf';
      case 2: return 'PPL-Gym-Split.pdf';
      case 3: return 'Workout-2.pdf';
      case 4: return 'Workout-1.pdf';
      case 5: return 'Workout-2.pdf';
      default: return 'Workout-1.pdf';
    }
  }

  viewCoachingProgram(coachingId: number): void {
    const fileUrl = this.getCoachingFileUrl(coachingId);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = this.getCoachingFileName(coachingId);
    link.click();
  }

  getCoachingFileUrl(coachingId: number): string{
    switch(coachingId){
      case 1: return 'assets/training/Coaching-1.pdf';
      case 2: return 'assets/training/Coaching-2.pdf';
      case 3: return 'assets/training/Coaching-3.pdf';
      default: return 'assets/training/Coaching-1.pdf';
    }
  }

  getCoachingFileName(coachingId: number): string{
    switch(coachingId) {
      case 1: return 'Coaching-1.pdf';
      case 2: return 'Coaching-2.pdf';
      case 3: return 'Coaching-3.pdf';
      default: return 'Coaching-1.pdf';
    }
  }
  //#endregion

  //#region "Request for personal program."
  
  onEmailFocus() {
    this.emailFocused = true;
  }
  
  // Handle form submission to request a personalized workout
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { name, email, goals } = this.formData;
      const requestData = { name, email, goals };

      this.http.post<{ message: string }>('http://localhost:3000/request-workout', requestData)
        .subscribe({
          next: (response) => {
            this.popup.show('Workout request sent successfully!');
            // alert(response.message);
            form.reset();
          },
          error: (error) => {
            this.popup.show('Failed to send workout request. Error:');
            
            if (error.error && error.error.message) {
              alert(error.error.message);
            } else {
              this.popup.show('There was an error sending your request. Please try again later.'); // General error message
            }
          }
        });
    } else {
      this.popup.show('Please fill in all required fields.');
    }
  }
  //#endregion

  //Home Page Navigation.
  onHome(): void{
    this.router.navigate(['/home-page']);
  }
  //Products Page Navigation.
  onShop(): void{
    this.router.navigate(['/shop']);
  }
}
