import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RadioButton = (props) => {
  return (
    <View style={[{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D4D5DAB2',
        alignItems: 'center',
        justifyContent: 'center',
      }, props.style]}> 
        {
          props.id == props.radioSelected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#FF0000',  
            }}/>
            : null
        }
      </View>
  )
}

export default RadioButton

const styles = StyleSheet.create({})