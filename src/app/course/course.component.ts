import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  timeout,
} from "rxjs/operators";
import { merge, fromEvent } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { LessonsDataSource } from "../services/lessons.datasource";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;

  //   dataSource = new MatTableDataSource([]);
  dataSource: LessonsDataSource;

  displayColumns = ["seqNo", "description", "duration"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];

    // this.coursesService
    //   .findAllCourseLessons(this.course.id)
    //   .subscribe((lessons) => {
    //     this.dataSource.data = lessons;
    //   });

    this.dataSource = new LessonsDataSource(this.coursesService);

    this.dataSource.loadLessons(this.course.id, "", "asc", 0, 3);
  }

  ngAfterViewInit() {
    // any time sort order changes, results are set to show page 0
    this.matSort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.matSort.sortChange, this.paginator.page)
      .pipe(
        startWith(null),
        tap(() => {
          this.dataSource.loadLessons(
            this.course.id,
            "",
            // 'asc',
            this.matSort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      )
      .subscribe();
  }

  //   searchLessons(searchStr = "") {
  //     this.dataSource.filter = searchStr.toLowerCase().trim();
  //   }
}
