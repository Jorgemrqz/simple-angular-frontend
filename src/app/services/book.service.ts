import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://192.168.220.140:3000/api/books';
  private commentUrl = 'http://192.168.220.140:3000/api/comments';

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Insertar un libro
  addBook(title: string, author: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title, author });
  }

  // Enviar comentario al autor
  sendComment(title: string, comment: string): Observable<any> {
    return this.http.post<any>(this.commentUrl, { title, comment });
  }
}
