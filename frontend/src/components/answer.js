import {UrlManager} from "../utils/url-manager.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config.js";
import {logPlugin} from "@babel/preset-env/lib/debug";


export class Answer {
    constructor() {

        this.routeParams = UrlManager.getQueryParams()
        this.init();
        this.prevPage();

        }



    async init() {

        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.quiz = result;
                    console.log(this.quiz)
                    this.quizElement();
                    this.userDataStorage();
                    this.correctAnswer();
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    userDataStorage() {
        this.userLocStorage = JSON.parse(localStorage.getItem('userInfo'));
        document.querySelector('.answer-mail').innerHTML = `Тест выполнил <span>${this.userLocStorage.fullName}</span>, 
                                                                    <a href="javascript:void(0)">${this.userLocStorage.email}</a>`
    }

    quizElement() {
        document.getElementById('answer-title').innerText = this.quiz.test.name;
        this.quiz.test.questions.forEach((q, i) => {
            const qWrapper = document.querySelector('.answer-wrapper');
                    const questionAnswer = `<div class="answer-question">
                                                   <div class="answer-question-title" id="title">
                                                       <span>Вопрос ${i + 1}:</span> ${q.question}
                                                   </div>  
                                                   
                                                   <div class="answer-question-options" id="options">                                                      
                                                            ${this.renderAnswers(q.answers)}                                                   
                                                   </div>                                         
                                            </div>`;
                    qWrapper.innerHTML += questionAnswer;
        })

    }

    renderAnswers(answers) {

        // const getRadio = (correct) => {
        //     let className = '';
        //     const radioHTML = `<input type="radio" id="${correct}" disabled ='disabled'`;
        //     let correctAns = this.quiz.test.map(item => {
        //         console.log(item.name)
        //     })
        // }

       const result = answers.map(a => {
           const answer = `<div class="answer-question-option">
                                <input type="radio" id="${a.id}" disabled="disabled">
                                <label>${a.answer}</label>
                           </div>`;
           return answer;
       });
       return result.join('');

    }

    prevPage() {
        const nextPageBtn = document.querySelector('.answerBtn');
        nextPageBtn.onclick = () => {
            return  location.href = '#/result?id=' + this.routeParams.id
        }
    }

    //Егор, подскажи пожалуйста, как правильно объявить и где функцию с отображением корректных ответов на вопросы,
    // чтобы не выпадали ошибки при использовании методов. Какую-то мелочь я упускаю.. Или это функцию renderAnswers() нужно переделать на отображение.
    correctAnswer() {
        let correctAns = this.quiz.test.map(item => {
                    console.log(item.name)
                })
    }



}