import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesDataService } from './notes-data.service';
import { INote } from '../../interfaces/inote';

@Injectable({
  providedIn: 'root',
})
export class HttpMethodsService {
  constructor(
    private http: HttpClient,
    private NotesDataService: NotesDataService
  ) {}

  async postNotesToBackend(element: INote) {
    this.http
      .post(
        'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
        element
      )
      .subscribe((responseData) => console.log(responseData));
  }

  fetchNotesFromBackend() {
    return this.http.get<{ [key: string]: INote }>(
      'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
    );
  }

  async deletePosts() {
    return this.http
      .delete(
        'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
      )
      .subscribe((resData) => console.log(resData));
  }
}
