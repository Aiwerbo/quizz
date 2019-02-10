
//

// Ladda datan direkt till objektet innan man tryckt på starta. Om datan inte går att hämta byt ut knappen mot en annan, typ. Data gick inte att hämta, hämta igen?







// --------------- Model -------------------------  
let gamePlayedAmount = 0;
let correctAmount = 0;
let incorrectAmount = 0;
let questionsAmount = 0;
let aboutText = 'Welcome to Quizzz. This is the quizzziest quiz in the quiz world.'

let quizData = {
    questionNumber: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    questionNumberU: ['Q1u', 'Q2u', 'Q3u', 'Q4u', 'Q5u', 'Q6u', 'Q7u', 'Q8u', 'Q9u', 'Q10u'],
    questionNumberD: ['Q1d', 'Q2d', 'Q3d', 'Q4d', 'Q5d', 'Q6d', 'Q7d', 'Q8d', 'Q9d', 'Q10d'],
    questions: [],
    correctAnswers: [],
    addData: function(questions, correctAnswers){
        this.questions.push(questions);
        this.correctAnswers.push(correctAnswers);
    },
    stats: {
       statGamePlayed: 0,
       statCorrectAnswers: 0,
       statIncorrectAnswers: 0,
       questionsAmount: 0,
       statCorrectPercentage: 0,

    },
    addStats: function(gamePlayed, correct, incorrect, amountQuestions){
        
       
      /*   correct = correct + correct;
        incorrect = incorrect + incorrect; */

        this.stats.statGamePlayed = this.stats.statGamePlayed + gamePlayed;
        this.stats.statCorrectAnswers = this.stats.statCorrectAnswers + correct;
        this.stats.statIncorrectAnswers = this.stats.statIncorrectAnswers + incorrect;
        this.stats.statCorrectPercentage = ((this.stats.statCorrectAnswers / amountQuestions) * 100) + ' %' ;

        console.log(this.stats.statCorrectAnswers)
        console.log(this.stats.statIncorrectAnswers)
        console.log(this.stats.statCorrectPercentage)

        
    
    }
    
}





// --------------- Controller --------------------

function fetchQuizData(){

    quizData.questions = [];
    quizData.correctAnswers = [];

fetch('https://opentdb.com/api.php?amount=10&type=boolean')
  .then(function(response) {

    if(response.ok){
        renderFirstPage();
        return response.json();
        
    }
    wrongStartButton();
    
    throw new Error('Somethong in the network went wrong.');
    
  })
  .then(function(data) {
        
    let object;

    for(let i = 0; i < data.results.length; i++){

        object = data.results[i];
        quizData.addData(data.results[i].question, data.results[i].correct_answer)
        
    }
  })
      console.log(quizData)
}

