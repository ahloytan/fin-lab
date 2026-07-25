import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AssetCategory } from '../data-table/data-table.constant';
import { CATEGORIES, DATE_FORMAT } from './user-form.constant';
import { Component, inject, Input, input, output, OutputEmitterRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { TrimDirective } from '../../directive/trim-white-space';

@Component({
  selector: 'app-user-form',
  imports: [MatButtonModule, MatDatepickerModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, TrimDirective],
  templateUrl: './user-form.html',
  providers: [provideLuxonDateAdapter(DATE_FORMAT)], // Angular material by default uses MM/DD/YYYY display. provideLuxonDateAdapter is used to customise format. In this case to DD/MM/YYYY
  styleUrl: './user-form.scss',
})
export class UserForm {
    readonly startDate: Date = new Date();
    private readonly fb: FormBuilder = inject(FormBuilder);
    protected readonly CATEGORIES: string[] = CATEGORIES;
    
    validityChange: OutputEmitterRef<boolean> = output<boolean>();

    @Input() portfolioData: any = []

    portfolioForm: any;

    ngOnInit() {
      this.initForm();

      this.portfolioForm.statusChanges
        .pipe(startWith(this.portfolioForm.status))
        .subscribe(() => {
          /** Emit the validity status to parent (dialog) 
           * If fields are all correctly filled. Form is valid and user can add new record
           * Else, upon clicking 'Add' button, dialog will not close and error messages will be shown
          */
          this.validityChange.emit(this.portfolioForm.valid);
        });
    }

    duplicateValidator(data: any[]): ValidatorFn {
      /** Custom validator to check for duplicate symbols (tickers) 
       * If duplicate found, throw and display 'duplicate' error
      */
      const tickers: string[] = data.map((record) => record.symbol.toUpperCase());
      return (control: AbstractControl): ValidationErrors | null => {
        const symbol: string = control.value.toUpperCase();
        const isDuplicate: boolean = tickers.includes(symbol);
        if (isDuplicate) {
          return { duplicate: true };
        }
        return null;
      };
    }

    private initForm() {
      this.portfolioForm = this.fb.group({
        assetName: this.fb.control('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9\s.'&-]+$/) //Disallow special characters like '@', '#', '$', '%', etc.
        ]),
        symbol: this.fb.control('', [
          Validators.required,
          Validators.maxLength(10),
          this.duplicateValidator(this.portfolioData)
        ]),

        category: this.fb.control<AssetCategory | null>(null, Validators.required),

        quantity: this.fb.control(1, [
          Validators.required,
          Validators.min(1),
        ]),

        averageCost: this.fb.control(50, [
          Validators.required,
          Validators.min(1),
        ]),

        currentPrice: this.fb.control(0, [

        ]),

        purchaseDate: this.fb.control<Date | null>(
          new Date(), //Defaults to current date (today)
          Validators.required
        ),
      })
    }
}
