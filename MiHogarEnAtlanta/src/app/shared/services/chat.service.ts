import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: any, public question: any) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  conversation = new Subject<Message[]>();
  
  messageMap = {
    // "Hi": `Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?`,
    // "hi": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    // "hello": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "Hello": {
      "1": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español?",
      "2": "or would you like to be assisted in english?"
    },       
    "Hola, bienvenido a Mi hogar en Atlanta, a continuacion podra conversar con nuestro chatbot eligiendo entre las siguientes opciones. Hello, welcome to Mi hogar en Atlanta, You can talk with our chatbot chosen between these options.": {
      "1": "Le gustaria ser atendido en español?",
      "2": "Would you like to be assisted in english?"
    },
    // "hola": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "Le gustaria ser atendido en español?": {
      "1":"Desea conocer como comprar una casa?",
      "2": "Le gustaria nuestra informacion de contacto?",
      "3": "Desea agendar una cita?"
    },
    // "Espanol": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    // "español": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    // "espanol": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    "Would you like to be assisted in english?": {
      "1": "Would you like to buy a house?",
      "2": "Would you like to contact us?",
      "3": "Would you like to do a meeting?"
    },
    // "english": "Would you like to buy a house? Would you like to contact us? Would you like to do a meeting? Answer buy, contact or meeting, by your choice.",
    "Desea conocer como comprar una casa?": {
      "1": "Desea saber acerca de los documentos necesarios?",
      "2": "Desea saber cuanto es el puntaje de credito minimo?",
      "3": "Desea saber sobre los taxes?",
      "4": "Desea aplicar con alguien mas?"
    },
    // "comprar": "Desea saber acerca de: documentos, puntaje de credito, taxes o aplicar con alguien mas? responda documentos, credito, taxes o aplicar con alguien, de acuerdo a su eleccion.",
    "Would you like to buy a house?": {
      "1": "Would you like to know about the documents required?",
      "2": "Would you like to know about credit score minimum?",
      "3": "Would you like to know about taxes?",
      "4": "Would you like to apply with someone else?"
    },
    // "buy": "Would you like to know about: documents, credit score, taxes or apply with someone else? answer documents, credit score, taxes or apply with someone else, by your choice.",
    "Desea saber acerca de los documentos necesarios?": {
      "1": "Aplicar con Tax ID",
      "2": "Aplicar con seguro social"
    },
    // "documentos": "Puede aplicar con Tax ID o seguro social, responda Tax ID o seguro social, de acuerdo a su eleccion para saber los requerimientos de estos.",
    "Would you like to know about the documents required?": {
      "1": "You can apply with your Tax ID",
      "2": "You can apply with your social security"
    },
    // "documents": "You can apply with your Tax ID or your social security, answer Tax ID or social security, by your choice to know the requirements of them",
    "Aplicar con Tax ID": {
      "1": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment.",
      "2": "Si desea informaciona acerca del 20%, haga click aqui."
    },
    "You can apply with your Tax ID": {
      "1": "You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
      "2": "If you want information about the 20% down payment, click here."
    },
    // "Tax id": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    // "tax id": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    "Si desea informaciona acerca del 20%, haga click aqui.": {
      "1": "El monto de la inicial sera el 20% del valor de la casa."
    },
    "If you want information about the 20% down payment, click here.": {
      "1": "It will be the 20% of the house value."
    },
    "Aplicar con seguro social": {
      "1": "Los requisitos son: licencia, número de seguro social, green card o permiso de trabajo, el último mes de talones de pago, últimos dos años de taxes, últimos tres meses de estados de cuenta.",
      "2": "Si desea informacion acerca del down payment, haga click aqui."
    },
    // "social security": "Los requisitos son: licencia, número de seguro social, green card o permiso de trabajo, el último mes de talones de pago, últimos dos años de taxes, últimos tres meses de estados de cuenta. Si desea informacion acerca del down payment responda down payment. You need this requirements: license, social security number, green card or work permission, last month of pay stubs, last two year of taxes and the last three months of your balance account. If you want to know about the down payment answer down payment.",
    "Si desea informacion acerca del down payment, haga click aqui.": {
      "1": "El monto de down payment va de 3 a 5% del valor de la casa"
    },
    // "down payment": "El monto de down payment va de 3 a 5% del valor de la casa. It will be from 3 to 5% of the house value",
    "Desea saber cuanto es el puntaje de credito minimo?": {
      "1": "Necesita un mínimo de 640 puntos."
    },
    "Would you like to know about credit score minimum?": {
      "1": "You need at least 640 points."
    },
    // "credit score": "You need at least 640 points.",
    // "Credit score": "You need at least 640 points.",
    "Desea saber sobre los taxes?": {
      "1": "Contamos con un equipo de contadores que puede ayudarle a realizar sus taxes."
    },
    "Would you like to know about taxes?": {
      "1": "We have a accountants team that will help with your taxes."
    },
    "Desea aplicar con alguien mas?": {
      "1": "Si se puede, mientras ambos tengan sus requisitos en regla es posible."
    },
    // "aplicar con alguien mas": "Si se puede, mientras ambos tengan sus requisitos en regla es posible.",
    "Would you like to apply with someone else?": {
      "1": "You can do it only if both have all the requirements."
    },
    // "apply with someone else": "You can do it only if both have all the requirements",    
    "Le gustaria nuestra informacion de contacto?": {
      "1": "Nos puede contactar directamente a nuestro correo o a nuestro numero telefonico: mihogarenatlanta@gmail.com & +1 (678) 744-8007"
    },
    // "contacto": "Nos puede contactar directamente a nuestro correo o a nuestro numero telefonico: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "Would you like to contact us?": {
      "1": "You can contact us to our email or our phone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007"
    },
    // "contact": "You can contact us to our email or our phone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "Desea agendar una cita?": {
      "1": "Para agendar una cita debe de contactarnos a traves de nuestro numero telefonico: +1 (678) 744-8007"
    },
    // "cita": "Para agendar una cita debe de contactarnos a traves de nuestro numero telefonico: +1 (678) 744-8007",
    "Would you like to do a meeting?": {
      "1": "To do a meeting you can contact us to our phone number: +1 (678) 744-8007"
    },
    // "meeting": "To do a meeting you can contact us to our phone number: +1 (678) 744-8007",
    // "Who are you": "I am Mi hogar En Atlanta's ChatBot",
    // "Quien eres?": "Soy el ChatBot de Mi Hogar En Atlanta",
    "default": "Para mas informacion contactarnos a traves de nuestro correo o a nuestro numero telefonico: mihogarenatlanta@gmail.com & +1 (678) 744-8007. For more information contact us to our email or our phone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    // "yes": "This is our email and our telephone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007. Please contact us and We will answer all your questions",
    // "no": "Thanks for coming, have a nice experience in our website",
  }

  getBotAnswer(msg: any) {
    const userMessage = new Message('user', '', msg);
    console.log(userMessage);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg), '');
    console.log(botMessage);
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: any){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }

}
