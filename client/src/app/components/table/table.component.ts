import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @Input() dataSource: T[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnDefinitions: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSourceMat!: MatTableDataSource<T>;

  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize: number = 10;

  ngOnInit() {
    this.dataSourceMat = new MatTableDataSource(this.dataSource);
    this.dataSourceMat.paginator = this.paginator;
    this.dataSourceMat.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      if (this.dataSourceMat) {
        this.dataSourceMat.data = this.dataSource;
      }
    }
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSourceMat.paginator = this.paginator;
      this.dataSourceMat.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMat.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMat.paginator) {
      this.dataSourceMat.paginator.firstPage();
    }
  }

  onPageSizeChange(event: any) {
    const pageSize = event.value;
    this.pageSize = pageSize;
    if (this.paginator) {
      this.paginator.pageSize = pageSize;
      this.dataSourceMat.paginator!.pageSize = pageSize;
    }
  }
}
