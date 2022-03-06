  import React, { useState } from 'react';
  import { Text, View, StyleSheet, Image, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native';

  let PLATS = [
    {
      imageUrl:
        'https://static.750g.com/images/1200-630/6b24c0e501965f26a1ffc6f88f90ef30/adobestock-243726230.jpeg',
      name: 'Hamburger',
      description: 'burger frites',
      alergene: 'pain',
      isSelected: false,
    },
    {
      imageUrl:
        'https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F13d543a6-cdf7-400e-9c5a-b274a8f22e5e.2Ejpeg/748x372/quality/80/crop-from/center/pizza-margherita.jpeg',
      name: 'Pizza margarita',
      description: 'bien cuite par notre chef',
      alergene: 'tomate',
      isSelected: false,
    },
    {
      imageUrl:
        'https://img.cuisineaz.com/610x610/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg',
      name: 'Spaghetti bolognese',
      description: 'la classico',
      alergene: 'sauce',
      isSelected: false,
    },
    {
      imageUrl:
        'https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg',
      name: 'Pâtes carbonara  ',
      description: 'genial !',
      alergene: 'sauce',
      isSelected: false,
    },
  ];




  export default function App() {

    let [search, setSearch] = useState(``);
    let [plat, setPlat] = useState(PLATS);
    let [currentScreen, setCurrentScreen] = useState('menu');
    let [currentDish, setCurrentDish] = useState();

    let selectedPlat = PLATS.filter(function (plat) {
      return plat.isSelected;
    });

    let filteredPlat = PLATS.filter(function (plat) {
      return plat.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });


    if (currentScreen == 'cart') {
      return (<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', padding: 10, height: '100%', width: '100%', overflow: 'auto' }}>
        <TouchableOpacity
          onPress={function () {
            setCurrentScreen('menu');
          }}>
          <Text>  ← Menu </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.cardText}>plat selectionné(s) :</Text>
          <View>
            {selectedPlat.length > 0 ? (
              selectedPlat.map(function (plat) {
                return <Card
                  onOpen={function () {
                    setCurrentDish(plat);
                    setCurrentScreen('dish_details');
                  }}
                  imageUrl={plat.imageUrl}
                  name={plat.name}
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
                />;
              })
            ) : (
              <Text style={[styles.cardText, { fontSize: 12, color: 'grey' }]}>
                Aucun plat selectionné
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      );
    } else if (currentScreen == 'dish_details') {
      return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', overflow: 'auto' }}>
          <TouchableOpacity
            onPress={function () {
              setCurrentScreen('menu');
            }}>
            <Text>←Menu</Text>
          </TouchableOpacity>
          <Card
          imageUrl={currentDish.imageUrl}
          name={currentDish.name}
          description={currentDish.description}
          isSelected={currentDish.isSelected}
          onSelect={function () {
            let newPlat = plat.map(function (c) {
              // Si c'est le champion concérné par le switch
              if (currentDish.name == c.name) {
                c.isSelected = !c.isSelected; // J'inverse son statut
                return c;
              }
              // Je retourne le champion tel qu'il est
              return c;
            });

            setPlat(newPlat);
          }}
        />
            <switch
              value={currentDish.isSelected}
              onValueChange={function () {
                let newplat = plat.map(function (c) {
                  if (currentDish.name == c.name) {
                    c.isSelected = !c.isSelected;
                    return c;
                  }
                  return c;
                });

                setPlat(newplat);
              }}
            />
          
        </ScrollView>
      );
    }


    return (

      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', padding: 10, height: '100%', overflow: 'auto' }}>
        <View style={styles.Border}>
          <Text>DelivCrous</Text>

          <TouchableOpacity
            onPress={function () {
              setCurrentScreen('cart')
            }}
          ><Text>{selectedPlat.length}</Text>
            <Image source={{ uri: 'https://img2.freepng.fr/20180515/zfw/kisspng-shopping-cart-logo-shopping-bags-trolleys-5afb65b09c72d4.3564791415264250086408.jpg', }} style={{ height: 30, width: 30, }} />
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
                  onOpen={function () {
                    setCurrentDish(plat);
                    setCurrentScreen('dish_details');
                  }}
                  imageUrl={plat.imageUrl}
                  name={plat.name}
                  description={plat.description}
                  alergene={plat.alergene}
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
        <TouchableOpacity onPress={props.onOpen} style={styles.cardImage}>

          <Image
            style={styles.cardImage}
            source={{
              uri: props.imageUrl,
            }}
          />
        </TouchableOpacity>
        <View style={styles.carddescription}>
          <Text style={[styles.cardText, { fontSize: 20, fontWeight: 'bold' }]}>
            {props.name}
          </Text>
          <Text style={styles.cardText}>{props.description}</Text>
          <Text >{props.alergene}</Text>
        </View>
        <Switch
          style={{ alignSelf: 'center' }}
          value={props.isSelected}
          onValueChange={props.onSelect}
        />

      </View>

    );
  }









  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 8,
      margin: 0,
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
      width: '100px',
      height: '200px',
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
    carddescription: {
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
    Border: {
      flex: 0.05,
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      margin: 0,
      backgroundColor: 'red',
      width: '100%',
    },
    ImagePanier: {
      flex: 1,
      width: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    dishdetail:{
  width: '100%'
    }
  });