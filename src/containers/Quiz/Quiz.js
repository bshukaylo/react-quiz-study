import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null, // {i}
        quiz: [
            {
                id : 1,
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
                id : 2,
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

    onAnswerClickHandler = (answerId) => {
        //этот if запрещает прощелкивать вопросы быстрым многократным нажатием на правильный ответ
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: { [answerId] : 'success'}
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            this.setState({
                answerState: { [answerId] : 'error'}
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
                <ActiveQuiz
                    onAnswerClick={this.onAnswerClickHandler}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerState}
                />
            </div>
        </div>
    }
}

export default Quiz;