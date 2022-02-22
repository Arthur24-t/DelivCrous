import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch, } from 'react-native';




function panier(){

    return(
      <View style={{ alignItems: 'center' }}>
            <Text style={styles.cardText}>plat selectionné(s) :</Text>
            <View>
              {selectedPlat.length > 0 ? (
                selectedPlat.map(function (plat) {
                  return <Text style={styles.cardText}>{plat.name}</Text>;
                })
              ) : (
                <Text style={[styles.cardText, { fontSize: 12, color: 'grey' }]}>
                  Aucun plat selectionné
                </Text>
              )}
            </View>
          </View>
  
  
  
    );
  }






export default panier;