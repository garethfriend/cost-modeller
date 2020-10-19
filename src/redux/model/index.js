import { 
    SET_MODEL_LIMITS,
    SET_MODEL_LIMIT_TYPE,
} from '../types'
import { combineReducers } from 'redux'

// ACTIONS

export const changeModelLimitType = (type) => ({
    type: SET_MODEL_LIMIT_TYPE,
    payload: type
})

export const changeModelLimits = (limits) => ({
    type: SET_MODEL_LIMITS,
    payload: limits
})

// REDUCERS

const limitTypeReducer = (state = '%tot', action) => {
    switch (action.type) {
        case SET_MODEL_LIMIT_TYPE:
            return action.payload
        default:
            return state
    }
}

const modelLimitsReducer = (state = [0, 0], action) => {
    switch (action.type) {
        case SET_MODEL_LIMITS:
            return action.payload
        case SET_MODEL_LIMIT_TYPE:
            return [0, 0]
        default:
            return state
    }
}

const configReducer = combineReducers({
    modelLimitType: limitTypeReducer,
    modelLimit: modelLimitsReducer,
})

export default configReducer

// SELECTORS

export const getModelLimits = state => state.modelLimit

export const getModelLimitType = state => state.modelLimitType
