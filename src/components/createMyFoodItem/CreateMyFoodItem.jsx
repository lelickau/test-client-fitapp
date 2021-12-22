import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeHidden, cleanIsError } from '../../redux/actions/global';
import { addFood } from '../../redux/actions/foods';
import ButtonItem from '../UI/buttons/ButtonItem';
import InputItem from '../UI/inputs/InputItem';

import './createMyFoodItem.scss';

function CreateMyFoodItem() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.global.isError);

    const [food, setFood] = useState({
        scale: 100,
        searchFood: false,
        label: '',
        CHOCDF: 0,
        PROCNT: 0,
        FAT: 0,
        ENERC_KCAL: 0,
        FIBTG: 0
    });

    const cleanFoodState = () => {
        setFood({
            scale: 100,
            searchFood: false,
            label: '',
            CHOCDF: 0,
            PROCNT: 0,
            FAT: 0,
            ENERC_KCAL: 0,
            FIBTG: 0
        })
    }

    const cancelCreateFood = (e) => {
        e.preventDefault();
        dispatch(changeHidden(true));
        dispatch(cleanIsError(null));
        cleanFoodState();
        console.log(food)
    }

    const changeHandler = (e) => {
        dispatch(cleanIsError(null));
        setFood({...food, [e.target.name]: e.target.value});
    }

    const createAndAddFood = (e) => {
        e.preventDefault();
        dispatch(addFood(food));
        if (!error) cleanFoodState();
    }

    return (
        <div className="create-food">
            <form className="create-food__form">
                <div className="create-food__btns">
                    <button
                        className="create-food__cancel-btn"
                        onClick={cancelCreateFood}
                    >Cancel</button>
                    <ButtonItem
                            onClick={createAndAddFood}
                    >Add</ButtonItem>
                </div>
                <div className="create-food__data-box">
                    <div className="create-food__data">
                        <label className={!error ? "create-food__label-item" : "create-food__label-item create-food__error"}>Name of food
                            <span className={error ? "error-message" : "hidden"}>{error}</span>
                            <InputItem
                                placeholder="orange"
                                type="text"
                                name='label'
                                value={food.label}
                                onChange={changeHandler}
                            />
                        </label>
                        <label className="create-food__label-item"><span className="create-food__point create-food__crabs"></span>Crabs (g)
                            <InputItem
                                placeholder="4.8"
                                type="number"
                                name='CHOCDF'
                                value={food.CHOCDF}
                                onChange={changeHandler}
                            />
                        </label>
                        <label className="create-food__label-item"><span className="create-food__point create-food__fat"></span>Total fat (g)
                            <InputItem
                                placeholder="3.1"
                                type="number"
                                name='FAT'
                                value={food.FAT}
                                onChange={changeHandler}
                            />
                        </label>
                        <label className="create-food__label-item"><span className="create-food__point create-food__protein"></span>Protein (g)
                            <InputItem
                                placeholder="3.2"
                                type="number"
                                name='PROCNT'
                                value={food.PROCNT}
                                onChange={changeHandler}
                            />
                        </label>
                    </div>
                    <div className="create-food__data">
                        <label className="create-food__label-item">Per grams of product (g)
                            <InputItem
                                placeholder="100"
                                type="number"
                                name='scale'
                                value={food.scale}
                                onChange={changeHandler}
                            />
                        </label>
                        <label className="create-food__label-item"><span className="create-food__point create-food__energy"></span>Energy per serving (kcal)
                            <InputItem
                                placeholder="61"
                                type="number"
                                name='ENERC_KCAL'
                                value={food.ENERC_KCAL}
                                onChange={changeHandler}
                            />
                        </label>
                        <label className="create-food__label-item"><span className="create-food__point create-food__fiber"></span> Dietary fiber (g)
                            <InputItem
                                placeholder="0"
                                type="number"
                                name='FIBTG'
                                value={food.FIBTG}
                                onChange={changeHandler}
                            />
                        </label>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default CreateMyFoodItem;