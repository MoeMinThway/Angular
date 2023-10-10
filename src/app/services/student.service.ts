import { Injectable } from '@angular/core';

const STORAGE = "student";
const GENERATOR = "student_id_generator"

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private list: any[]
  private generator: any
  constructor() {
    this.list = [
      {
        name: 'Aung Aung',
        phone: '09752512',
        email: 'aung@gmail.com',
        address: 'Yangon'
      }
    ];
    this.list = JSON.parse(localStorage.getItem(STORAGE)!)
    this.generator = JSON.parse(localStorage.getItem(GENERATOR)!)

    if (!this.list) {
      this.list = [];

    }
    if (!this.generator) {
      id: 0
    }
  }

  getAll() {
    return this.list;
  }

  save(student: any) {

    if (student.id) {
      let target = -1
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index];
        if (element.id == student.id) {
          target = index
        }
      }

      if (target >= 0) {
        this.list[target] = student
      }

    } else {

      student.id = ++this.generator.id
      this.list.push(student);
    }

    localStorage.setItem(STORAGE, JSON.stringify(this.list));
    localStorage.setItem(GENERATOR, JSON.stringify(this.generator));

  }
  delete(student: any) {
    this.list = this.list.filter(s => s !== student)
    localStorage.setItem(STORAGE, JSON.stringify(this.list));
    return this.list
  }
  findById(id: number) {
    let filter = this.list.filter(s => s.id == id)

    if (filter.length > 0) {
      return filter[0]
    }
    return null
  }
}

