import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import React from 'react'
import { connect } from 'react-redux'

import { getBaseUnit, getIngredients } from '../redux/selectors'

const IngredientList = ({ ingredients, baseUnit }) => {

    const renderedIngredientsList = ingredients.map(ingredient => {
        return (
            <>
                <Divider key={ingredient.id}/>
                <ListItem key={ingredient.id}>{`${ingredient.ingredientName} ${ingredient.quantity}${baseUnit}`}</ListItem>
            </>
        )
    })

    return (
        <List>
            {renderedIngredientsList}
        </List>
    )
}

const mapStateToProps = (state) => ({
    ingredients: getIngredients(state),
    baseUnit: getBaseUnit(state)
})

export default connect(mapStateToProps)(IngredientList)
