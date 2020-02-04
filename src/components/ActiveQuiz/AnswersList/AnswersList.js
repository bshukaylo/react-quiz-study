import React from "react";
import classes from './AnswersList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, i) => {
            return <AnswerItem key={i}
                               onAnswerClick={props.onAnswerClick}
                               answer={answer}
                               state={props.state ? props.state[answer.id] : null}/>
        })}
    </ul>
);

export default AnswersList;