function checkIfCorrect(){
    
   
    
    let checkedInputs = [];
    
    let form = document.querySelector('form');
    form.addEventListener('submit', function(e){
         e.preventDefault();
        
         /* if(checkedInputs.length < 10){
             console.log('hej')
         } */

        
        let checkAllInputs = document.querySelectorAll('.quiz__radio__input');
        
        for(let i = 0; i < checkAllInputs.length; i++){
        if(checkAllInputs[i].checked === true){

            
            checkedInputs.push(checkAllInputs[i].value);
            
    }

       
    };
    console.log(checkedInputs)
    console.log(quizData.correctAnswers);
    console.log(checkedInputs.length)
     if(checkedInputs.length < 10){

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        selModalDialog = document.querySelector('.modal-dialog');
        selModalDialog.appendChild(modalContent);
        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        let selModalContent = document.querySelector('.modal-content');
        selModalContent.appendChild(modalHeader);
        let modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Resultat';
        modalTitle.id = 'h5Title'
        let selModalHeader = document.querySelector('.modal-header');
        selModalHeader.appendChild(modalTitle)
        let closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('close');
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        modalHeader.appendChild(closeButton);
        let selButton = document.querySelector('.close');
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = '&times;'; 
        selButton.appendChild(span);
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.textContent = 'You have not answered all 10 questions';
        modalContent.appendChild(modalBody);
        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalContent.appendChild(modalFooter);
        let selModalFooter = document.querySelector('.modal-footer');
        let btnSecondary = document.createElement('button');
        btnSecondary.setAttribute('type', 'button');
        btnSecondary.classList.add('btn');
        btnSecondary.classList.add('btn-secondary');
        btnSecondary.setAttribute('data-dismiss', 'modal');
        btnSecondary.classList.add('popup__btn')
        btnSecondary.textContent = 'Close';
        selModalFooter.appendChild(btnSecondary);
        
        btnSecondary.addEventListener('click', function(e){
           console.log(e.target);
            let modalDialogClear = document.querySelector('.modal-dialog');
           console.log(modalDialogClear)
           
           setTimeout(() => {

            modalDialogClear = document.querySelector('.modal-dialog');
            modalDialogClear.innerHTML = '';
               
           }, 300);

            
           /*  let createModalDialog = docuement.createElement('div');
            createModalDialog.classlist.add('modal-dialog');
            createModalDialog.setAttribute('role', 'document');
            modalDialogClear.appendChild(createModalDialog);
               
           
           console.log(modalDialogClear) */
                
           
        })
        checkedInputs = [];
            return;
            
        
        
        
            
            /* let not10Message = document.createElement('h3');
            not10Message.textContent = 'Please answer all 10 questions';
            not10Message.id = 'not10Message'
            let selForm = document.querySelector('.quiz__button');
            let div = document.createElement('div');
            div.id = 'quizDiv__bottom';
            selForm.before(div);
            document.querySelector('#quizDiv__bottom').innerHTML = '';
            let selDiv = document.querySelector('#quizDiv__bottom');
            selDiv.appendChild(not10Message);
            checkedInputs = [];
            return; */
            
        } 


    for(let i = 0; i < checkedInputs.length; i++){
     
        if(checkedInputs[i] === quizData.correctAnswers[i]){
            correctAmount++;
        }
        
        
    }
    gamePlayedAmount++;
    incorrectAmount = 10 - correctAmount;
    correctPerAmount = ((correctAmount / 10) * 100) + '%';
    questionsAmount = questionsAmount + 10;
    quizData.addStats(gamePlayedAmount, correctAmount, incorrectAmount, questionsAmount);
    

    // Lägg till popup-funktion
    
    
    
    
    modalPopup();
    
    gamePlayedAmount = 0;
    correctAmount = 0;
    incorrectAmount = 0;
    
    //fetchQuizData();
    //renderButton();

})
}


// funktion som tar han dom statistiken från quizData-objektet.




// https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=boolean


//---------------- View --------------------------

// Open navigation

document.querySelector('.sideNav__open').addEventListener('click', function(){
    let openNavigation = document.querySelector('#sidenavigation');
    openNavigation.style.width = '350px'
})


  
// Close navigation

document.querySelector('.closebtn').addEventListener('click', function(){
    let closeNavigation = document.querySelector('#sidenavigation');
    closeNavigation.style.width = '0px'
})


// Render first button
function renderButton(){

    

    
     
    document.querySelector('main').innerHTML = '';
    /*  */
    let startButton = document.createElement('button');
    startButton.classList.add('btn');
    startButton.classList.add('btn-outline-primary');
    startButton.classList.add('btn-lg');
    startButton.classList.add('startQuiz__button');
    startButton.textContent = 'Starta Quiz';
    let main = document.querySelector('main');
    main.appendChild(startButton);

    

    document.querySelector('.startQuiz__button').addEventListener('click', function(e){

            
            
           /*  modalFade = document.querySelector('.modal');
            modalFade.innerHTML = ''; */
            
            
    
    
        

        renderQuiz();
        

    })
    

}

// Render Stats - Funktion som renderar statistiken.


