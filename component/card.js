import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch, } from 'react-native';



function Card(props) {
    return (
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: props.imageUrl,
          }}
        />
        <View style={styles.carddescritpion}>
          <Text style={[styles.cardText, { fontSize: 20, fontWeight: 'bold' }]}>
            {props.name}
          </Text>
          <Text style={styles.cardText}>{props.descritpion}</Text>
        </View>
        <Switch
          style={{ alignSelf: 'center' }}
          value={props.isSelected}
          onValueChange={props.onSelect}
        />
      </View>
    );
  }
  export default Card;