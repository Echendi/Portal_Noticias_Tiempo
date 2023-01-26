import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../interface/news';
import { Pages } from '../interface/pages';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private urlEndpoint = environment.urlApiNews;
  //Objeto de configuracion de header, especifica en el header de la peticion
  //el tipo de archivo que envia (un Json)
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) { }

  /**
   * Metodo que trae las noticias por paginacion.
   * @param pagination numero de pagina para traer de la api.
   * @returns lista de noticias
   */
  
  getPaginationSize(): Observable<Pages>{
    return this.http.get<Pages>(`${this.urlEndpoint}`);
  }

  getNews(pagination: number): Observable<News[]>{
    return this.http.get<News[]>(`${this.urlEndpoint}/${pagination}`);
  }

  getNewsDetail(paginationPos: number, newsPos:number):Observable<News>{
    return this.http.get<News>(`${this.urlEndpoint}/${paginationPos}/${newsPos}`)
  }

  

}