// starts with Onclick in html.
function renderStats(){
    document.querySelector('.header__change').innerHTML = '';
    document.querySelector('main').innerHTML = '';
    let closeNavigation = document.querySelector('#sidenavigation');
    let h4Header = document.createElement('h4');
    h4Header.textContent = 'Static';
    h4Header.classList.add('header__text');
    let selheaderChange = document.querySelector('.header__change');
    selheaderChange.appendChild(h4Header); 


    closeNavigation.style.width = '0px'
    let main = document.querySelector('main')
    let divContainer = document.createElement('div')
    divContainer.classList.add('static__container');
    selDiv = document.querySelector('.stat__container');
    let h4played = document.createElement('h4');
    h4played.textContent = 'Game Played';
    main.appendChild(divContainer);
    divContainer.appendChild(h4played);
    let pTagGamePlayed = document.createElement('p');
    pTagGamePlayed.classList.add('stat__values')
    pTagGamePlayed.textContent = quizData.stats.statGamePlayed;
    divContainer.appendChild(pTagGamePlayed);
    let h4CorrectAnswers = document.createElement('h4');
    h4CorrectAnswers.textContent = 'Correct answers';
    divContainer.appendChild(h4CorrectAnswers);
    let pTagCorrectAnswers = document.createElement('p');
    pTagCorrectAnswers.classList.add('stat__values')
    pTagCorrectAnswers.textContent = quizData.stats.statCorrectAnswers;
    divContainer.appendChild(pTagCorrectAnswers);
    let h4IncorrectAnswers = document.createElement('h4');
    h4IncorrectAnswers.textContent = 'Incorrect answers';
    divContainer.appendChild(h4IncorrectAnswers);
    let pTagIncorrectAnswers = document.createElement('p');
    pTagIncorrectAnswers.textContent = quizData.stats.statIncorrectAnswers;
    pTagIncorrectAnswers.classList.add('stat__values');
    divContainer.appendChild(pTagIncorrectAnswers)
    let h4CorrectPersentage = document.createElement('h4');
    h4CorrectPersentage.textContent = 'Correct Percentage';
    divContainer.appendChild(h4CorrectPersentage);
    let pTagCorrectPercentage = document.createElement('p');
    pTagCorrectPercentage.classList.add('stat__values');
    pTagCorrectPercentage.textContent = quizData.stats.statCorrectPercentage;
    divContainer.appendChild(pTagCorrectPercentage);
    
    

}


function renderQuiz(){
    
   document.querySelector('main').innerHTML = '';
   document.querySelector('.header__change').innerHTML = '';
   let closeNavigation = document.querySelector('#sidenavigation');
   closeNavigation.style.width = '0px'


    let body = document.querySelector('body');
        if (body.childNodes[3]){
            body.removeChild(body.childNodes[3]);
        }
            
        
   let h4Header = document.createElement('h4');
   h4Header.textContent = 'Quizzz';
   h4Header.classList.add('header__text');
   let selheaderChange = document.querySelector('.header__change');
   selheaderChange.appendChild(h4Header); 
   let form = document.createElement('form');
   let main = document.querySelector('main');
   main.appendChild(form) 
    


    for(let i = 0; i < quizData.questionNumberU.length; i++){
        let quizNumbers = quizData.questionNumber[i];
        let quizNumbersU = quizData.questionNumberU[i];
        let quizNumbersD = quizData.questionNumberD[i];
        let quizQuestions = quizData.questions[i];
        let quizCorrect = quizData.correctAnswers[i];


        let divContainer = document.createElement('div');
        divContainer.id = quizNumbers;
        divContainer.classList.add('quiz__container');
        let form = document.querySelector('form');
        form.setAttribute('required', 'required');
        form.appendChild(divContainer);
        let quizP = document.createElement('p');
        quizP.classList.add('quiz__numbers__question');
        quizP.textContent = quizNumbers + ' ' + quizQuestions;
        divContainer.appendChild(quizP)
        let br = document.createElement('br');
        let label1 = document.createElement('label');
        label1.setAttribute('name', quizNumbers);
        
        label1.classList.add('quiz__radio__upp');
        label1.textContent = 'True';
        divContainer.appendChild(label1);
        divContainer.appendChild(br);
        let label2 = document.createElement('label');
        label2.classList.add('quiz__radio__down');
        label2.textContent = 'False'
        divContainer.appendChild(label2)
        let selLabel1 = document.querySelectorAll('.quiz__radio__upp');
        let selLabel2 = document.querySelectorAll('.quiz__radio__down')
        let input1 = document.createElement('input');
        let input2 = document.createElement('input');
        label2.setAttribute('name', quizNumbers);
        input1.type = 'radio';
        input2.type = 'radio';
        input1.classList.add('quiz__radio__input__upp');
        input2.classList.add('quiz__radio__input__down')
        input1.classList.add('quiz__radio__input');
        input2.classList.add('quiz__radio__input')
        //input1.setAttribute('onclick', 'checkIfChecked()');
        //input1.setAttribute('onclick', 'checkIfChecked()');
        input1.id = quizNumbersU;
        input2.id = quizNumbersD;
        input1.name = quizNumbers;
        input2.name = quizNumbers;
        input1.value = 'True';
        input2.value = 'False'
        input1.textContent = 'True';
        input2.textContent = 'False';
        selLabel1[i].appendChild(input1);
        selLabel2[i].appendChild(input2);

    }
    let button = document.createElement('button');
    button.type = 'submit';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modalContainer');
    button.setAttribute('data-backdrop', 'static');
    button.setAttribute('data-keyboard', 'false');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('quiz__button')
    button.textContent = 'Correct my Quizzz';
    form.appendChild(button)

    // Insert the main div for Modal popup to accomplish one click on submit

    
    body = document.querySelector('body');  
    let modalFade = document.createElement('div');
    modalFade.classList.add('modal');
    modalFade.classList.add('fade');
    modalFade.setAttribute('tabindex', '-1');
    modalFade.setAttribute('role', 'dialog');
    modalFade.setAttribute('area-labelledby', 'modalLabel');
    modalFade.setAttribute('area-hidden', 'true');
    modalFade.id = 'modalContainer'
    body.appendChild(modalFade)
    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('role', 'document');
    let selmodalFade = document.querySelector('#modalContainer');
    selmodalFade.appendChild(modalDialog);
    


    checkIfCorrect();
    
    
}

