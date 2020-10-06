import React from 'react'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Grid from '@material-ui/core/Grid'
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
    const { register, handleSubmit, control, errors } = useForm()
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

    const defaultValues = {
        ingredientName: ingredient ? ingredient.ingredientName : '',
        cost: ingredient ? ingredient.cost : 0,
        pricedInCurrency: ingredient ? ingredient.pricedInCurrency : baseCurrency,
        numberOfUnits: ingredient ? ingredient.numberOfUnits : 1,
        unit: ingredient ? ingredient.unit : baseUnit,
        quantity: ingredient ? ingredient.quantity : 1,
        collection: collection
    }

    const rules = {
        ingredientName: {
            required: true
        },
        cost: {
            required: true,
            validate: value => value >= 0
        },
        numberOfUnits: {
            required: true,
            validate: value => value > 0
        },
        quantity: {
            required: true,
            validate: value => value > 0
        },
    }
    
    return (
        <Dialog open={open} onClose={() => handleFormClose(false)}>
            <div className={classes.dialogContainer}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Grid container direction='column' spacing={3}>
                        <Grid item>
                            <TextField 
                                inputRef={register(rules.ingredientName)} 
                                name='ingredientName'
                                label='Ingredient name' 
                                defaultValue={defaultValues.ingredientName}
                                variant='outlined' 
                                size='small' 
                                fullWidth
                            />
                            {errors.ingredientName && 'An ingredient name is required'}
                        </Grid>
                        <Grid item>
                            <TextField 
                                inputRef={register(rules.cost)} 
                                name='cost'
                                label='Cost' 
                                defaultValue={defaultValues.cost}
                                type='number' 
                                variant='outlined' 
                                inputProps={{ min: "0", step: "0.01" }}
                                size='small'
                                fullWidth 
                            />                
                            {errors.cost && 'A cost is required'}         
                        </Grid>
                        <Grid item>
                            <Controller
                                as={CurrencyDropdown}
                                id='currency' 
                                name='pricedInCurrency' 
                                label='In currency' 
                                defaultValue={defaultValues.pricedInCurrency}
                                className=''
                                control={control}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                inputRef={register(rules.numberOfUnits)} 
                                name='numberOfUnits' 
                                label='Per number'
                                defaultValue={defaultValues.numberOfUnits}
                                type='number' 
                                variant='outlined' 
                                size='small'
                                fullWidth 
                            />
                            {errors.numberOfUnits && 'A number of units is required'}
                        </Grid>
                        <Grid item>
                            <Controller
                                as={MeasureDropdown}
                                id='units' 
                                name='unit' 
                                label='of units' 
                                defaultValue={defaultValues.unit}
                                className=''
                                control={control}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                inputRef={register(rules.quantity)} 
                                name='quantity'
                                label='quantity' 
                                defaultValue={defaultValues.quantity}
                                type='number' 
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{baseUnit}</InputAdornment>,
                                }}
                                variant='outlined' 
                                size='small'
                                fullWidth 
                            />
                            {errors.quantity && 'A quantity is required'}
                        </Grid>
                        <Grid item>
                        <Controller
                            as={
                                <RadioGroup>
                                <FormControlLabel
                                    value='variable'
                                    control={<Radio />}
                                    label='variable'
                                />
                                <FormControlLabel
                                    value='balance'
                                    control={<Radio />}
                                    label='balance'
                                />
                                <FormControlLabel
                                    value='fixed'
                                    control={<Radio />}
                                    label='fixed'
                                />
                                </RadioGroup>
                            }
                            name='collection'
                            control={control}
                            defaultValue={defaultValues.collection}
                            />
                            {/* <FormControl variant="outlined" className='' size='small' fullWidth>
                                <InputLabel id="collectionLabel">Collection</InputLabel>
                                <Controller
                                    as={Select}
                                    id='collection' 
                                    name='collection' 
                                    labelId='collectionLabel' 
                                    defaultValue={defaultValues.collection}
                                    control={control}
                                >
                                    <MenuItem value='fixed'>Fixed</MenuItem>
                                    <MenuItem value='balance'>Balance</MenuItem>
                                    <MenuItem value='variable'>Variable</MenuItem>
                                </Controller>
                            </FormControl> */}
                        </Grid>
                        <Grid item>
                            <Button 
                                type='submit' 
                                variant='outlined'>{ingredient ? 'Save' : 'Create'}
                            </Button>
                        </Grid>
                    </Grid>
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
