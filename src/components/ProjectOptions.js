import React from 'react'
import { connect } from 'react-redux'

import CurrencyDropdown from './CurrencyDropdown'
import * as selectors from '../redux/selectors'
import { changeBaseCurrency, changeUnitType, changeBaseUnits } from '../redux/config'
import MeasureDropdown from './MeasureDropdown'

const ProjectOptions = (props) => {
    
    const renderDropdowns = () => {
        const {rates, baseCurrency, changeBaseCurrency, changeUnitType, changeBaseUnits, baseUnit} = props

        return (
            <></>
            // <Grid stackable columns="equal">
            //     <Grid.Row width={16}>
            //         <Grid.Column width={5}>
            //             <Label>Currency:</Label>
            //             <CurrencyDropdown 
            //                 className="ui fluid selection dropdown"
            //                 rates={rates}
            //                 selectedCurrency={baseCurrency}
            //                 onChange={changeBaseCurrency}
            //             />
            //         </Grid.Column>
            //         <Grid.Column>
            //             <Label>Quantities by:</Label>
            //             <select 
            //                 className="ui fluid selection dropdown"
            //                 onChange={(event) => changeUnitType(event.target.value)} 
            //                 value={baseUnit}
            //             >
            //                 <option value="mass" >mass</option>
            //                 <option value="volume" >volume</option>
            //             </select>
            //         </Grid.Column>
            //         <Grid.Column>
            //             <Label>Units:</Label>
            //             <MeasureDropdown 
            //                 className="ui fluid selection dropdown"
            //                 pluralUnitNames
            //                 onChange={changeBaseUnits}
            //                 selectedUnit={baseUnit}
            //             />
            //         </Grid.Column>
            //     </Grid.Row>
            // </Grid>
        )
    }

    const currencyLoader = () => <div className="ui active small text centered inline loader">Getting exchange rates...</div>

    return (
        <form className="ui stackable two column grid">
            {props.isLoading ? currencyLoader() : renderDropdowns()}                
        </form>
    )
}

const mapStateToProps = (state) => ({ 
        rates: selectors.getRates(state),
        isLoading: selectors.getLoadingStatus(state),
        baseCurrency: selectors.getBaseCurrency(state),
        unitType: selectors.getUnitType(state),
        baseUnit: selectors.getBaseUnit(state)
})

export default connect(mapStateToProps, { changeBaseCurrency, changeUnitType, changeBaseUnits })(ProjectOptions)
