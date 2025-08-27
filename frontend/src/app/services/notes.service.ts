import { Injectable } from '@angular/core';

// módulo para comunicar app del frontend con el servidor
import {HttpClient} from '@angular/common/http';
import { Notas } from '../models/notas';



@Injectable({
  providedIn: 'root'
})

export class NotesService {

  selectedNotes: Notas;
  notas: Notas[];
  readonly URL_API = 'http://localhost:3000/api/notes';

  // se instancia el módulo
  constructor(private http: HttpClient) {
    this.selectedNotes = new Notas(); 
    this.notas = [];
    
  }

  getAllNotes(){
    return this.http.get<Notas[]>(this.URL_API);
    
  }

  postNotas(notas:Notas){
    return this.http.post(this.URL_API, notas);
  }

  putNotas(notas:Notas){
    return this.http.put(this.URL_API + `/${notas._id}`, notas );
  }

  deletetNotas(_id:String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
