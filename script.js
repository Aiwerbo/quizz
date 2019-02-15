
// --------------- Model -------------------------  
let gamePlayedAmount = 0;
let correctAmount = 0;
let incorrectAmount = 0;
let questionsAmount = 0;
let checkedInputs = [];
let correctArray = [];
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
        this.stats.statCorrectPercentage = Math.round(((this.stats.statCorrectAnswers / amountQuestions) * 100)) + ' %' ;

        console.log(this.stats.statCorrectAnswers)
        console.log(this.stats.statIncorrectAnswers)
        console.log(this.stats.statCorrectPercentage)

    }
    
}


function fetchQuizData(){
    
    quizData.questions = [];
    quizData.correctAnswers = [];

fetch('https://opentdb.com/api.php?amount=10&type=boolean')
  .then(function(response) {

    if(response.ok){
        renderFirstPage();
        return response.json();
        
    }
    
   
    
  })
  .catch(function(error){

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
    let correctArrayTextWrong = ['<br>Q1 - Wrong<br>', 'Q2 - Wrong<br>', 'Q3 - Wrong<br>', 'Q4 - Wrong<br>', 'Q5 - Wrong<br>', 'Q6 - Wrong<br>', 'Q7- Wrong<br>', 'Q8 - Wrong<br>', 'Q9 - Wrong<br>', 'Q10 - Wrong<br>'];
    
    let correctArrayTextRight = ['<br>Q1 - Right<br>', 'Q2 - Right<br>', 'Q3 - Right<br>', 'Q4 - Right<br>', 'Q5 - Right<br>', 'Q6 - Right<br>', 'Q7- Right<br>', 'Q8 - Right<br>', 'Q9 - Right<br>', 'Q10 - Right<br>'];
    correctArray = [];
    checkedInputs = [];
    
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
    /* let changeToGreen = document.querySelectorAll('.mds-radio__span');

        for(let i = 0; i < changeToGreen.length; i++){
            if(quizData.correctAnswers[i] === checkedInputs[i]){
        
                changeToGreen[i].classList.add('mds-radio__span--correct')
        
            }
        
         } */

   



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
        modalTitle.textContent = 'Result';
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

        closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', function(){
            setTimeout(() => {
    
                let modalDialogClear = document.querySelector('.modal-dialog');
                modalDialogClear.innerHTML = '';
                checkedInputs = [];
               }, 300);
        }) 
        
        btnSecondary.addEventListener('click', function(e){
           console.log(e.target);
            let modalDialogClear = document.querySelector('.modal-dialog');
           console.log(modalDialogClear)
           
           setTimeout(() => {

            modalDialogClear = document.querySelector('.modal-dialog');
            modalDialogClear.innerHTML = '';
               
           }, 300);

        });
            checkedInputs = [];
            return;
        } 

        

        let removeCorrectButton = document.querySelector('.quiz__button');
        let formParent = document.querySelector('form');
        formParent.removeChild(removeCorrectButton);
        let newStartButton = document.createElement('button');
        newStartButton.classList.add('btn');
        newStartButton.classList.add('btn-primary');
        newStartButton.classList.add('btn-block');
        newStartButton.classList.add('quiz__button2');
        newStartButton.textContent = 'Start new quiz';
        let main = document.querySelector('main');
        main.appendChild(newStartButton)
        newStartButton.addEventListener('click', () => {
            fetchQuizData();
        })
        
        
       
        
        let quizC = document.querySelectorAll('.quiz__container > p');
        let quizRadioInput = document.querySelectorAll('.quiz__radio__input');
        let greyMds = document.querySelectorAll('.mds-radio');
        let greySpan = document.querySelectorAll('.mds-radio__span');
        let greyInnerSpan = document.querySelectorAll('.mds-radio__innerSpan')
        for(let i = 0; i < quizRadioInput.length; i++){
            quizRadioInput[i].setAttribute('disabled', true);
            greyMds[i].style.color = 'rgb(169, 169, 169)';
            greyMds[i].style.borderColor = 'rgb(169, 169, 169)';
            greySpan[i].classList.add('mds-radio__span--disabled')
            greyInnerSpan[i].classList.add('mds-radio__span--disabled')
        }
        console.log(quizC)
        
        
    for(let i = 0; i < checkedInputs.length; i++){
     
        if(checkedInputs[i] === quizData.correctAnswers[i]){
            correctAmount++;
            correctArray.push(correctArrayTextRight[i]); 
            /* changeToGreen[i].classList.add('mds-radio__span--correct') */
            quizC[i].style.color = '#23852b';
            quizC[i].textContent = quizData.questionNumber[i] + '. ' + htmlDecode(quizData.questions[i]) + ' You answered ' + checkedInputs[i] + '. CORRECT.';
                
        }
        else{
            correctArray.push(correctArrayTextWrong[i]);
            quizC[i].style.color = 'red';
            quizC[i].textContent = quizData.questionNumber[i] + '. ' + htmlDecode(quizData.questions[i]) + ' You answered ' + checkedInputs[i] + '. INCORRECT.';
        }
    }
    console.log(correctArray)
    gamePlayedAmount++;
    incorrectAmount = 10 - correctAmount;
    correctPerAmount = ((correctAmount / 10) * 100) + '%';
    questionsAmount = questionsAmount + 10;
    quizData.addStats(gamePlayedAmount, correctAmount, incorrectAmount, questionsAmount);
    
    modalPopup();
    
    gamePlayedAmount = 0;
    correctAmount = 0;
    incorrectAmount = 0;
    
})
}
//---------------- View --------------------------

