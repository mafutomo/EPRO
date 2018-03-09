import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Title, Icon, Right, Left, CheckBox, Button, View } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
export default class HistoryTable extends Component {
  render() {
    const tableHead = ['Exercise Description'];
    const tableTitle = ['Date', 'Sets', 'Reps', 'Weight', 'Time'];
    const tableData = [
      ['1/1', '3', '1', '6lbs', '10s'],
      ['1/2', '3', '1', '8lbs', '10s'],
    ];
    return (
        <Content>
          <Card style={styles.card}>
            <CardItem header>
                <Text>Exercise</Text>
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
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    height: 40,
    backgroundColor: '#DEF2F1',
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
