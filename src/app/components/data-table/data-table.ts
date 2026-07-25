import { AssetCategory, CATEGORIES, DISPLAYED_COLUMNS, PAGE_SIZE } from './data-table.constant';
import { Component, computed, effect, input, ViewChild } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PortfolioAsset } from './data-table.model';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-data-table',
  imports: [CurrencyPipe, MatChipsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, NgClass],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected readonly PAGE_SIZE: number[] = PAGE_SIZE;
  protected readonly CATEGORIES: string[] = CATEGORIES;
  protected readonly displayedColumns: string[] = DISPLAYED_COLUMNS;
  
  portfolioData: any = input.required<PortfolioAsset[]>();
  dataSource = new MatTableDataSource<PortfolioAsset>();
  /**
   * Displays the count of assets for each category.
   * E.g. US Stock (5)
   */
  categoryCounts = computed<any>(() => ({
    [AssetCategory.US_STOCK]: this.portfolioData().filter((a: PortfolioAsset) => a.category === AssetCategory.US_STOCK).length,
    [AssetCategory.SG_STOCK]: this.portfolioData().filter((a: PortfolioAsset) => a.category === AssetCategory.SG_STOCK).length,
    [AssetCategory.ETF]: this.portfolioData().filter((a: PortfolioAsset) => a.category === AssetCategory.ETF).length,
    [AssetCategory.REIT]: this.portfolioData().filter((a: PortfolioAsset) => a.category === AssetCategory.REIT).length,
    [AssetCategory.CRYPTOCURRENCY]: this.portfolioData().filter((a: PortfolioAsset) => a.category === AssetCategory.CRYPTOCURRENCY).length,
  }));

  constructor(
    public _themeService: ThemeService
  ) {
    effect(() => {
      this.dataSource.data = this.portfolioData();
    })
  }

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