document.querySelector('.sideNav__open').addEventListener('click', function(){
    let openNavigation = document.querySelector('#sidenavigation');
    openNavigation.style.width = '190px'
    let h3toMove = document.querySelector('.header__text');
    h3toMove.classList.add('header__text--moveRight');
    h3toMove.classList.remove('header__text--moveLeft');
    
})

// Close navigation

document.querySelector('.closebtn').addEventListener('click', function(){
    let closeNavigation = document.querySelector('#sidenavigation');
    closeNavigation.style.width = '0px';
    let h3toMove = document.querySelector('.header__text');
    h3toMove.classList.add('header__text--moveLeft');
    h3toMove.classList.remove('header__text--moveRight');
})

// Render first button
function renderButton(){

    document.querySelector('main').innerHTML = '';
    /*  */
    let startButton = document.createElement('button');
    startButton.classList.add('btn');
    startButton.classList.add('btn-outline-primary');
    startButton.classList.add('btn-lg');
    startButton.classList.add('btn-block')
    startButton.classList.add('startQuiz__button');
    startButton.textContent = 'Start Quizzz';
    let main = document.querySelector('main');
    main.appendChild(startButton);
    let header__change = document.querySelector('.header__change');
    header__change.textContent = '';
    let h3Header = document.createElement('h3');
    h3Header.textContent = 'Welcome';
    h3Header.classList.add('header__text');
    let selheaderChange = document.querySelector('.header__change');
    selheaderChange.appendChild(h3Header); 
    document.querySelector('.startQuiz__button').addEventListener('click', function(e){
        
        renderQuiz();
     
    })
    
}

