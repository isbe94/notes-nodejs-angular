import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Notas } from 'src/app/models/notas';

declare var M: any;

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [NotesService],
})
export class NotasComponent implements OnInit, AfterViewInit {

  constructor(public notesService: NotesService) {}

  ngOnInit() {
    this.getAllNotes();
  }

  ngAfterViewInit() {
    // Inicializar Tooltips
    const elemsTooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elemsTooltip, {});

  }

  addNotas(form: NgForm) {
    if (form.value._id) {
      this.notesService.putNotas(form.value).subscribe(
        (res) => {
          this.resetForm(form);
          this.getAllNotes();
          M.toast({
            html: 'Nota actualizada exitosamente',
            classes: 'green darken-1',
          }); 
        },
        (err) => {
          M.toast({
            html: 'Error al actualizar la nota',
            classes: 'red darken-1',
          });
        }
      );
    } else {
      this.notesService.postNotas(form.value).subscribe(
        (res) => {
          this.getAllNotes();
          this.resetForm(form);
          M.toast({
            html: 'Nota guardada exitosamente',
            classes: 'green darken-1',
          });
        },
        (err) => {
          M.toast({
            html: 'Error al guardar la nota',
            classes: 'red darken-1',
          });
        }
      );
    }
  }

  getAllNotes() {
    this.notesService.getAllNotes().subscribe((res: any) => {
      this.notesService.notas = res.data;
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.notesService.selectedNotes = new Notas();
    }
  }

  editNote(notas: Notas) {
    this.notesService.selectedNotes = notas;
    // enfocar el input del título después de editar
    // setTimeout(() => {
    //   const titleInput = document.getElementById('title');
    //   if (titleInput) {
    //     titleInput.focus();
    //   }
    // }, 0);
  }

  deleteNote(_id: String, form: NgForm) {
    if (confirm('¿Está seguro de eliminar la nota?')) {
      this.notesService.deletetNotas(_id).subscribe(
        (res) => {
          this.getAllNotes();
          this.resetForm(form);
          M.toast({
            html: 'Nota eliminada exitosamente',
            classes: 'orange darken-1',
          });
        },
        (err) => {
          M.toast({
            html: 'Error al eliminar la nota',
            classes: 'red darken-1',
          });
        }
      );
    }
  }
}
