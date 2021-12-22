import React, { useState, useEffect } from 'react';
// import Loader from '../../components/loader/Loader';
import InputItem from '../../components/UI/inputs/InputItem';
import ButtonItem from '../../components/UI/buttons/ButtonItem';
import { useDispatch, useSelector } from 'react-redux';
import { changeHidden, cleanIsError } from '../../redux/actions/global';
import { createNote, updateEditNote, cleanEditNote } from '../../redux/actions/notes';

import './createNote.scss';

function CreateNote() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.global.isError);
    const editNote = useSelector(state => state.notes.editNote);

    const [task, setTask] = useState({
        title: '',
        description: '',
        marking: '',
        status: '',
    });

    const [activeMarking, setActiveMarking] = useState(1);
    const [activeStatus, setActiveStatus] = useState(1);
    const [markingValue, setMarkingValue] = useState('#57AE49');
    const [statusValue, setStatusValue] = useState('New');

    const cleanNoteStates = () => {
        setTask({
            title: '',
            description: '',
            marking: '',
            status: '',
        });
        setActiveMarking(1);
        setActiveStatus(1);
        setMarkingValue('#57AE49');
        setStatusValue('New');
    }

    useEffect(() => {
        if (editNote.length){
            setTask(editNote[0]);
            setMarkingValue(editNote[0].marking);
            setStatusValue(editNote[0].status);
            if (editNote[0].marking) setActiveMarking(7);
            if (editNote[0].status) setActiveStatus(4);
            if (editNote[0].marking === '#57AE49') setActiveMarking(1);
            if (editNote[0].marking === '#2B76BB') setActiveMarking(2);
            if (editNote[0].marking === '#FF7272') setActiveMarking(3);
            if (editNote[0].marking === '#FBF458') setActiveMarking(4);
            if (editNote[0].marking === '#CC79DA') setActiveMarking(5);
            if (editNote[0].marking === '#79F8E1') setActiveMarking(6);
            if (editNote[0].status === 'New') setActiveStatus(1);
            if (editNote[0].status === 'Discussed') setActiveStatus(2);
            if (editNote[0].status === 'Assigned') setActiveStatus(3);
        };
    }, [editNote]);

    const cancelCreateNote = (e) => {
        e.preventDefault();
        dispatch(changeHidden(true));
        dispatch(cleanIsError(null));
        dispatch(cleanEditNote());
        cleanNoteStates();
    }

    const changeHandler = e => {
        dispatch(cleanIsError(null));
        setTask({...task, [e.target.name]: e.target.value});
    }
    const showMarking = (e) => {
        setActiveMarking(+(e.target.dataset.number));
        changeMarkingValue(e.target.dataset.mark);
    }

    const showOwnMarking = (e) => {
        setActiveMarking(+(e.target.dataset.number));
        changeMarkingValue(e.target.value);
    }
    const changeMarkingValue = (value) => {
        setMarkingValue(value);
    }

    const showStatus = (e) => {
        setActiveStatus(+(e.target.dataset.number));
        changeStatusValue(e.target.dataset.status)
    }
    const showOwnStatus = (e) => {
        setActiveStatus(+(e.target.dataset.number));
        changeStatusValue(e.target.value)
    }



    const changeStatusValue = (value) => {
        setStatusValue(value);
    }
    const markStyle = {
        red: {background: `#FF7272`},
        blue: {background: `#2B76BB`},
        green: {background: `#57AE49`},
        yellow: {background: `#FBF458`},
        violet: {background: `#CC79DA`},
        turquoise: {background: `#79F8E1`},
    };

    const checkingValue = (val) => {
        if (val.trim() === '') return false;
        return true
    }

    const createAndAddNote = (e) => {
        e.preventDefault();
        dispatch(createNote(task));
        if (checkingValue(task.title)) {
            dispatch(changeHidden(true));
            cleanNoteStates();
        }
    }

    const updateNote = (e) => {
        e.preventDefault();
        dispatch(updateEditNote(task, editNote[0]._id));
        if (checkingValue(task.title)) {
            dispatch(changeHidden(true));
            cleanNoteStates();
        }
    }

    const preventDef = (e) => {
        e.preventDefault();
    }


    return (
    <div className="create-note">
        <form
            className="create-note__form"
            onSubmit={preventDef}
        >
        <div className="create-note__btns">
            <button
                    className="create-note__cancel-btn"
                    onClick={cancelCreateNote}
            >Cancel</button>
            <div className={editNote.length ? 'hidden' : ""}>
                <ButtonItem
                    onClick={createAndAddNote}
            >Add</ButtonItem>
            </div>
            <div className={editNote.length ? '' : 'hidden'}>
                <ButtonItem
                    onClick={updateNote}
            >Edit</ButtonItem>
            </div>

        </div>
            <label className="create-note__label-task">Title {!error ? '' : `(${error})`}
            <InputItem
                className={`create-note__input-title ${!error ? '' : `create-note__label-title--error`}`}
                placeholder="add a title ..."
                type="text"
                name='title'
                value={task.title}
                onChange={changeHandler}
            />
            </label>
            <div className="create-note__items-box">
            <label className="create-note__label-task" >Description
            <textarea
                className="create-note__description"
                name="description"
                placeholder="add a description ..."
                value={task.description}
                onChange={changeHandler}
            ></textarea></label>


                <div className="create-note__mark">
                    <input
                        type="hidden"
                        name="marking"
                        value={task.marking = markingValue}
                        onChange={changeHandler}
                    ></input>
                    <div
                        className="create-note__label-task"
                        >Marking</div>
                    <ul className='create-note__mark-list'>
                            <li
                            onClick={showMarking}
                            className={`create-note__item-mark ${activeMarking === 1 ? 'create-note__item--active' : ""}`}
                            data-mark="#57AE49"
                            data-number="1"
                            style={markStyle.green}
                            ></li>
                            <li
                            className={`create-note__item-mark ${activeMarking === 2 ? 'create-note__item--active' : ""}`}
                            data-mark="#2B76BB"
                            data-number="2"
                            style={markStyle.blue}
                            onClick={showMarking}
                            ></li>
                            <li
                            className={`create-note__item-mark ${activeMarking === 3 ? 'create-note__item--active' : ""}`}
                            data-mark="#FF7272"
                            data-number="3"
                            style={markStyle.red}
                            onClick={showMarking}
                            ></li>
                            <li
                            className={`create-note__item-mark ${activeMarking === 4 ? 'create-note__item--active' : ""}`}
                            onClick={showMarking}
                            data-mark="#FBF458"
                            data-number="4"
                            style={markStyle.yellow}
                            ></li>
                            <li
                            className={`create-note__item-mark ${activeMarking === 5 ? 'create-note__item--active' : ""}`}
                            data-mark="#CC79DA"
                            data-number="5"
                            style={markStyle.violet}
                            onClick={showMarking}
                            ></li>
                            <li
                            className={`create-note__item-mark ${activeMarking === 6 ? 'create-note__item--active' : ""}`}
                            data-mark="#79F8E1"
                            data-number="6"
                            style={markStyle.turquoise}
                            onClick={showMarking}
                            ></li>
                            <li
                            className="create-note__item-mark-own"
                            > <input className={activeMarking === 7 ? 'create-note__item--active' : ""} type="color" data-number="7" onChange={showOwnMarking} /><span>Own</span> </li>
                    </ul>

                </div>
            </div>

                <div className="create-note__status">
                    <input
                        type="hidden"
                        name="status"
                        value={task.status = statusValue}
                        onChange={changeHandler}
                    ></input>
                    <div className="create-note__label-task" onClick={showStatus}>Status</div>
                    <ul className='create-note__status-list'>
                            <li
                            className={`create-note__item-status ${activeStatus === 1 ? 'create-note__item--active' : ""}`}
                            data-status="New"
                            data-number="1"
                            onClick={showStatus}
                            >New</li>
                            <li
                            className={`create-note__item-status ${activeStatus === 2 ? 'create-note__item--active' : ""}`}
                            data-status="Discussed"
                            data-number="2"
                            onClick={showStatus}
                            >Discussed</li>
                            <li
                            className={`create-note__item-status ${activeStatus === 3 ? 'create-note__item--active' : ""}`}
                            data-status="Assigned"
                            data-number="3"
                            onClick={showStatus}
                            >Assigned</li>
                            <li
                            className="create-note__item-status-own"
                            > <input className="create-note__input-status-own" value={task.status} data-number="4" placeholder="choose your own ..." type="text" onChange={showOwnStatus} /></li>
                    </ul>
                </div>
            </form>
        </div>
    );
}

export default CreateNote;