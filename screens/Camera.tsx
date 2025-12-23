import React from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity  } from "react-native";


export default function Camera(){
    return(
        <>
        <View>
            <Text style={styles.heading}>
                Camera Section
            </Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        color: '#1A1A1D',
    }
})