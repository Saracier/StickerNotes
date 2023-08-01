import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesDataService } from '../core/notes-data.service';
import { map } from 'rxjs/operators';
import { INote } from '../interfaces/inote';

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
  // async postNotesToBackend() {
  //   const res = await this.deletePosts();
  //   if (res) {
  //     this.NotesDataService.notes.forEach((element) => {
  //       this.http
  //         .post(
  //           'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
  //           element
  //         )
  //         .subscribe((responseData) => console.log(responseData));
  //     });
  //   }
  // }

  fetchNotesFromBackend() {
    return this.http.get<{ [key: string]: INote }>(
      'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
    );
  }
  // fetchNotesFromBackend() {
  //   const helperArray: { id: number; title: string; text: string }[] = [];
  //   return (
  //     this.http
  //       .get<{ [key: string]: { id: number; title: string; text: string } }>(
  //         'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
  //       )
  //       .pipe(
  //         map(
  //           (responeData: {
  //             [key: string]: { id: number; title: string; text: string };
  //           }) => {
  //             for (const key in responeData) helperArray.push(responeData[key]);
  //             return helperArray;
  //           }
  //         )
  //       )

  //       /*
  //     [{id, title, text}]
  //     */
  //       .subscribe((responseData) => {
  //         this.NotesDataService.notes = [];
  //         responseData.forEach((element) =>
  //           this.NotesDataService.addNewNote(
  //             element.id,
  //             element.title,
  //             element.text
  //           )
  //         );
  //       })
  //   );
  // }

  async deletePosts() {
    return this.http
      .delete(
        'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
      )
      .subscribe((resData) => console.log(resData));
  }
}
