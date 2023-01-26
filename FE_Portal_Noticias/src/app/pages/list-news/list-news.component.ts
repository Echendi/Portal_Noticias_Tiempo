import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';
import { Examples } from './examples';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  paginationSize: number = 10;
  paginationPos: number = 1;
  numbers = [];
  news: News[];
  constructor(private newsService: NewsService) { }
  
  ngOnInit(): void {
    if (sessionStorage.getItem('actualPage')) {
        let actualPage = parseInt(sessionStorage.getItem('actualPage'));
        this.newsService.getNews(actualPage).subscribe(response =>{
        this.news = response;
        this.paginationPos = actualPage;
      })
    }else{
        this.newsService.getNews(1).subscribe(response =>{
        this.news = response;
        });
    }

    this.newsService.getPaginationSize().subscribe(response =>{
      this.paginationSize = response.pages;
      this.numbers =  Array(this.paginationSize).fill(0).map((x, i) => i);
    })
    this.news = new Examples().examples;
  }

  changePage(paginationPos:number){
    this.paginationPos = paginationPos;
    sessionStorage.setItem('actualPage',String(paginationPos));
    this.newsService.getNews(paginationPos).subscribe(response =>{
      this.news = response;
    })
  }

  isPageActive(pagePos:number){
    return pagePos === this.paginationPos;
  }

}
