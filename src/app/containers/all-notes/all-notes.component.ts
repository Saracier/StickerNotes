import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NotesDataService } from '../../core/services/notes-data.service';
import { HttpMethodsService } from '../../core/services/http-methods.service';
import { INote } from 'src/app/interfaces/inote';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss'],
})
export class AllNotesComponent implements OnInit, OnDestroy {
  filteredStatus = '';
  textInputValue = '';
  @ViewChild('titleInputValue', { static: true })
  titleInputValue: ElementRef<HTMLInputElement>;
  inputContainsSomething = false;
  httpMethodsSubscription$: Subscription;
  noteSubscripction$ = this.NotesDataService.notes$.subscribe(
    (notesFromSub) => (this.notes = notesFromSub)
  );
  notes: INote[];

  constructor(
    private NotesDataService: NotesDataService,
    private HttpMethodsService: HttpMethodsService
  ) {}

  ngOnInit() {
    console.log('All notes were shared between users on test account. I had disabled backend due to rude notes added by someone. All notes are stored on session, yet if you want to look on the code implementation it is still kept commented')
    // Here is code to use firebase as backend
    // Yet due to a fact, that there were backend shared between users
    // And some notes added by users were rude
    // I had decided to turn it off

    // this.fetchNotes();
  }

  addNewNote() {
    if (
      this.textInputValue.length === 0 ||
      this.titleInputValue.nativeElement.value.length === 0
    )
      return;
    this.NotesDataService.addNewNote(
      Math.random(),
      this.titleInputValue.nativeElement.value,
      this.textInputValue
    );
    this.textInputValue = '';
    this.titleInputValue.nativeElement.value = '';
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    this.NotesDataService.onDeleteSingleNote(deleteObject);
  }

  async postNotes() {
    alert('All notes were shared between users on test account. I had disabled backend due to rude notes added by someone. All notes are stored on session, yet if you want to look on the code implementation it is still kept commented');
    // Here is code to use firebase as backend
    // Yet due to a fact, that there were backend shared between users
    // And some notes added by users were rude
    // I had decided to turn it off


    // const res = await this.HttpMethodsService.deletePosts();
    // if (res) {
    //   this.NotesDataService.notes$.getValue().forEach((element) => {
    //     this.HttpMethodsService.postNotesToBackend(element);
    //   });
    // }
  }

  fetchNotes() {
    alert('All notes were shared between users on test account. I had disabled backend due to rude notes added by someone. All notes are stored on session, yet if you want to look on the code implementation it is still kept commented');
    // Here is code to use firebase as backend
    // Yet due to a fact, that there were backend shared between users
    // And some notes added by users were rude
    // I had decided to turn it off


    // const helperArray: INote[] = [];
    //
    // this.httpMethodsSubscription$ =
    //   this.HttpMethodsService.fetchNotesFromBackend()
    //     .pipe(
    //       map((responeData: { [key: string]: INote }) => {
    //         for (const key in responeData) helperArray.push(responeData[key]);
    //         return helperArray;
    //       })
    //     )
    //     .subscribe((responseData) => {
    //       this.NotesDataService.notes$.next([]);
    //       responseData.forEach((element) =>
    //         this.NotesDataService.addNewNote(
    //           element.id,
    //           element.title,
    //           element.text
    //         )
    //       );
    //     });
  }

  ngOnDestroy() {
    this.noteSubscripction$.unsubscribe;
    this.httpMethodsSubscription$.unsubscribe;
  }
}