// starts with Onclick in html.
function renderStats(){
    document.querySelector('.header__change').innerHTML = '';
    document.querySelector('main').innerHTML = '';
    let closeNavigation = document.querySelector('#sidenavigation');
    let h3Header = document.createElement('h3');
    h3Header.textContent = 'Static';
    h3Header.classList.add('header__text');
    h3Header.classList.add('header__text--moveLeft');
    h3Header.setAttribute('tabindex', '0');
    h3Header.classList.remove('header__text--moveRight')
    let selheaderChange = document.querySelector('.header__change');
    selheaderChange.appendChild(h3Header); 
    closeNavigation.style.width = '0px'
    let main = document.querySelector('main')
    let divContainer = document.createElement('div')
    divContainer.classList.add('static__container');
    selDiv = document.querySelector('.stat__container');
    let h3played = document.createElement('h3');
    h3played.textContent = 'Game Played';
    h3played.setAttribute('tabindex', '0');
    main.appendChild(divContainer);
    divContainer.appendChild(h3played);
    let pTagGamePlayed = document.createElement('p');
    pTagGamePlayed.classList.add('stat__values');
    pTagGamePlayed.setAttribute('tabindex', '0');
    pTagGamePlayed.textContent = quizData.stats.statGamePlayed;
    divContainer.appendChild(pTagGamePlayed);
    let h3CorrectAnswers = document.createElement('h3');
    h3CorrectAnswers.textContent = 'Correct answers';
    h3CorrectAnswers.setAttribute('tabindex', '0');
    divContainer.appendChild(h3CorrectAnswers);
    let pTagCorrectAnswers = document.createElement('p');
    pTagCorrectAnswers.classList.add('stat__values');
    pTagCorrectAnswers.setAttribute('tabindex', '0');
    pTagCorrectAnswers.textContent = quizData.stats.statCorrectAnswers;
    divContainer.appendChild(pTagCorrectAnswers);
    let h3IncorrectAnswers = document.createElement('h3');
    h3IncorrectAnswers.textContent = 'Incorrect answers';
    h3IncorrectAnswers.setAttribute('tabindex', '0');
    divContainer.appendChild(h3IncorrectAnswers);
    let pTagIncorrectAnswers = document.createElement('p');
    pTagIncorrectAnswers.textContent = quizData.stats.statIncorrectAnswers;
    pTagIncorrectAnswers.classList.add('stat__values');
    pTagIncorrectAnswers.setAttribute('tabindex', '0');
    divContainer.appendChild(pTagIncorrectAnswers)
    let h3CorrectPersentage = document.createElement('h3');
    h3CorrectPersentage.setAttribute('tabindex', '0');
    h3CorrectPersentage.textContent = 'Correct Percentage';
    divContainer.appendChild(h3CorrectPersentage);
    let pTagCorrectPercentage = document.createElement('p');
    pTagCorrectPercentage.classList.add('stat__values');
    pTagCorrectPercentage.setAttribute('tabindex', '0');
    pTagCorrectPercentage.textContent = quizData.stats.statCorrectPercentage;
    divContainer.appendChild(pTagCorrectPercentage);

}

function htmlDecode(input){
  let textTohtml = new DOMParser().parseFromString(input, "text/html");
  return textTohtml.documentElement.textContent;
}

function renderQuiz(){
    
    
    let h3Header = document.createElement('h3');
    console.log(h3Header)
   document.querySelector('main').innerHTML = '';
   document.querySelector('.header__change').innerHTML = '';
   let closeNavigation = document.querySelector('#sidenavigation');
   closeNavigation.style.width = '0px';

    let body = document.querySelector('body');
        if (body.childNodes[3]){
            body.removeChild(body.childNodes[3]);
        }
               
   h3Header.classList.remove('header__text--moveRight')
   h3Header.textContent = 'Quizzz';
   h3Header.classList.add('header__text');
   //h3Header.classList.add('header__text--moveLeft');
   let selheaderChange = document.querySelector('.header__change');
   selheaderChange.appendChild(h3Header); 
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
        quizP.setAttribute('tabindex', '0');
        quizP.textContent = quizNumbers + '. ' + htmlDecode(quizQuestions);
        divContainer.appendChild(quizP)
        let br = document.createElement('br');
        let label1 = document.createElement('label');
        label1.setAttribute('name', quizNumbers);
        label1.classList.add('quiz__radio__upp');
        label1.classList.add('mds-radio');
        label1.textContent = 'True';
        divContainer.appendChild(label1);
        divContainer.appendChild(br);
        let label2 = document.createElement('label');
        label2.classList.add('quiz__radio__down');
        label2.classList.add('mds-radio');
        label2.textContent = 'False'
        divContainer.appendChild(label2)
        let selLabel1 = document.querySelectorAll('.quiz__radio__upp');
        let selLabel2 = document.querySelectorAll('.quiz__radio__down');
        let input1 = document.createElement('input');
        let input2 = document.createElement('input');
        label2.setAttribute('name', quizNumbers);
        input1.type = 'radio';
        input2.type = 'radio';
        input1.classList.add('quiz__radio__input__upp');
        input2.classList.add('quiz__radio__input__down');
        input1.classList.add('mds-radio__input');
        input2.classList.add('mds-radio__input');
        input1.classList.add('quiz__radio__input');
        input2.classList.add('quiz__radio__input')
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
        let radioSpan1 = document.createElement('span');
        let radioSpan2 = document.createElement('span');
        radioSpan1.classList.add('mds-radio__span');
        radioSpan2.classList.add('mds-radio__innerSpan');
        let radioSpan3 = document.createElement('span');
        let radioSpan4 = document.createElement('span');
        radioSpan3.classList.add('mds-radio__span');
        radioSpan4.classList.add('mds-radio__innerSpan');
        selLabel1[i].appendChild(radioSpan1);
        selLabel1[i].appendChild(radioSpan2);
        selLabel2[i].appendChild(radioSpan3);
        selLabel2[i].appendChild(radioSpan4);
        
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
    button.classList.add('btn-block')
    button.textContent = 'Correct my Quizzz';
    form.appendChild(button)
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
    modalDialog.classList.add('modal-xlg');
    modalDialog.setAttribute('role', 'document');
    let selmodalFade = document.querySelector('#modalContainer');
    selmodalFade.appendChild(modalDialog);
    
    checkIfCorrect();
    
}

