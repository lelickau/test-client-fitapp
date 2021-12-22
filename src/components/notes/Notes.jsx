import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../taskItem/TaskItem';
import LocalLoader from '../loader/LocalLoader';

import './notes.scss';

function Notes({tasks}) {
    const loading = useSelector(state => state.notes.isLoading);

    return (
        <div className="notes">
        <h2 className="notes__title">Task List</h2>
        {
            loading ?
            <LocalLoader/> :
            <>
                <div className="notes__box-items">
                    {!tasks.length
                    ? <h2 className="notes__empty">The note list is empty</h2>
                    : tasks.map((item, index) => <TaskItem task={item} index={index} key={item._id} />)
                    }
                    </div>
            </>
        }
        </div>
    );
}

export default Notes;