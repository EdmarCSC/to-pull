import _ from 'lodash';
import '../style/index.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get, remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA3zTwrDNOZuarMb54dfxlHagB74VtvzE0",
    authDomain: "mft046transp.firebaseapp.com",
    databaseURL: "https://mft046transp-default-rtdb.firebaseio.com",
    projectId: "mft046transp",
    storageBucket: "mft046transp.appspot.com",
    messagingSenderId: "715877080099",
    appId: "1:715877080099:web:70a185cea9540527fee596",
    measurementId: "G-BF655GBQTX"
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const contMain = document.querySelector('.container-main');
const bodyMain = document.querySelector('.main-body');
const listData = document.querySelector('.list-data');
const inputs = document.querySelectorAll('.input');
const contIn = document.querySelector('.container-inputFilial')

const inputFilial = document.querySelector('.input-filial');
const inputAgenda = document.querySelector('.input-agenda');
const inputBox = document.querySelector('.input-box');
const inputControle = document.querySelector('.input-controle');
const inputMaterial = document.querySelector('.input-material');
const inputQtPallet = document.querySelector('.input-pallets');

const cargasObjects = [];
let dateNow; 

let scr;
let toPrint;
let contCargarKey = 1;
let contCargaDevovidaKey = 1

const titleHeader = ['Filial', 'Agenda', 'Doca', 'Controle', 'Pallets', 'Data',
'Hora', 'Timer']

class CreateObjectCargo {
    constructor(carga) {
        this.filial = carga.filial;
        this.agenda = carga.agenda;
        this.box = carga.box;
        this.controle = carga.controle;
        this.material = carga.material;
        this.qtPallet = carga.qtPallets;
        this.date = carga.date;
        this.hora = carga.hora;
    }

    printObject() {
        const div = 'div';
        const clsLine = 'line';
        const clsCell = 'cell';
        const clsTime = 'time';
        const startingTime = '00:00:00';
        
        
        const lineObject = createComponent(div, clsLine);

        const cellFilial = createComponent(div, clsCell);
        const cellAgenda = createComponent(div, clsCell);
        const cellBox = createComponent(div, clsCell);
        const cellControle = createComponent(div, clsCell);
        const cellMaterial = createComponent(div, clsCell);
        const cellQtPallet = createComponent(div, clsCell);
        const cellDate = createComponent(div, clsCell);
        const cellHora = createComponent(div, clsCell);
        const cellTime = createComponent(div, clsCell, clsTime)

        cellFilial.innerHTML = this.filial;
        cellAgenda.innerHTML = this.agenda;
        cellBox.innerHTML = this.box;
        cellControle.innerHTML = this.controle;
        cellMaterial.innerHTML = this.material;
        cellQtPallet.innerHTML = this.qtPallet;
        cellDate.innerHTML = this.date; 
        cellHora.innerHTML = this.hora;
        cellTime.innerHTML = startingTime;

        lineObject.appendChild(cellFilial);
        lineObject.appendChild(cellAgenda)
        lineObject.appendChild(cellBox);
        lineObject.appendChild(cellControle);
        lineObject.appendChild(cellMaterial);
        lineObject.appendChild(cellQtPallet);
        lineObject.appendChild(cellDate);
        lineObject.appendChild(cellHora);
        lineObject.appendChild(cellTime);


        listData.appendChild(lineObject);

        return cellTime;
    }

} 

function setCarga(filial, agenda, box, controle, material, qtPallets, date, hour) {
    set(ref(database, `cargas-tst/${dateNow.slice(6, 10)}/${dateNow.slice(3, 5)}/${dateNow.replace(/\//g, '')}/${contCargarKey}`), {
        filial: filial,
        agenda: agenda,
        box: box,
        controle: controle,
        material: material,
        qtPallets: qtPallets,
        date: date, 
        hora: hour,
        kay: contCargarKey
    });
}

