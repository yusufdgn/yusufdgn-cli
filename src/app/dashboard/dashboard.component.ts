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
  content = 'Komutları görebilmek için "help" yazın.!';
  @ViewChild('readOnlyCommandLine') readOnlyCommandLine!: TemplateRef<any>;
  @ViewChild('cLine', {static: false}) cLine!: ElementRef<any>;

  containers: any = [];
  goApiAnswer = '';
  goApiUnRelevantAnswer = '';

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
      this.http.post<any>('https://yusufdgn.com:/api/question', {question: targetValue}).pipe().subscribe(res => {
        this.containers.push({command: targetValue, context: targetValue, answer: res.Answer, unRelevantAnswer: res.UnrelevantAnswer});
        event.target.value = '';
      }, error => {
        this.containers.push({command: targetValue, context: targetValue, answer: '', unRelevantAnswer: ''});
        // this.containers.push(targetValue);
        event.target.value = '';
      });
    } else {
      this.containers.push({command: targetValue, context: targetValue, answer: '', unRelevantAnswer: ''});
      event.target.value = '';
    }

    // const command = JSON.parse(JSON.stringify(event.target.value));
    // const self = this;
    // const commandLineView = this.viewContainerRef.createEmbeddedView(this.readOnlyCommandLine, {context: 'heeeeelp'});
    // const template = this.getTemplate();
    // const commandView = this.viewContainerRef.createEmbeddedView(template, {context: 'heeeeelp'});
    // setTimeout(() => {
    //   console.log(commandLineView);
    //   // self.content += commandLineView?.rootNodes[0].outerHTML;
    //   // self.content += commandView?.rootNodes[0].outerHTML;
    //   // this.renderer.setProperty(this.mainRef?.nativeElement, 'outerHtml', self.content);
    //   event.target.value = '';
    // }, 10);
  }

  // getTemplate(): TemplateRef<any> {
  //   if (this.command === 'about') {
  //     return this.aboutRef;
  //   } else if (this.command === 'social') {
  //     return this.socialRef;
  //   } else {
  //     return this.helpRef;
  //   }
  // }

  ngOnInit(): void {
  }

  onBlur() {
    // @ts-ignore
    this.cLine.nativeElement.focus();
  }


}
