import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesDataService } from '../services/notes-data.service';
import { NotesArray } from '../notes-array';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpMethodsService {
  constructor(
    private http: HttpClient,
    private NotesDataService: NotesDataService
  ) {}

  async postNotesToBackend() {
    const res = await this.deletePosts();
    if (res) {
      this.NotesDataService.notes.forEach((element) => {
        this.http
          .post(
            'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
            element
          )
          .subscribe((responseData) => console.log(responseData));
      });
    }
  }

  fetchNotesFromBackend() {
    const helperArray: { id: number; title: string; text: string }[] = [];
    return (
      this.http
        .get<{ [key: string]: { id: number; title: string; text: string } }>(
          'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
        )
        // .pipe(
        //   map((responseData) => {
        //     const postsArray: Post[] = [];
        //     for (const key in responseData) {
        //       if (responseData.hasOwnProperty(key)) {
        //         postsArray.push({ ...responseData[key], id: key });
        //       }
        //     }
        //     return postsArray;
        //   }),
        //   catchError((errorRes) => {
        //     // Send to analytics server
        //     return throwError(errorRes);
        //   })
        // )
        .pipe(
          map(
            (responeData: {
              [key: string]: { id: number; title: string; text: string };
            }) => {
              for (const key in responeData) helperArray.push(responeData[key]);
              return helperArray;
            }
          )
        )
        .subscribe((responseData) => {
          console.log(responseData);
          this.NotesDataService.notes = [];
          responseData.forEach((element) =>
            this.NotesDataService.addNewNote(
              element.id,
              element.title,
              element.text
            )
          );
        })
    );
  }

  async deletePosts() {
    console.log('isdeleting');
    return this.http
      .delete(
        'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
      )
      .subscribe((resData) => console.log(resData));
  }
}
