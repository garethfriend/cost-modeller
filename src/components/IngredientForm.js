import React from 'react'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'


import { 
    getBaseCurrency, 
    getBaseUnit, 
    getIngredient, 
    getIngredientCollection 
} from '../redux/selectors'
import { createIngredient, editIngredient } from '../redux/ingredient'
import CurrencyDropdown from './CurrencyDropdown'
import MeasureDropdown from './MeasureDropdown'

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        padding: theme.spacing(2)
    }
}))

const IngredientForm = ({ id, open, ingredient, collection, baseCurrency, baseUnit, editIngredient, createIngredient, handleFormClose }) => {
    const { register, handleSubmit, control } = useForm()
    const classes = useStyles()
    const onSubmit = (data) => {
        if (id) {
            editIngredient(id, data)
            handleFormClose(false)
        } else {
            createIngredient(data)
            handleFormClose(false)
        }
    }

    return (
        <Dialog open={open} onClose={() => handleFormClose(false)}>
            <div className={classes.dialogContainer}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <TextField 
                        inputRef={register} 
                        name='ingredientName'
                        label='Ingredient name' 
                        defaultValue={ingredient ? ingredient.ingredientName : ''}
                        variant='outlined' 
                        size='small' 
                        fullWidth
                    />
                    <TextField 
                        inputRef={register} 
                        name='cost'
                        label='Cost' 
                        defaultValue={ingredient ? ingredient.cost : ''}
                        type='number' 
                        variant='outlined' 
                        size='small'
                        fullWidth 
                    />
                    <Controller
                        as={CurrencyDropdown}
                        id='currency' 
                        name='pricedInCurrency' 
                        label='In currency' 
                        defaultValue={ingredient ? ingredient.pricedInCurrency : baseCurrency}
                        className=''
                        control={control}
                        fullWidth
                    />
                    <TextField 
                        inputRef={register} 
                        name='numberOfUnits' 
                        label='Per number'
                        defaultValue={ingredient ? ingredient.numberOfUnits : ''}
                        type='number' 
                        variant='outlined' 
                        size='small'
                        fullWidth 
                    />
                    <Controller
                        as={MeasureDropdown}
                        id='units' 
                        name='unit' 
                        label='of units' 
                        defaultValue={ingredient ? ingredient.unit : baseUnit}
                        className=''
                        control={control}
                        fullWidth
                    />
                    <TextField 
                        inputRef={register} 
                        name='quantity'
                        label='quantity' 
                        defaultValue={ingredient ? ingredient.quantity : ''}
                        type='number' 
                        variant='outlined' 
                        size='small'
                        fullWidth 
                    />
                    <FormControl variant="outlined" className='' size='small' fullWidth>
                        <InputLabel id="collectionLabel">Collection</InputLabel>
                        <Controller
                            as={Select}
                            id='collection' 
                            name='collection' 
                            labelId='collectionLabel' 
                            defaultValue={collection}
                            control={control}
                        >
                            <MenuItem value='fixed'>Fixed</MenuItem>
                            <MenuItem value='balance'>Balance</MenuItem>
                            <MenuItem value='variable'>Variable</MenuItem>
                        </Controller>
                    </FormControl>
                    <Button 
                        type='submit' 
                        variant='outlined'>{ingredient ? 'Save' : 'Create'}
                    </Button>
                </form>
            </div>
        </Dialog>
    )
}

const mapStateToProps = (state, ownProps) => {
    const ingredient =  ownProps.id ? getIngredient(state, ownProps.id) : null
    const collection = ownProps.id ? getIngredientCollection(state, ownProps.id) : 'balance'
    return ({
        ingredient,
        collection,
        baseCurrency: getBaseCurrency(state),
        baseUnit: getBaseUnit(state)
    })
}


export default connect(mapStateToProps, { editIngredient, createIngredient })(IngredientForm)