function validateDataInputs() {
    if (!inputFilial.value) {
        inputFilial.focus();
        return
    }

    if (!inputAgenda.value) {
        inputAgenda.focus();
        return
    } 

    if (!inputBox.value) {
        inputBox.focus();
        return
    }

    if (!inputControle.value) {
        inputControle.focus();
        return
    }

    if (!inputMaterial.value) {
        inputMaterial.focus();
        return
    }

    if (!inputQtPallet.value) {
        inputQtPallet.focus();
        return
    }
    
    return true
}

function contCargaDevovidas(cont) {
    set(ref(database, 'key-cargas-devolvidas/'), {
        cont: cont
    });
}

function cargaDevolvida(element) {
    set(ref(database, 'cargas-devovidas/' + element[8]), {
        afilial: element[0],
        agenda: element[1],
        box: element[2],
        controle: element[3],
        dmaterial: element[4],
        dtPallets: element[5],
        edata: element[6], 
        hora: element[7],
        key: element[8]
    });
}

function contCarga(cont) {
    set(ref(database, 'key-cargas-tst/'), {
       cont: cont
    });

}

function removeCargaLiberadas(dataObiject) {
    remove(ref(database, 'cargas-liberadas/' + dataObiject[8]), {
    })
}

function getDataCells() {
    const dataCells = remover.childNodes;
    const valuesCells = []

    dataCells.forEach(e => {
        if (e.classList.contains('cell')) {
            valuesCells.push(e.textContent);
        }
    })
    
    return valuesCells
}

function addZero (zero) {
    if (zero < 10) {
    zero = '0'+zero;
    }
    
    return zero;
}    

