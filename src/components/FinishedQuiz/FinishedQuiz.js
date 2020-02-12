import React from "react";
import classes from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (<div className={classes.FinishedQuiz}>
        <ul>
            {
                props.quiz.map((quizItem, idx) => {
                    const cls = [
                        'fa',
                    props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ];
                    return <li key={idx}>
                        <strong>{idx+1}</strong>. &nbsp;
                        {quizItem.question}
                        <i className={cls.join(' ')}/>

                    </li>
                })
            }
        </ul>
        <p>Правильно {successCount} из {props.quiz.length}</p>
        <div>
            <Button
                type={'primary'}
                onClick={props.onRetry}>
                Повторить</Button>
            <Button
                type={'success'}
                onClick={props.onRetry}>
                Перейти в список тестов</Button>
        </div>
    </div>)
};

export default FinishedQuiz;