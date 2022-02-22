import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch, } from 'react-native';


function menu(){
  let [search, setSearch] = useState(``);
  let [plat, setPlat] = useState(PLATS);

  let selectedPlat = PLATS.filter(function (plat) {
    return plat.isSelected;
  });

  let filteredPlat = PLATS.filter(function (plat) {
    return plat.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  return (
    
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', padding: 10, height: '100%', overflow: 'auto' }}>
      <Text>DelivCrous</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Rechercher un plat..."
          style={styles.searchInput}
          value={search}
          onChangeText={function (text) {
            setSearch(text);
          }}
        />
        
        <View style={styles.cardsContainer}>
          {filteredPlat.map(function (plat) {
            return (
              <Card
                imageUrl={plat.imageUrl}
                name={plat.name}
                descritpion={plat.descritpion}
                isSelected={plat.isSelected}
                onSelect={function () {
                  let newAgents = [...PLATS];
                  newAgents = newAgents.map(function (p) {
                    if (plat.name == p.name) {
                      p.isSelected = !p.isSelected;
                      return p;
                    }
                    return p;
                  });
                  setPlat(newAgents);
                }}
              />
            );
          })}
        </View>
      </View>

     

    </ScrollView>

  );

}


  export default menu;