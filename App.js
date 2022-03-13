import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Switch, TouchableOpacity } from 'react-native';
import menu from './composants/menu.json';

export default function App() {
  let [dishes, setDishes] = useState(menu);
  let [screen, setScreen] = useState('main');
  let [currentDish, setCurrentDish] = useState();


  let selectedDishes = menu.filter(function (e) {
    return e.isSelected;
  });

  if (screen == 'cart') {
    return (<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', padding: 10, height: '100%', width: '100%', marginTop:40}}>
      <TouchableOpacity
        onPress={function () {
          setScreen('main');
        }}>
        <Text>  ← Menu </Text>
      </TouchableOpacity>
      <ScrollView style={styles.Stylemenu}>
        <Text style={styles.Selection}>Votre sélection</Text>
        {selectedDishes.length > 0 ? (selectedDishes.map(function (elmnt) {
          return (<Menus
            onOpen={function () {
              setCurrentDish(elmnt);
              setScreen('dish_details');
            }}
            isSelected={elmnt.isSelected}
            platNom={elmnt.platNom}
            platPrix={elmnt.platPrix}
            platImage={elmnt.platImage}
            onSelect={function () {
              let newSelection = menu.map(function (e) {
                if (elmnt.platNom == e.platNom) {
                  e.isSelected = !e.isSelected
                  return e
                }
                return e
              });
              setDishes(newSelection);
            }}
          /> )


        })
        ) : (
          <Text style={styles.selectionPlats}>Aucun plat sélectionné...</Text>
        )}
        
        {selectedDishes.length > 0 ?
          <TouchableOpacity style={styles.commande} onPress={function () {
            setScreen('commande');
          }}><Text>Commander</Text></TouchableOpacity> :null
        } 
      </ScrollView>
    </ScrollView>
    );
  }


  if (screen == 'commande') {
    return (
      <View style={styles.Stylemenu}>
        <Text style={styles.Selection}>Merci pour votre commande ! </Text>
        <Image
          style={styles.commandeImage}
          source={{ uri: "https://www.objetsdhier.com//photos/actualites/zooms/tampon-merci-de-votre-confiance-bloomini-studio_54_fr.jpg" }}>
        </Image>
        <Text style={styles.selectionPlats}>La commande arrivera dans les plus bref delais !</Text>
      </View>


    );


  }

  if (screen == 'dish_details') {
    return (
      <ScrollView style={styles.Stylemenu}>
        <TouchableOpacity
          onPress={function () {
            setScreen('main');
          }}>
          <Text>←Menu</Text>
        </TouchableOpacity>
        <Menus

          isSelected={currentDish.isSelected}
          platNom={currentDish.platNom}
          platPrix={currentDish.platPrix}
          platImage={currentDish.platImage}
          platDesc={currentDish.platDesc}
          platalergene={currentDish.platalergene}
          onSelect={function () {
            let newSelection = menu.map(function (e) {
              if (currentDish.platNom == e.platNom) {
                e.isSelected = !e.isSelected;
                return e;
              }
              return e;
            });
            setDishes(newSelection);
          }}
        />
      </ScrollView>
    );




  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBarMain}>
      <View style={styles.cartCard}>
      <TouchableOpacity
          onPress={function () {
            setScreen('cart');
          }}>        
      <Image
        style={styles.cartImage}
        source={{ uri: "https://thumbs.dreamstime.com/b/shopping-cart-icon-vector-logo-137282150.jpg" }}>
      </Image>
      </TouchableOpacity>
      <Text style={styles.text}>DeliveCROUS</Text>
    </View>
      </View>
      <View style={styles.Stylemenu}>
        <Text style={styles.Selection}>Notre Carte</Text>

        {menu.map(function (elmnt, index) {
          return (
            <Menus
              onOpen={function () {
                setCurrentDish(elmnt);
                setScreen('dish_details');
              }}
              isLast={index == menu.length - 1}
              isSelected={elmnt.isSelected}
              platNom={elmnt.platNom}
              platPrix={elmnt.platPrix}
              platImage={elmnt.platImage}
              platDesc={elmnt.platDesc}
              onSelect={function () {
                let newSelection = menu.map(function (e) {
                  if (elmnt.platNom == e.platNom) {
                    e.isSelected = !e.isSelected;
                    return e;
                  }
                  return e;
                });
                setDishes(newSelection);
              }}
            />
          )
        })}

      </View>
    </ScrollView>
  );
}

function Menus(props) {
  return (
    <View style={[styles.menuContainer, props.isLast ? { borderWidth: 0 } : {}]}>
      <TouchableOpacity onPress={props.onOpen}>

        <Image style={styles.menuImage} source={{ uri: props.platImage }}></Image>
      </TouchableOpacity>
      <View style={styles.menuInfo}>
        <Switch
          style={{ alignContent: 'flex-end' }}
          value={props.isSelected}
        onValueChange={props.onSelect}
        />
        <Text style={styles.menuNom}>{props.platNom}</Text>
        <Text style={styles.menuPrix}>{props.platPrix + "€"}</Text>
        <Text style={styles.menuDesc}>{props.platDesc}</Text>
        <Text style={styles.menuAlergene}> {props.platalergene}</Text>
      </View>
    </View>
  );
}

function Cart() {
  return (
    <View style={styles.cartCard}>
      <Image
        style={styles.cartImage}
        source={{ uri: "https://thumbs.dreamstime.com/b/shopping-cart-icon-vector-logo-137282150.jpg" }}>
      </Image>
      <Text style={styles.text}>DeliveCROUS</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dff1f1'
  },
  title: {
    backgroundColor: '#9cb1b5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    padding: 40,
    borderRadius: 2,
    borderWidth: 5,
    borderBottomWidth: 0,
    borderColor: "#55adad"
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#665555',
    paddingLeft: 50
  },
  Stylemenu: {
    marginTop: 40,
    borderWidth: 5,
    borderTopWidth: 3,
    borderColor: '#55adad'
  },
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#55adad"
  },
  menuImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200
  },
  selectionPlats: {
    paddingLeft: 5, 
    fontSize: 15,
    color: 'black',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#55adad'
  },
  Selection: {
    margin: 3,
    paddingLeft: '33%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#665555',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#55adad'
  },
  navBarMain: {
    backgroundColor: '#9cb1b5',
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  navTextMain: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#665555',
  },
  navBarCart: {
    padding: '5%',
    backgroundColor: '#9cb1b5',
    alignItems: 'baseline'
  },
  navTextCart: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#665555',
    paddingLeft: '1%'
  },
  cartImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  },
  cartCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  commande: {
    backgroundColor: '#55adad',
    alignItems: 'center'
  }, 
  commandeImage: {
    alignSelf: 'center',
    width: 400,
    height: 400,
  },
  commandemenu:{
justifyContent:'center',

  }
});