function getDate() {
    const date = new Date();
    let da = 1;
    da += date.getMonth();
    const dia = addZero(date.getDate());
    const mes = addZero(da);
    const ano = date.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`
    
    return dataAtual
}

function getHour() {
    const hour = new Date();
    const hr = addZero(hour.getHours());
    const mn = addZero(hour.getMinutes());
    const sc = addZero(hour.getSeconds());
    
    const horaAtual = `${hr}:${mn}:${sc}`
    return horaAtual
}

function ajustDataHora(hora, data) {
    const ano = data.slice(6, 10)
    const mes = data.slice(3, 5)
    const dia = data.slice(0, 2)

    const h = hora.slice(0, 2)
    const m = hora.slice(3, 5)
    const s = hora.slice(6, 7)

    const hour = new Date();
    const hr = addZero(hour.getHours() - +h);
    const mn = addZero(hour.getMinutes() - +m);
    const sc = addZero(hour.getSeconds() - +s);
    
    const tempoAjustado = (`${ano}${mes}${dia}${hr}${mn}${sc}`).replace(/\-/g, '');
    return tempoAjustado
}

// Classe responsavel por gerar o tempo com base no tempo anterior caso a, pagina feche ou em uma tualização. 
// assim o tempo sempre vai continuar de onde parou.
class CreateTimer {
  constructor(cellTime, time, cont) {
    this.cellTime = cellTime,
    this.date = time.slice(0, 4),
    this.mes = time.slice(4, 6),
    this.dia = time.slice(6, 8),
    this.hora = time.slice(8, 10),
    this.minutos = time.slice(10, 12),
    this.segundos = time.slice(12, 14),
    this.cont = cont   
  }
  
  create() {
    const hour = new Date(this.date, this.mes, this.dia, this.hora, this.minutos, this.segundos);     
    return hour.toLocaleTimeString ('pt-BR');
  } 
  
  start() {
    this.cont = setInterval(() => {
        this.segundos++;
        let cronometro = this.create();

        if (cronometro >= '00:20:00' &&  cronometro <= '00:40:00') {
            addColorYellow(this.cellTime);
        }
        

        if (cronometro > '00:40:00') {
            addColorRed(this.cellTime);
        }

        return this.cellTime.innerHTML = cronometro;
    }, 1000);
  }
}

class CreateTimerNow {
    constructor (cellTime, second, time) {
        this.cellTime = cellTime,
        this.second = second,
        this.time = time
    }

    createDateNow() {
        const hour = new Date(this.second * 1000);     
        return hour.toLocaleTimeString ('pt-BR', { 
            hora12 : false, 
            timeZone: 'UTC'
            });
      } 
      
    startDateNow() {
        this.time = setInterval(() => {
            this.second++;
            let cronometro = this.createDateNow();
           if (cronometro >= '00:20:00' &&  cronometro <= '00:40:00') {
                addColorYellow(this.cellTime);
            }
            
            if (cronometro > '00:40:00') {
                addColorRed(this.cellTime);
            }

            return this.cellTime.innerHTML = cronometro;
        }, 1000);
    }
}

class Carga {
    constructor(filial, agenda, box, controle, material, qtPallets, data, hora) {
        this.filial = filial;
        this.agenda = agenda;
        this.box = box;
        this.controle = controle;
        this.material = material;
        this.qtPallets = qtPallets;
        this.data = data;
        this.hora = hora;
    }
}

function createComponent(el, cls, id) {
    const component = document.createElement(el);
    component.classList.add(cls);
    component.classList.add(id);

    return component;
}

let remover; 

function removeComponent(cancel) {
 const dlg = document.querySelector('.dialog-box');
    const dlgMobal = document.querySelector('.mobile-dialog-box');
  
    if (cancel === 'true') {
        if (dlg != null) dlg.remove()
        if (dlgMobal != null) dlgMobal.remove()
        return
    }

    if (dlg != null) dlg.remove()
    if (dlgMobal != null) dlgMobal.remove()

    remover.remove();

    dlg.remove();
}

function addColorGreen(elementoPai) {
    if (elementoPai.classList.contains('red')) elementoPai.classList.remove('red');
    elementoPai.classList.add('green');
}

function removeGreen(elementoPai) {
    if (elementoPai.classList.contains('green')) elementoPai.classList.remove('green');
}

function addColorYellow(e) {
    const p = e.parentNode;
    return p.classList.add('yellow');
}
  
function addColorRed(e) {
    const p = e.parentNode;
    return p.classList.add('red');
}


function titleItemsList() {
    const titles = ['Filial', 'Agenda', 'Doca', 'Controle', 'Material', 'Pallets', 'Data', 'Hora', 'Tempo']
    const contTitile = createComponent('div', 'container-title-of-list');

    titles.forEach(e => {
        const title = createComponent('p', 'title')
        title.innerHTML = e;
        contTitile.appendChild(title)    
    })

    return contTitile
}

function printCargaOfScreen(valueInputs) {
    let t;
    let contCell = 0;
    let contLine = 0;

    const line = createComponent('div', 'line', `line${contLine}`);
    contLine++;

    if (scr <= 700) {
        const titles = titleItemsList()
        line.appendChild(titles);    
    }

    valueInputs.forEach(e => {
        const cell = createComponent('div', `cell${contCell}`, 'cell');
        cell.innerHTML = e;

        line.appendChild(cell);

        contCell++;  
    })

    contCell++
    const celltimer = createComponent('div', `cell${contCell++}`, 'cell');
    celltimer.innerHTML = '00:00:00';  
    
    const timer = new CreateTimerNow()
    timer.startDateNow(celltimer, 0, t);

    line.appendChild(celltimer); 

    listData.appendChild(line);
    
    clearValueInputs();
    inputFilial.focus();
}

function getData() {
    const data = [];
    inputFilialrEach(e => {
        data.push(e.value);
    });

    data.push(getDate());
    data.push(getHour());

    const carga = new Carga(data[0], data[1], data[2], data[3], data[4],
                                 data[5], data[6], data[7], data[8]);    
    setCarga(carga, contCargarKey);

    return data
}

function removeCargaRetiradaconst (key) {
    remove(ref(database, 'cargas-retiradas/' + key), {
    })
}

function marcarItemLista(data) {
    const el = data
    const val = Object.values(el)
    const lines = document.querySelectorAll('.line');

    lines.forEach(e => {
        let filhos = e.childNodes
        filhos.forEach(e => {
            if (e.classList.contains('cell1')) {
                if (e.innerHTML === val[1]) {
                    const parentEl = e.parentNode
                    addColorGreen(parentEl);
                }
            }
        })
    })
}

function clearValueInputs() {
    inputs.forEach(element => {
        element.value = ''; 
    });
}

function getDataToPrint(req) {
    const valuesOfChilds = []

    if (!req) {
        const listCarga = listData.childNodes;
        const lestIndex = listCarga.length -1;
        const lestChild = listCarga[lestIndex];
        const propChild = lestChild.childNodes;
        
        propChild.forEach(e => {
            if (e.classList.contains('cell')) valuesOfChilds.push(e.innerHTML)
        })

        return valuesOfChilds
    } else {
        const dataToPrint = remover.childNodes;
        
        dataToPrint.forEach(e => {
            if (e.classList.contains('cell')) valuesOfChilds.push(e.innerHTML)
        })

        return valuesOfChilds
    }
    
}

function createDocOfPrint(filial, agenda, doca, controle, pallets, hora) {
    const titleOfPrint = ['FILIAL:', 'AGENDA:', 'DOCA:', 'CONTROLE:', 'PALLETS:', 'Hora:']

    const bodyOfPrint = createComponent('div', 'body-of-print')
    const numberFilial = createComponent('div', 'number-filial')
    const numberAgenda = createComponent('div', 'number-agenda')
    const numberDoca = createComponent('div', 'number-doca')
    const numberControle = createComponent('div', 'number-controle')
    const numberOfPallets = createComponent('div', 'number-of-pallets')
    const timeRequest = createComponent('div', 'time-request')

    numberFilial.innerHTML = `${titleOfPrint[0]} ${filial}`;
    numberAgenda.innerHTML = `${titleOfPrint[1]} ${agenda}`;
    numberDoca.innerHTML = `${titleOfPrint[2]} ${doca}`;
    numberControle.innerHTML = `${titleOfPrint[3]} ${controle}`;
    numberOfPallets.innerHTML = `${titleOfPrint[4]} ${pallets}`;
    timeRequest.innerHTML = `${titleOfPrint[5]} ${hora}`;

    bodyOfPrint.appendChild(numberFilial)
    bodyOfPrint.appendChild(numberAgenda)
    bodyOfPrint.appendChild(numberDoca)
    bodyOfPrint.appendChild(numberControle)
    bodyOfPrint.appendChild(numberOfPallets)
    bodyOfPrint.appendChild(timeRequest)

    bodyMain.appendChild(bodyOfPrint)

}

function mobileDialogBox() {
    const dialogBox = createComponent('div', 'mobile-dialog-box');
    const mBtnConfirmDialogBox = createComponent('h2', 'm-btn-confirm-dialog-box');
    const mBtnCloseDialogBox = createComponent('h2', 'm-btn-close-dialog-box');
    const mBtnPrintDialogBox = createComponent('h2', 'm-btn-print-dialog-box');


    mBtnConfirmDialogBox.innerHTML = 'Confirmar';
    mBtnPrintDialogBox.innerHTML = 'Imprimir';
    mBtnCloseDialogBox.innerHTML = 'Devolver';

    dialogBox.appendChild(mBtnConfirmDialogBox);
    dialogBox.appendChild(mBtnPrintDialogBox);
    dialogBox.appendChild(mBtnCloseDialogBox);

    contMain.appendChild(dialogBox)
}

function dialogBox() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const dialogBox = createComponent('div', 'dialog-box');
    const h1 = createComponent('h3', 'title-dialog-box');
    const btnDialogBox = createComponent('button', 'btn-confirm-dialog-box');
    const btnDeskPrintDialogBox = createComponent('button', 'btn-desk-print-dialog-box');
    const btnCancelDialogBox = createComponent('button', 'btn-cancel-dialog-box');


    h1.innerHTML = 'Carga retirada!';
    btnDialogBox.innerHTML = 'Confirmar';
    btnDeskPrintDialogBox.innerHTML = 'Imprimir'
    btnCancelDialogBox.innerHTML = 'Devolver'

    dialogBox.appendChild(h1);
    dialogBox.appendChild(btnDialogBox);
    dialogBox.appendChild(btnDeskPrintDialogBox);
    dialogBox.appendChild(btnCancelDialogBox)

    contMain.appendChild(dialogBox)
}

function compareElementos(element) {
    const controle = element.controle;
    const agenda = element.agenda;
    
    let cControle;
    let cAgenda; 
    const lines = listData.childNodes
    lines.forEach(e => {
        const cellOfLine = e.childNodes
        cellOfLine.forEach(e => {
            if (controle === e.innerHTML) cControle = e.innerHTML;
            if (agenda === e.innerHTML) cAgenda = e.innerHTML;
        })
    })

    if (cControle === controle && cAgenda === agenda) return true
    
    return false
}                                                                                                                                                                                                                                                                                                                                                                                                                           

const refCargaLiberadas = ref(database, 'cargas-liberadas/');
    onValue(refCargaLiberadas, (snapshot) => {

        if (!snapshot.exists() || !listData.classList.contains('true')) return
        
        const data = Object.values(snapshot.val());
        const lestData = Object.values(data);
        const indexData = data.length -1;

        const validar = compareElementos(lestData[indexData])
        if (validar) return

        printCargaOfScreen(Object.values(lestData[indexData]));
    })

const reference = ref(database, 'cargas-retiradas/');
    onValue(reference, (snapshot) => {
        if (!snapshot.exists()) return
        const data = Object.values(snapshot.val());
        const lestData = Object.values(data);
        const indexData = data.length -1;

        marcarItemLista(lestData[indexData]);
    })

document.addEventListener('click', e => {
    const el = e.target;

    // Se o click for no botão de enviar.
    if (el.classList.contains('push') || el.classList.contains('push-request')) {
        
        // Avalia se todos os inputs foram preechidos.
        const valueInput = validateDataInputs();
        if (!valueInput) return

        //Adiciona uma class "true" para identifcar se a lista tem elementos.
        const listItems = 'true';
        listData.classList.add(listItems)
        
        // Coleta os dados para a criação do Object carga.
        const date = getDate(); // Coleta a data atual.
        const hour = getHour(); // Celeta a hora atual.
        
        setCarga(inputFilial.value, inputAgenda.value, inputBox.value, 
            inputControle.value, inputMaterial.value, inputQtPallet.value, date, hour); // Coleta os dados dos inputs.
        
        // Faz limpeza dos inputs após todos os dados serem capiturados.
        clearValueInputs();
        inputFilial.focus();
        
        // Guarda o valor da (id) da carga
        contCarga(contCargarKey);
        // Incrementa o valor, para que a carga seja sempre a ultima.
        contCargarKey++;

        // Faz o get no DB
        get(ref(database, `cargas-tst/${dateNow.slice(6, 10)}/${dateNow.slice(3, 5)}/${dateNow.replace(/\//g, '')}`)).then((snapshot) => {
        const cargas = Object.values(snapshot.val())

            // Coleta o index da ultima carga. 
            const lestCarga = cargas.length -1;

            // Add no object (global) array a ultima carga, da lista de carga vinda do server.
            cargasObjects.push(cargas[lestCarga]);
            
            // Coleta o index da ultima carga do object array. 
            const carga = cargasObjects.length -1;

            // Cria um novo object com os valores da ultima carga contida no object array (global).
            const printCarga = new CreateObjectCargo(cargasObjects[carga]);
            // Imprime os dados na tela e capitura a ultima celula para inserir o time.
            const cellTime = printCarga.printObject();   
            
            // Add o time na celula correspondente.
            const timer = new CreateTimerNow(cellTime, 0, '');
            timer.startDateNow();
        });
    }

    if (el.classList.contains('menu') || el.classList.contains('li-menu') || el.classList.contains('abas')) {
        const menu = document.querySelector('.menu');
        const boxMenu = document.querySelector('.box-menu');

        menu.classList.toggle('animation-btn-menu');
        boxMenu.classList.toggle('animation-box-menu');

    }

    if (el.classList.contains('transpicking')){
        const bodyList = document.querySelector('.body')
                
        contIn.classList.add('inp')

        if (!bodyList.classList.contains('visible')){
            bodyList.classList.add('visible')
        }
    }

    if (el.classList.contains('recebimento')){
        const bodyList = document.querySelector('.body')
        
        contIn.classList.remove('inp')
        
        if (bodyList.classList.contains('visible')){
            bodyList.classList.remove('visible')
        }
    }

    if (el.classList.contains('cell')) {
        remover = el.parentNode;
        if (scr > 700) dialogBox();
        if (scr <= 700) mobileDialogBox();
    }

    if (el.classList.contains('btn-confirm-dialog-box') || el.classList.contains('m-btn-confirm-dialog-box')) {
        const dataObiject = getDataCells();
        removeCargaLiberadas(dataObiject)

        const key = getDataCells()
        removeCargaRetiradas(key[8])
        
        if (scr > 700) removeComponent()
        if (scr <= 700) removeComponent()
    }
    
    if (el.classList.contains('btn-cancel-dialog-box') || el.classList.contains('m-btn-close-dialog-box')) {
        if (!remover.classList.contains('green')) {
            removeComponent('true');
            return
        }

        const dataObiject = getDataCells();
        cargaDevolvida(dataObiject)

        removeGreen(remover)
        
        const key = getDataCells()
        removeCargaRetiradas(key[8])
        
        contCargaDevovidas(dataObiject[8])
        contCargaDevovidaKey++;        
    }

    if (el.classList.contains('print') || el.classList.contains('printer')) {
        toPrint = getDataToPrint() 
        print()
    }

    if (el.classList.contains('m-btn-print-dialog-box') || el.classList.contains('btn-desk-print-dialog-box')) {
        toPrint = getDataToPrint(true) 
        print()
    }
});

