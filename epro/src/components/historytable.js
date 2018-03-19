import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Title, Icon, Right, Left, CheckBox, Button, View } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
export default class HistoryTable extends Component {
  render() {
    const tableHead = ['Romanian Deadlift'];
    const tableTitle = ['Date', 'Sets', 'Reps', 'Weight', 'Time'];
    const tableData = [
      ['3/18', '3', '10', '150 lbs', '00:00'],
      ['3/19', '3', '8', '160 lbs', '00:00'],
      ['3/20', '3', '10', '165 lbs', '00:00'],
    ];
    const tableHead2 = ['One Arm Hangs w/ Assistance'];
    const tableData2 = [
      ['3/05', '1', '3', '25 lbs', '00:10'],
      ['3/12', '1', '3', '20 lbs', '00:10'],
      ['3/19', '1', '3', '10 lbs', '00:10'],
    ];
    return (
        <Content>
          <Card style={styles.card}>
            <CardItem header>
                <Text>Deadlift</Text>
            </CardItem>
            <CardItem>
              <Table style={styles.table} borderStyle={{borderWidth: 0, borderColor: 'black'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Row data={tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.subText}/>
                <TableWrapper style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Rows data={tableData} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
              </Table>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem header>
                <Text>One Arm Hangs</Text>
            </CardItem>
            <CardItem>
              <Table style={styles.table} borderStyle={{borderWidth: 0, borderColor: 'black'}}>
                <Row data={tableHead2} style={styles.head} textStyle={styles.text}/>
                <Row data={tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.subText}/>
                <TableWrapper style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Rows data={tableData2} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
              </Table>
            </CardItem>
          </Card>
        </Content>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEFFFF',
    width: '95%',
    padding: 5,
    color: '#17252A',
    fontSize: 18,
    fontFamily: 'DidactGothic-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    // position: 'relative',
  },
  date: {
    fontSize: 16,
    marginTop: 10,
    color: '#17252A',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    height: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    height: 40,
    backgroundColor: '#DEF2F1',
    fontSize: 23,
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa'
  },
  row: {
    height: 35,
    backgroundColor: '#FEFFFF'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'DidactGothic-Regular',
    color: '#17252A'
  },
  subText: {
    textAlign: 'center',
    fontFamily: 'DidactGothic-Regular',
    color: '#17252A',
    fontWeight: '600',
  }
})
