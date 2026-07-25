import { Component, Inject, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserForm } from '../user-form/user-form';
import { DialogService } from './dialog.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog',
  imports: [FormsModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, UserForm],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  @ViewChild(UserForm)
  private formComponent!: UserForm;
  readonly dialogRef = inject(MatDialogRef);

  isFormValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogService: DialogService
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValidityChange(isValid: boolean) {
    this.isFormValid = isValid;
  }

  onSubmit(): void {
    /**
     * If any fields invalid. Mark all inputs to display errors.
     * Else, submit record and close dialog.
     */
    if (this.formComponent.portfolioForm.invalid) {
      this.formComponent.portfolioForm.markAllAsTouched();
      return;
    }
  
    if (this.isFormValid) {
      const record = this.formComponent.portfolioForm.getRawValue();
      /**
       * Calls external free API from Alpha Vantage to get symbol last price
       */
      this.getLastClosePrice(record);
    }
  }

  private getLastClosePrice(record: any): void {
    let transformedRecord: any;
    this._dialogService.getLastClosePrice(record.symbol)
    .pipe(finalize(() => {
      this.dialogRef.close(transformedRecord);
    }))
    .subscribe({
      next: (data) => {
        const currentPrice = data?.['Global Quote']?.['05. price'] || 0;
        transformedRecord = {
          ...record,
          currentPrice
        };
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}