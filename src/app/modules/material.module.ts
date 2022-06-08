import { NgModule } from '@angular/core';

// Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
     declarations: [

     ],
     imports: [
          MatDialogModule,
          MatInputModule,
          MatFormFieldModule,
          MatProgressBarModule,
          MatChipsModule,
          MatStepperModule,
          MatRadioModule,
          MatProgressSpinnerModule,
          MatSnackBarModule,
          MatSidenavModule,
          MatIconModule,
          MatMenuModule,
          MatTooltipModule,
     ],
     exports: [
          MatDialogModule,
          MatInputModule,
          MatFormFieldModule,
          MatProgressBarModule,
          MatChipsModule,
          MatStepperModule,
          MatRadioModule,
          MatProgressSpinnerModule,
          MatSnackBarModule,
          MatSidenavModule,
          MatIconModule,
          MatMenuModule,
          MatTooltipModule,
     ]
})
export class MaterialModule { }
