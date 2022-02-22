import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch, } from 'react-native';

let PLATS = [
  {
    imageUrl:
      'https://www.pizza2.fr/images/hamburger-frite.jpg',
    name: 'Hamburger',
    descritpion: 'burger frites',
    isSelected: false,
  },
  {
    imageUrl:
      'https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F13d543a6-cdf7-400e-9c5a-b274a8f22e5e.2Ejpeg/748x372/quality/80/crop-from/center/pizza-margherita.jpeg',
    name: 'Pizza margarita',
    descritpion: 'bien cuite par notre chef',
    isSelected: false,
  },
  {
    imageUrl:
      'https://img.cuisineaz.com/610x610/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg',
    name: 'Spaghetti bolognese',
    descritpion: 'la classico',
    isSelected: false,
  },
  {
    imageUrl:
      'https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg',
    name: 'Pâtes carbonara  ',
    descritpion: 'genial !',
    isSelected: false,
  },
];




export default function App() {
  let menus = true;
  if(menus == true){
  return (menu())
  }else{
    return (panier())
  }
  
}



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





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  searchInput: {
    color: 'black',
    padding: 8,
    borderRadius: 4,
    borderColor: 'grey',
    borderWidth: 1,
  },
  cardsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
  },
  cardContainer: {
    margin: 8,
    width: '40%',
    height: '40%',
    borderRadius: 8,
    borderColor: '#31334a',
    borderWidth: 0.1,
    marginVertical: 2,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  carddescritpion: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 4,
    fontSize: 16,
    color: 'black',
  },
});