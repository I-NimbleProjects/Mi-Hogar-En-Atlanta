import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  conversation = new Subject<Message[]>();
  
  messageMap = {
    "Hi": `Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?`,
    "hi": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "hello": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "Hello": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "Hola": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "hola": "Bienvenido, somos mi hogar en atlanta, le gustaria ser atendido en español? or would you like to be assisted in english?",
    "Español": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    "Espanol": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    "español": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    "espanol": "Desea conocer como comprar una casa? Le gustaria nuestra informacion de contacto? Desea agendar una cita? Responda comprar, contacto o cita, de acuerdo a su eleccion.",
    "English": "Would you like to buy a house? Would you like to contact us? Would you like to do a meeting? Answer buy, contact or meeting, by your choice.",
    "english": "Would you like to buy a house? Would you like to contact us? Would you like to do a meeting? Answer buy, contact or meeting, by your choice.",
    "Comprar": "Desea saber acerca de: documentos, puntaje de credito, taxes o aplicar con alguien mas? responda documentos, credito, taxes o aplicar con alguien, de acuerdo a su eleccion.",
    "comprar": "Desea saber acerca de: documentos, puntaje de credito, taxes o aplicar con alguien mas? responda documentos, credito, taxes o aplicar con alguien, de acuerdo a su eleccion.",
    "Buy": "Would you like to know about: documents, credit score, taxes or apply with someone else? answer documents, credit score, taxes or apply with someone else, by your choice.",
    "buy": "Would you like to know about: documents, credit score, taxes or apply with someone else? answer documents, credit score, taxes or apply with someone else, by your choice.",
    "Documentos": "Puede aplicar con Tax ID o seguro social, responda Tax ID o seguro social, de acuerdo a su eleccion para saber los requerimientos de estos.",
    "documentos": "Puede aplicar con Tax ID o seguro social, responda Tax ID o seguro social, de acuerdo a su eleccion para saber los requerimientos de estos.",
    "Documents": "You can apply with your Tax ID or your social security, answer Tax ID or social security, by your choice to know the requirements of them",
    "documents": "You can apply with your Tax ID or your social security, answer Tax ID or social security, by your choice to know the requirements of them",
    "Tax ID": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    "tax ID": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    "Tax id": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    "tax id": "Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment. Si desea informaciona acerca del 20%, responda 20%. You need this requirements: ID or passport, tax ID number, last two months of your balance account and 20% of down payment. If you want information about the 20% down payment, answer 20%.",
    "20%": "El monto de la inicial sera el 20% del valor de la casa. It will be the 20% of the house value",
    "Social security": "Los requisitos son: licencia, número de seguro social, green card o permiso de trabajo, el último mes de talones de pago, últimos dos años de taxes, últimos tres meses de estados de cuenta. Si desea informacion acerca del down payment responda down payment. You need this requirements: license, social security number, green card or work permission, last month of pay stubs, last two year of taxes and the last three months of your balance account. If you want to know about the down payment answer down payment.",
    "social security": "Los requisitos son: licencia, número de seguro social, green card o permiso de trabajo, el último mes de talones de pago, últimos dos años de taxes, últimos tres meses de estados de cuenta. Si desea informacion acerca del down payment responda down payment. You need this requirements: license, social security number, green card or work permission, last month of pay stubs, last two year of taxes and the last three months of your balance account. If you want to know about the down payment answer down payment.",
    "Down payment": "El monto de down payment va de 3 a 5% del valor de la casa. It will be from 3 to 5% of the house value",
    "down payment": "El monto de down payment va de 3 a 5% del valor de la casa. It will be from 3 to 5% of the house value",
    "Credito": "Necesita un mínimo de 640 puntos.",
    "Credit": "You need at least 640 points.",
    "credit score": "You need at least 640 points.",
    "Credit score": "You need at least 640 points.",
    "taxes": "Contamos con un equipo de contadores que puede ayudarle a realizar sus taxes. We have a accountants team that will help with your taxes.",
    "Taxes": "Contamos con un equipo de contadores que puede ayudarle a realizar sus taxes. We have a accountants team that will help with your taxes.",
    "Aplicar con alguien mas": "Si se puede, mientras ambos tengan sus requisitos en regla es posible.",
    "aplicar con alguien mas": "Si se puede, mientras ambos tengan sus requisitos en regla es posible.",
    "Apply with someone else": "You can do it only if both have all the requirements.",
    "apply with someone else": "You can do it only if both have all the requirements",    
    "Contacto": "Nos puede contactar directamente a nuestro correo o a nuestro numero telefonico: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "contacto": "Nos puede contactar directamente a nuestro correo o a nuestro numero telefonico: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "Contact": "You can contact us to our email or our phone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "contact": "You can contact us to our email or our phone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007",
    "Cita": "Para agendar una cita debe de contactarnos a traves de nuestro numero telefonico: +1 (678) 744-8007",
    "cita": "Para agendar una cita debe de contactarnos a traves de nuestro numero telefonico: +1 (678) 744-8007",
    "Meeting": "To do a meeting you can contact us to our phone number: +1 (678) 744-8007",
    "meeting": "To do a meeting you can contact us to our phone number: +1 (678) 744-8007",
    "Who are you": "I am Mi hogar En Atlanta's ChatBot",
    "Quien eres?": "Soy el ChatBot de Mi Hogar En Atlanta",
    "default": "I can't understand. Can you please repeat?",
    "yes": "This is our email and our telephone number: mihogarenatlanta@gmail.com & +1 (678) 744-8007. Please contact us and We will answer all your questions",
    "no": "Thanks for coming, have a nice experience in our website",
  }

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }

}
