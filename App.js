import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch,TouchableOpacity } from 'react-native';

let PLATS = [
  {
    imageUrl:
      'data:image/jpeg;base64,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',
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
      <View style={styles.Border}>
      <Text>DelivCrous</Text>

      <TouchableOpacity
        onPress={() => panier()}
        >
        <Text >Pannier</Text>
      </TouchableOpacity>

      </View>
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
      <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.cardImage}>
      <Image
        style={styles.cardImage}
        source={{
          uri: props.imageUrl,
        }}
      />
      </TouchableOpacity>
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
  return(
    <View style={{ alignItems: 'center' }}>
          <Text style={styles.cardText}>plat selectionné(s) :</Text>
          <View>
            {selectedPlat.length > 0 ? (
              selectedPlat.map(function(plat) {
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
    margin:0,
    width: '100%',
    
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
  Border:{
flex:0.05  ,
justifyContent:'space-between',
flexWrap: 'nowrap',
flexDirection: 'row',
margin:0,
backgroundColor: 'red',
width: '100%',
  },
});