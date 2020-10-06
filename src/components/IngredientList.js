import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
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
    },
    list: {
        flexGrow: 1,
        padding: theme.spacing(1), 
        maxWidth: '400px'
    },
    topDivider: {
        marginTop: theme.spacing(1)
    }
}))

const IngredientList = ({ ingredients, baseUnit, deleteIngredient, handleFormOpen }) => {
    const classes = useStyles()

    return (
        <Grid item xs={12} md={4} className={classes.list}>
            <Divider className={classes.topDivider}/>        
            <List>
                {ingredients.map(ingredient => {
                    return (
                        <ListItem key={ingredient.id} className={classes.li} >
                            <Typography variant='body1' className={classes.ingName}>{ingredient.ingredientName}</Typography>
                            <Typography variant='body2' className={classes.ingQuant}>{`${ingredient.quantity}${baseUnit}`}</Typography>
                            
                            <Tooltip title='Edit ingredient'>
                                <IconButton 
                                    className={classes.editButton}
                                    onClick={() => handleFormOpen(ingredient.id)}
                                >
                                    <EditIcon />
                                </IconButton>
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
                })}
            </List>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    ingredients: getIngredients(state),
    baseUnit: getBaseUnit(state)
})

export default connect(mapStateToProps, {deleteIngredient})(IngredientList)
