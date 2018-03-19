import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Title, Right, Left, CheckBox, Button } from 'native-base';
import WorkoutButton from './workoutbutton';
import Icon from 'react-native-ionicons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const ExerciseDetail = (props) => {

  const tableHead = ['Sets', 'Reps', 'Weight', 'Time'];

    return (

          <Card style={styles.card}>

          <View
          hitSlop={{bottom: 40, left: 10, right: 10}}>
          <TouchableOpacity
          onPress = {props.onPress}
          style = {styles.trashIcon}
          >
            <Icon
              name="close"
              color={'#501F3A'}/>
          </TouchableOpacity>
          </View>
          {/* Exercise Label */}
          <View style={styles.cardBody}>
            <CardItem>
              <Text style={styles.subText}>{props.exerciseName}</Text>
            </CardItem>

            {/* Table Header */}
            <CardItem>
              <Table style={[styles.table,styles.borderStyle]} borderStyle={{borderWidth: 0, borderColor: 'black'}}>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
              </Table>
            </CardItem>

            {/* Row */}
            <CardItem>
              <Left>
              {/* Edit Icon
                 <Icon
                   name="create"
                   color={'#501F3A'}/>
                */}
              </Left>

              <Table style={styles.table} borderStyle={{borderWidth: 0, borderColor: 'black'}}>
                <TableWrapper style={{flexDirection: 'row', alignItems: 'center'}} >
                  <Rows data={props.data} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
              </Table>

              <Right>
                {/* Done Icon
                <CheckBox checked={true} style={{alignSelf: 'center'}}
                color={'#501F3A'}/>
                */}
              </Right>

            </CardItem>
              <WorkoutButton
              buttonName = "Done"
              />

            </View>
         </Card>

    );
  }


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEFFFF',
    color: '#17252A',
    fontSize: 17,
    fontFamily: 'DidactGothic-Regular',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    width: "98%",
    height:300,
  },
  titleText: {
    padding: 0,
    margin: 0,
  },
  subText: {
    fontSize: 18,
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  table: {
    width: '85%',
    backgroundColor: '#FEFFFF',
    borderWidth: 0,
    padding: 0,
    margin: 5,
    fontSize:17,
  },
  head: {
    height: 30,
    backgroundColor: '#DEF2F1',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  row: {
    height: 35,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  text: {
    textAlign: 'center',
    color: '#17252A'
  },
  iconContainer:{
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  trashIcon:{
    alignSelf: 'flex-end',
    paddingRight: 15,
    paddingTop: 25,
  },
  cardBody:{
    alignItems:'center',
    marginBottom: 55,
    marginTop: -30,
  },
  button:{
    paddingTop: -50,
    backgroundColor:'#FFBA49',
  }
});

export default ExerciseDetail;
