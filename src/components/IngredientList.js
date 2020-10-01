import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import { getBaseUnit, getIngredients } from '../redux/selectors'
import { deleteIngredient } from '../redux/ingredient'

const useStyles = makeStyles(theme => ({
    editButton: {
        padding: 0,
        marginLeft: 'auto'
    },
    deleteButton: {
        float: 'right',
        padding: 0,
        marginLeft: '0.3em',
    },
    ingName: {
        width: '150px',
        wordWrap: true
    },
    ingQuant: {
        
    },
    li: {
        padding: theme.spacing(0.5)
    }
}))

const IngredientList = ({ ingredients, baseUnit, deleteIngredient }) => {
    const classes = useStyles()

    const renderedIngredientsList = ingredients.map(ingredient => {
        return (
            <ListItem key={ingredient.id} className={classes.li} >
                <Typography variant='body1' className={classes.ingName}>{ingredient.ingredientName}</Typography>
                <Typography variant='body2' className={classes.ingQuant}>{`${ingredient.quantity}${baseUnit}`}</Typography>
                
                <Tooltip title='Edit ingredient'>
                    <IconButton className={classes.editButton}><EditIcon /></IconButton>
                </Tooltip>
                <Tooltip title='Delete ingredient'>
                    <IconButton 
                        className={classes.deleteButton}
                        onClick={() => deleteIngredient(ingredient.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
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

export default connect(mapStateToProps, {deleteIngredient})(IngredientList)
