import { View, Text } from 'react-native'
import React from 'react'
import FilterRender from './FilterRender'

const FilterLogic = ({ route, navigation }: any) => {
// console.log('props.route.params?.filterData.headingdd',route.params?.filterData.heading)
    return (
        <FilterRender route={route}/>
    )
}

export default FilterLogic