import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

const CartScreen = () => {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [bmi, setBmi] = useState(0.0)
  
  const checkInput = (input: string) =>{
    if (parseInt(input) < 0) Alert.alert('Nhập không đúng định dạng!')
  }

  const obesityLevel = (bmi: Float) =>{
    if(bmi > 32) return 'Obese'
    else if (bmi >= 25 && bmi < 32) return 'Over Weight'
    else if (bmi >= 18.5 && bmi < 25) return 'Normal Weight'
    else if (bmi < 18.5) return 'Under Weight'
    else return 'Undefine'
  }

  const onCaculate = (bmi: Float) =>{
    Alert.alert('You are ', obesityLevel(bmi).toString())
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.InputContainer}
    >
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
      >
        <View style={styles.Inner}>
        <Text style={styles.TitleText}>Height (CM)</Text>
        <TextInput
          style={styles.TextInput}
          placeholder={'0'}
          keyboardType = 'numeric'
          onChangeText={(text) => {
            text == ''? setHeight(0) : setHeight(parseInt(text))
            checkInput(text)
          }}
        />
        <Text style={styles.TitleText}>Weight (KG)</Text>
        <TextInput
          style={styles.TextInput}
          keyboardType = 'numeric'
          placeholder={'0'}
          onChangeText={(text) => {
            text == ''? setWeight(0) : setWeight(parseInt(text))
            checkInput(text)
          }}
        />
        <Text style={styles.OutputText}>BMI: {bmi.toFixed(2)}</Text>
        <View style={styles.PriceFooter}>
          <TouchableOpacity style={styles.PayButton}
          onPress={() =>{
            weight == 0 || height == 0 ? setBmi(0): setBmi((weight/Math.pow(height/100, 2)))
            onCaculate(bmi)
          }}>
            <Text style={styles.ButtonTile}>Tính</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  InputContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  Inner: {
    padding: 24,
    justifyContent: 'space-around',
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  TitleText: {
    fontSize: 18,
  },
  OutputText: {
    justifyContent: 'center',
    fontSize: 20
  },
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 30,
  },
  PayButton: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36 * 2,
    borderWidth: 2,
    borderColor: 'blue',
  },

  ButtonTile: {
    fontSize: 30,
    color: 'black',
  },
})

export default CartScreen