window.addEventListener('load', e => {
    clearValueInputs();
    inputFilial.focus();
    scr = window.screen.width;
    dateNow = getDate();
    
    get(ref(database, `cargas-tst/${dateNow.slice(6, 10)}/${dateNow.slice(3, 5)}/${dateNow.replace(/\//g, '')}`)).then((snapshot) => {
        const cargas = Object.values(snapshot.val())
        cargas.forEach(e => {
            const date = e.date;
            const hour = e.hora;
            const cont = '';

            const time = ajustDataHora(hour, date);

            const printCarga = new CreateObjectCargo(e);
            const cellTime = printCarga.printObject();

            const newTime = new CreateTimer(cellTime, time, cont);
            newTime.start()
        
            cargasObjects.push(e);
        })
    })
    
    get(ref(database, 'key-cargas-tst/')).then((snapshot) => {
        if (snapshot.exists()) {
          const v = Object.values(snapshot.val())
          const cont =  Object.values(v)
          contCargarKey += cont[0]; 
        }
        return
    })

    get(ref(database, 'key-cargas-devolvidas/')).then((snapshot) => {
        if (snapshot.exists()) {
          const v = Object.values(snapshot.val())
          const cont =  Object.values(v)
          contCargaDevovidaKey += cont[0]; 
        }
        return
    })

    get(ref(database, 'key-cargas-listadas-screen/')).then((snapshot) => {
        if (snapshot.exists()) {
          const v = Object.values(snapshot.val())
          const cont =  Object.values(v)
          contCargarListadaKey += cont[0]; 
        }
        return
    })
})

window.addEventListener('beforeprint', () => {
    createDocOfPrint(toPrint[0], toPrint[1], toPrint[2], toPrint[3], toPrint[5], toPrint[7])
    removeComponent('true');
})

window.addEventListener('afterprint', () => {
    const rmBodyOfPrint = document.querySelector('.body-of-print');
    rmBodyOfPrint.remove()
})