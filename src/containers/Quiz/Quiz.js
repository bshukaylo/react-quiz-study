import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        isFinished: false,
        results: {},
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета синий?',
                answers: [
                    {text: 'Черного', id: 1},
                    {text: 'Синего', id: 2},
                    {text: 'Красного', id: 3},
                    {text: 'Зеленого', id: 4},
                ],
                rightAnswerId: 2,
            },
            {
                id: 2,
                question: 'Какого цвета красный?',
                answers: [
                    {text: 'Черного', id: 1},
                    {text: 'Синего', id: 2},
                    {text: 'Красного', id: 3},
                    {text: 'Зеленого', id: 4},
                ],
                rightAnswerId: 3,
            },
        ],
    };

    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished:false,
            results:{},
        })
    };


    onAnswerClickHandler = (answerId) => {
        //этот if запрещает прощелкивать вопросы быстрым многократным нажатием на правильный ответ
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return <div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                {this.state.isFinished ? <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                    /> :
                    <ActiveQuiz
                        onAnswerClick={this.onAnswerClickHandler}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                }

            </div>
        </div>
    }
}

export default Quiz;