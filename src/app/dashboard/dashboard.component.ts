import {
  Component, ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username = 'yusuf@dogan';
  command = '';
  content = 'Yusuf Doğan';
  @ViewChild('readOnlyCommandLine') readOnlyCommandLine!: TemplateRef<any>;
  @ViewChild('cLine', {static: false}) cLine!: ElementRef<any>;

  containers: any = [];

  constructor(
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient
  ) {
  }

  process(event: any): void {
    if (event.target.value === 'clear') {
      this.containers = [];
    }
    const targetValue = event.target.value;
    if (['help', 'about', 'social', 'clear'].indexOf(targetValue) === -1) {
      this.containers.push({command: targetValue, context: targetValue, answer: '', unRelevantAnswer: ''});
      event.target.value = '';
    } else {
      this.containers.push({command: targetValue, context: targetValue, answer: '', unRelevantAnswer: ''});
      event.target.value = '';
    }
  }


  ngOnInit(): void {
  }

  onBlur() {
    // @ts-ignore
    this.cLine.nativeElement.focus();
  }


}