function modalPopup(){
   


    /* let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('role', 'document');
    let selmodalFade = document.querySelector('#modalContainer');
    selmodalFade.appendChild(modalDialog); */
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    selModalDialog = document.querySelector('.modal-dialog');
    selModalDialog.appendChild(modalContent);
    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    let selModalContent = document.querySelector('.modal-content');
    selModalContent.appendChild(modalHeader);
    let modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Resultat';
    modalTitle.id = 'h5Title'
    let selModalHeader = document.querySelector('.modal-header');
    selModalHeader.appendChild(modalTitle)
    let closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('close');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(closeButton);
    let selButton = document.querySelector('.close');
    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;'; 
    selButton.appendChild(span);
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.textContent = 'You have got ' + correctAmount + ' correct answers';
    modalContent.appendChild(modalBody);
    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    modalContent.appendChild(modalFooter);
    let selModalFooter = document.querySelector('.modal-footer');
    let btnPrimary = document.createElement('button');
    btnPrimary.setAttribute('type', 'button');
    btnPrimary.classList.add('btn');
    btnPrimary.classList.add('btn-primary');
    btnPrimary.setAttribute('data-dismiss', 'modal');
    btnPrimary.classList.add('popup__btn')
    btnPrimary.textContent = 'Start new Quizzz';
    selModalFooter.appendChild(btnPrimary);
    btnPrimary.addEventListener('click', function(){

            let body = document.querySelector('body');
            console.log(body.childNodes)
            body.removeChild(body.childNodes[3]);
        renderFirstPage();
    })


}




// Starts with Onclick in html.
function renderAbout(){

    document.querySelector('main').innerHTML = '';
    let header = document.querySelector('.header__change')
    header.innerHTML = '';
    let h4Header = document.createElement('h4');
    let h4 = document.createElement('h4');
    h4.classList.add('header__text');
    h4.textContent = 'About';
    header.appendChild(h4);
    let closeNavigation = document.querySelector('#sidenavigation');
    closeNavigation.style.width = '0px'
    let main = document.querySelector('main');
    let pTag = document.createElement('p');
    pTag.textContent = aboutText;
    pTag.classList.add('aboutText')
    main.appendChild(pTag)
    
}




function reload(){
    
    location.reload();
}


function renderFirstPage(){


    renderButton();
    
    
}

function wrongStartButton(){
    document.querySelector('main').innerHTML = '';
    let button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn');
    button.classList.add('btn-outline-danger');
    button.classList.add('btn-lg');
    button.classList.add('wrongStart__button');
    button.textContent = 'Something went wrong, reload?';
    let main = document.querySelector('main');
    main.appendChild(button);
    let selButton = document.querySelector('.wrongStart__button');
    selButton.addEventListener('click', function(){
        window.location.reload();
    })


}


fetchQuizData();


