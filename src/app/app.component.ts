import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  data = []
  topicMetadata = []
  endpoint = 'assets/data.json';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(){
     this.http.get(this.endpoint).subscribe((response: any[]) => {
       this.data = response;
       let maxTopicPercent = this.data[0].weight;
       this.data.forEach((value, index) => {
         this.topicMetadata[index] = {
           visible: false,
           percent: value.weight * 100 / maxTopicPercent,
           subTopicPercent : []
         }
         let maxSubTopicPercent = value.topics[0].weight;
         value.topics.forEach((val, idx) => {
          this.topicMetadata[index].subTopicPercent[idx] = val.weight * 100 / maxSubTopicPercent;
         })
       })
     })
  }
}
