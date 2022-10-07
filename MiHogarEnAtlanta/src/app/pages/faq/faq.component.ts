import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqs = [
    { 
      question: '¿Cuáles son los documentos necesarios para comprar una casa?', 
      status: 'Question about selling', 
      answer: 'Puede aplicar con Tax ID o seguro social.' 
    },
    { 
      question: '¿Cuáles son los requisitos para aplicar con TAX ID?', 
      status: 'Agents FAQs', 
      answer: 'Los requisitos son: identificación o pasaporte, numero de tax id, últimos dos meses de estados de cuenta, contar con el 20% de down payment.' 
    },
    { 
      question: '¿Cuánto seria el monto del 20% de down payment?', 
      status: 'Question about renting', 
      answer: 'El monto de la inicial dependerá del precio que tenga la casa, de ese precio se calcula el 20%.' 
    },
    { 
      question: '¿Cuáles son los requisitos para aplicar con SS?', 
      status: 'Question about selling', 
      answer: 'Los requisitos son: licencia, número de seguro social, green card o permiso de trabajo, el último mes de talones de pago, últimos dos años de taxes, últimos tres meses de estados de cuenta.' 
    },
    { 
      question: '¿Cuánto debo dar de down payment si tengo seguro social?', 
      status: 'Question about renting', 
      answer: 'El monto de down payment dependerá del precio que tenga la casa, el porcentaje va de 3 a 5%.' 
    },
    { 
      question: '¿Dónde debo acudir para llevar los requisitos?', 
      status: 'Agents FAQs', 
      answer: 'Debe acudir a nuestra oficina ubicada en Norcross en donde nuestro prestamista lo podrá evaluar. En caso de que se le dificulte ir a la oficina, puede hacernos llegar los documentos a nuestro correo mihogarenatlanta@gmail.com en formato PDF preferiblemente.' 
    },
    { 
      question: 'Tengo problemas para realizar mis taxes', 
      status: 'Question about selling', 
      answer: 'Contamos con un equipo de contadores que puede ayudarle a realizar sus taxes.' 
    },
    { 
      question: '¿Cuál es el puntaje necesario de crédito para poder aplicar?', 
      status: 'Question about selling', 
      answer: 'Necesita un mínimo de 640 puntos.' 
    },
    { 
      question: '¿Puedo aplicar en conjunto con otra persona?', 
      status: 'Question about selling', 
      answer: 'Si se puede, mientras ambos tengan sus requisitos en regla es posible.' 
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
