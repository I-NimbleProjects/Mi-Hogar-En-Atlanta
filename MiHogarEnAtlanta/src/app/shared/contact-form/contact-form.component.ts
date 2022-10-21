import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @ViewChild('status') status: ElementRef;


  validationForm: FormGroup;

  constructor() { 
    this.validationForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      subject: new FormControl(),
      message: new FormControl(),
      copy: new FormControl(),
    });
  }

  ngOnInit() {
  }

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get subject(): AbstractControl {
    return this.validationForm.get('subject')!;
  }

  get message(): AbstractControl {
    return this.validationForm.get('message')!;
  }

  get copy(): AbstractControl {
    return this.validationForm.get('copy')!;
  }

  checkValidation() {
    let isDataValid = true;
    let statusMessage = "";

    if (!this.name.value) {
      statusMessage += '<p class="note note-danger"><strong>Name</strong> cannot be empty</p>';
      isDataValid = false;
    }

    if (!this.email.value) {
      statusMessage += '<p class="note note-danger"><strong>Email</strong> cannot be empty</p>';
      isDataValid = false;
    } else {
      const re = /^(([^<>()[]\.,;:s@"]+(.[^<p>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

      if (!re.test(this.email.value)) {
        statusMessage += '<p class="note note-danger"><strong>Email</strong> is invalid</p>';
        isDataValid = false;
      }
    }

    if (!this.subject.value) {
      statusMessage += '<p class="note note-danger"><strong>Subject</strong> cannot be empty</p>';
      isDataValid = false;
    }

    if (!this.message.value) {
      statusMessage += '<p class="note note-danger"><strong>Message</strong> cannot be empty</p>';
      isDataValid = false;
    }

    return {
      isDataValid,
      statusMessage
    };
  };

  // validateForm() {
  //   const { isDataValid, statusMessage } = this.checkValidation();

  //   if (!isDataValid) {
  //     this.status.nativeElement.innerHTML = statusMessage;
  //     return;
  //   }

  //   fetch('/api/contact', {
  //     method: 'POST',
  //     body: formData,
  //     mode: 'cors'
  //   })
  //   .then((response) => {
  //     response.json();
  //   })
  //   .then((response) => {
  //       // handle errors
  //       if (response.errors) {
  //         response.errors.forEach((msg) => {
  //           this.status.nativeElement.innerHTML += `<p class="note note-danger">${msg}</p>`
  //         });
  //         return;
  //       }
  //       // If mail was sent successfully, reset all elements with attribute 'name'
  //       this.validationForm.setValue({
  //         name: '',
  //         email: '',
  //         subject: '',
  //         message: '',
  //         copy : false,
  //       });

  //       this.status.nativeElement.innerHTML = `<p class="note note-success">${response.msg}</p>`;
  //     })
  //     .catch((err) => {
  //       this.status.nativeElement.innerHTML += `<p class="note note-danger">${err}</p>`
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         this.status.nativeElement.innerHTML = '';
  //       }, 2000)
  //     })
  //   };
}
