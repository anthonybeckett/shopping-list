import React from 'react'
import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik';

import ShoppingItem from '../DB/Models/ShoppingItem';

const shoppingItem = new ShoppingItem();

const ImportTextList = ({ navigation, route }) => {
    
    const parseListAndAdd = (data, seperator = "\n") => {
        if(data == '')
            return false;
        
        let arrData = data.split(seperator);

        if(typeof arrData !== 'object'){
            console.log(typeof arrData, arrData);

            if(seperator == "\n"){
                parseListAndAdd(data, ",");
            }
            
            return false;
        }

        arrData.forEach((item, index) => {
            shoppingItem.create(route.params.id, item.trim(), index);
        });

        navigation.goBack();
    }
    
    return (
        <Formik
            initialValues={{ list: '' }}
            onSubmit={values => parseListAndAdd(values.list)}
        >
            {
                ({ handleChange, handleBlur, handleSubmit, values }) => (
                    
                    <View style={styles.container}>
                        <TextInput 
                            onChangeText={handleChange('list')}
                            onBlur={handleBlur('list')}
                            value={values.list}
                            style={styles.listInput}
                            placeholder="Paste List"
                            multiline = {true}
                            numberOfLines = {20}
                        />

                        <Button onPress={handleSubmit} title="Add Shopping List" style={styles.btn} />
                    </View>
                )
            }
        </Formik>
    )
}

export default ImportTextList

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 5
    },
    listInput: {
        flex: 1,
        justifyContent: "flex-start",
        textAlignVertical: "top",
        borderColor: "grey",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 5
    }
})
