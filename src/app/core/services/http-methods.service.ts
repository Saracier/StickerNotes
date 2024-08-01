/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INote } from '../../interfaces/inote';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class HttpMethodsService {

  // Here is code to use firebase as backend
  // Yet due to a fact, that there were backend shared between users
  // And some notes added by users were rude
  // I had decided to turn it off





  // constructor(private http: HttpClient) {}
  // postNotesToBackendSub: Subscription;
  // fetchNotesFromBackendSub: Subscription;
  // deletePostsSub: Subscription;
  //
  // async postNotesToBackend(element: INote) {
  //   this.http
  //     .post(
  //       'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
  //       element
  //     )
  //     .subscribe({
  //       next: (responseData) => {},
  //       error: (err) => {
  //         console.error(err);
  //       },
  //       complete: () => {},
  //     });
  // }
  //
  // fetchNotesFromBackend() {
  //   return this.http.get<{ [key: string]: INote }>(
  //     'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
  //   );
  // }
  //
  // async deletePosts() {
  //   return this.http
  //     .delete(
  //       'https://stickynotes-3befd-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
  //     )
  //     .subscribe({
  //       next: (responseData) => {},
  //       error: (err) => {
  //         console.error(err);
  //       },
  //       complete: () => {},
  //     });
  // }
  //
  // ngOnDestroy() {
  //   this.postNotesToBackendSub.unsubscribe();
  //   this.fetchNotesFromBackendSub.unsubscribe();
  //   this.deletePostsSub.unsubscribe();
  // }
}
