import React from 'react'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import FormLabel from '@material-ui/core/FormLabel'

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
    formTitle: {
        paddingBottom: 0
    },
    paper: { 
        minWidth: '365px',
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />;
})

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
        cost: ingredient ? ingredient.cost : '',
        pricedInCurrency: ingredient ? ingredient.pricedInCurrency : baseCurrency,
        numberOfUnits: ingredient ? ingredient.numberOfUnits : '',
        unit: ingredient ? ingredient.unit : baseUnit,
        quantity: ingredient ? ingredient.quantity : '',
        collection: collection
    }

    const rules = {
        ingredientName: {
            required: {
                value: true,
                message: 'An ingredient name is required'
            } 
        },
        cost: {
            required: {
                value: true,
                message: 'Cost is required'
            },
        },
        numberOfUnits: {
            required: {
                value: true,
                message: 'The number of units is required'
            },
            validate: value => value > 0 || 'A number greater than 0 is required'
        },
        quantity: {
            required: {
                value: true,
                message: 'A quantity is required'
            },
            validate: value => value > 0 || 'A number greater than 0 is required'
        },
    }

    return (
        <Dialog 
            open={open} 
            onClose={() => handleFormClose(false)}
            TransitionComponent={Transition}
            fullWidth
            maxWidth={'md'}
            className={classes.paper}
        >
            <DialogTitle className={classes.formTitle}>{`${ingredient ? 'Edit' : 'Create'} Ingredient:`}</DialogTitle>
            <DialogContent >
                <Grid container spacing={2}>            
                    <Grid item>
                        <Typography variant='h4'>{}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            error={!!errors.ingredientName}
                            inputRef={register(rules.ingredientName)} 
                            name='ingredientName'
                            label='Ingredient name' 
                            defaultValue={defaultValues.ingredientName}
                            variant='outlined' 
                            size='small' 
                            fullWidth
                            helperText={errors.ingredientName ? errors.ingredientName.message : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            error={!!errors.cost}
                            inputRef={register(rules.cost)} 
                            name='cost'
                            label='Cost' 
                            defaultValue={defaultValues.cost}
                            type='number' 
                            variant='outlined' 
                            inputProps={{ min: '0', step: '0.01' }}
                            size='small'
                            fullWidth 
                            helperText={errors.cost ? errors.cost.message : null}
                        />                
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!!errors.numberOfUnits} 
                            inputRef={register(rules.numberOfUnits)} 
                            name='numberOfUnits' 
                            label='Per number'
                            defaultValue={defaultValues.numberOfUnits}
                            type='number' 
                            variant='outlined' 
                            inputProps={{ min: '0', step: '0.00001' }}
                            size='small'
                            fullWidth 
                            helperText={errors.numberOfUnits ? errors.numberOfUnits.message : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            error={!!errors.quantity}
                            inputRef={register(rules.quantity)} 
                            name='quantity'
                            label='quantity' 
                            defaultValue={defaultValues.quantity}
                            type='number' 
                            inputProps={{ 
                                min: '0',
                                step: '0.00001'
                            }}
                            InputProps={{ endAdornment: <InputAdornment position="end">{baseUnit}</InputAdornment> }}
                            variant='outlined' 
                            size='small'
                            fullWidth 
                            helperText={errors.quantity ? errors.quantity.message : null}
                        />
                    </Grid>
                    <Grid item>
                        <FormLabel>Select Collection:</FormLabel>
                        <Controller
                            as={
                                <RadioGroup row>
                                <Tooltip title='Contents are the subject of the model and scale between limits'>
                                    <FormControlLabel
                                        value='variable'
                                        control={<Radio />}
                                        label='variable'
                                        labelPlacement='bottom'
                                    />
                                </Tooltip>
                                <Tooltip title='This group scales its contents to accomodate changes to variable group'>
                                    <FormControlLabel
                                        value='balance'
                                        control={<Radio />}
                                        label='balance'
                                        labelPlacement='bottom'
                                    />
                                </Tooltip>
                                <Tooltip title='Contents of this group have fixed quantities'>
                                    <FormControlLabel
                                        value='fixed'
                                        control={<Radio />}
                                        label='fixed'
                                        labelPlacement='bottom'
                                    />
                                </Tooltip>
                                </RadioGroup>
                            }
                            name='collection'
                            control={control}
                            defaultValue={defaultValues.collection}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit((data) => onSubmit(data))}
                >
                    {ingredient ? 'Save' : 'Create'}
                </Button>
                <Button 
                    variant='contained'
                    color='default'
                    onClick={() => handleFormClose(false)} 
                >
                    Cancel
                </Button>
            </DialogActions>
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
