import { Fragment } from 'react';
import AvaibleMeals from './AvailableMeals';

import MealsSummary from './MealsSummary';

const Meals = () => {
    return(
        <Fragment>
            <MealsSummary/>
            <AvaibleMeals/>
        </Fragment>
    );
};

export default Meals;