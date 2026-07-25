import { Component, inject, signal } from '@angular/core';
import { DataTable } from './components/data-table/data-table';
import { Dialog } from './components/dialog/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import PORTFOLIO_DATA from '../data/data.json'; 

@Component({
  selector: 'app-root',
  imports: [DataTable, RouterOutlet, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fin-lab');
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  
  /**
  * Data source for the table. Read directly from the imported JSON file.
  */
  data = signal(PORTFOLIO_DATA);

  constructor(public _themeService: ThemeService) {

  }

  ngOnInit(): void {
    /**
     * Upon page load, get state from localStorage to determine if table should be dark mode or not.
     */
    this._themeService.setBackground();
  }

  openDialog(): void {
    this.dialog.open(Dialog, {
      data: {
        portfolioData: this.data()
      }
    }).afterClosed().subscribe((newRecord) => {
      /** Append the new record to the front of existing data array */
      if (newRecord) {
        this.openSnackBar();
        const record = {
          ...newRecord,
          id: this.data().length + 1,
          assetName: this.toTitleCase(newRecord.assetName),
          symbol: newRecord.symbol.toUpperCase()
        }
        this.data.update((currentData) => [record, ...currentData]); 
      }

    });
  }

  saveState(event: MatSlideToggleChange): void {
    /** Upon toggling slide toggle, save state to localStorage */
    localStorage.setItem('isDarkMode', event.checked.toString());
    this._themeService.setBackground();
    this._themeService.isDarkMode.set(event.checked);
  }

  private toTitleCase(str: string): string {
    /** Convert string to title case for proper formatting and display purposes
     *  E.g nalgene inc => Nalgene Inc
     */
    const titleCasedString: string = str.trim().split(' ')
      .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');

    return titleCasedString;
  }

  openSnackBar(): void {
    this._snackBar.open("You have successfully added a new record!", "", {
      duration: 3000
    });
  }
}