function renderQuizMenu(){
    
    renderQuiz();
    let h3Header = document.querySelector('.header__text')
    h3Header.classList.add('header__text--moveLeft');
    h3Header.classList.remove('header__text--moveRight')
    
}

function modalPopup(){

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
    modalTitle.textContent = 'Result';
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
    let modalbr = document.createElement('br');
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = 'You have got ' + correctAmount + ' correct answers:<br>'
    console.log(correctArray)
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
    btnPrimary.classList.add('btn-block')
    btnPrimary.textContent = 'New Quizzz';
    selModalFooter.appendChild(btnPrimary);
    let btnSecondary = document.createElement('button');
    btnSecondary.setAttribute('type', 'button');
    btnSecondary.classList.add('btn');
    btnSecondary.classList.add('btn-secondary');
    btnSecondary.setAttribute('data-dismiss', 'modal');
    btnSecondary.classList.add('popup__btn')
    btnSecondary.textContent = 'Close. Se answers';
    selModalFooter.appendChild(btnSecondary);

    btnPrimary.addEventListener('click', function(){

            let body = document.querySelector('body');
            console.log(body.childNodes)
            body.removeChild(body.childNodes[3]);
            fetchQuizData();

    })
    closeButton.addEventListener('click', function(){
        setTimeout(() => {

            let modalDialogClear = document.querySelector('.modal-dialog');
            modalDialogClear.innerHTML = '';
            checkedInputs = [];
           }, 300);
    })
    btnSecondary.addEventListener('click', function(){
        setTimeout(() => {

            let modalDialogClear = document.querySelector('.modal-dialog');
            modalDialogClear.innerHTML = '';
            checkedInputs = [];
           }, 300);
    })
    
}

// Starts with Onclick in html.
function renderAbout(){

    document.querySelector('main').innerHTML = '';
    let header = document.querySelector('.header__change')
    header.innerHTML = '';
    let h3 = document.createElement('h3');
    h3.classList.add('header__text');
    h3.classList.add('header__text--moveLeft');
    h3.classList.remove('header__text--moveRight')
    h3.textContent = 'About';
    header.appendChild(h3);
    let closeNavigation = document.querySelector('#sidenavigation');
    closeNavigation.style.width = '0px'
    let main = document.querySelector('main');
    let pTag = document.createElement('p');
    pTag.textContent = aboutText;
    pTag.classList.add('aboutText')
    pTag.setAttribute('tabindex', '0');
    main.appendChild(pTag)
    
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
    button.classList.add('btn-block');
    button.textContent = 'Something went wrong, reload?';
    let main = document.querySelector('main');
    main.appendChild(button);
    let selButton = document.querySelector('.wrongStart__button');
    selButton.addEventListener('click', function(){
        window.location.reload();
    })

}

fetchQuizData();