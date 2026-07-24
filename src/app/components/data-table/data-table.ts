import { Component, computed, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AssetCategory, CATEGORIES, DISPLAYED_COLUMNS, PAGE_SIZE } from './data-table.constant';
import { PortfolioAsset } from './data-table.model';
import PORTFOLIO_DATA from '../../../assets/data.json'; 

@Component({
  selector: 'app-data-table',
  imports: [CurrencyPipe, MatChipsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected readonly PAGE_SIZE: number[] = PAGE_SIZE;
  protected readonly CATEGORIES: string[] = CATEGORIES;
  protected readonly displayedColumns: string[] = DISPLAYED_COLUMNS;
  
  /**
   * Data source for the table. Read directly from the imported JSON file.
   */
  dataSource = new MatTableDataSource<PortfolioAsset>(PORTFOLIO_DATA);
  /**
   * Displays the count of assets for each category.
   * E.g. US Stock (5)
   */
  categoryCounts = computed<any>(() => ({
    [AssetCategory.US_STOCK]: PORTFOLIO_DATA.filter(a => a.category === AssetCategory.US_STOCK).length,
    [AssetCategory.SG_STOCK]: PORTFOLIO_DATA.filter(a => a.category === AssetCategory.SG_STOCK).length,
    [AssetCategory.ETF]: PORTFOLIO_DATA.filter(a => a.category === AssetCategory.ETF).length,
    [AssetCategory.REIT]: PORTFOLIO_DATA.filter(a => a.category === AssetCategory.REIT).length,
    [AssetCategory.CRYPTOCURRENCY]: PORTFOLIO_DATA.filter( a => a.category === AssetCategory.CRYPTOCURRENCY).length,
  }));

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  selectCategory(category: string) {
    if (this.dataSource.filter === category) {
      this.dataSource.filter = "";
      return;
    }
    this.dataSource.filter = category;
  }
}
