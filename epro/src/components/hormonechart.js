import React, { Component } from 'react';
import { StyleSheet, View, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Spinner from './spinner';
import LoginProgress from './loginprogress';

const {
  Surface,
  Group,
  Rectangle,
  ClippingRectangle,
  LinearGradient,
  Shape,
  Text,
  Path,
  Transform
} = ART;

import {
  max,
  ticks
} from 'd3-array';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as path from 'd3-path';

const d3 = {
    scale,
    shape,
    format,
    axis,
    path,
};

import {
    scaleLinear,
    scaleBand,
    scaleTime
}  from 'd3-scale';

const colors = {
    black: 'black',
    estrogen: '#501F3A',
    progesterone: '#CB2D6F'
}

class HormoneChart extends Component {

  constructor(props) {
     super(props)
     this.state = {
       isLoading: true,
       data: [],
       contraceptive: "non_hormonal",
       cycleLength: 28,
       firstDayLastPeriod: "",
       userId: this.props.userId
     }
     this.createBarChart = this.createBarChart.bind(this);
     this.drawLine = this.drawLine.bind(this);
   };

   //get the user info
   async componentDidMount() {
       const response = await fetch(`https://epro-fitness-api.herokuapp.com/users/${this.state.userId}`, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     })
     const json = await response.json()
     const user = json[0]
     this.setState({
       contraceptive: user.birth_control_type,
       cycleLength: user.cycle_length,
       firstDayLastPeriod: user.last_day
     })

     const hormoneResponse = await fetch(`https://epro-fitness-api.herokuapp.com/hormones/${user.birth_control_type}`, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     })
     const rawHormoneData = await hormoneResponse.json()
     let individualData = this.prepDataForChart(rawHormoneData, user);
     this.setState({
       isLoading: false,
       data: individualData
     })
   }

   prepDataForChart(rawData, user){
     var intData = rawData.map(ele => {
       return{
         "day": ele.day,
         "estrogen":  ele.estrogen,
         "progesterone": (ele.progesterone/10)
       }
     })
       if (user.birth_control_type === 'monophasic' || user.birth_control_type === 'monophasic'){
       return intData;
     } else if (user.birth_control_type === 'progestin'){
       let newData = [];
        for(let i = 1; i < user.cycle_length +1; i++){
          newData.push({
            "day": i,
            "estrogen": 50,
            "progesterone": 2
          })
        }
      return newData;
    }else{
      if (user.cycle_length === 28) {
        var intData = rawData.map(ele => {
          return {
            "day": ele.day,
            "estrogen": ele.estrogen,
            "progesterone": (ele.progesterone/10)
          }
        })
        intData.pop();
        return intData;
      } else if (user.cycle_length > 28) {
        let dupArr = [26, 25, 23, 22, 21, 19, 15, 11];
        let loop = user.cycle_length - 28;
        for (let i = 1; i < loop; i++){
          let dupObj = rawData[dupArr[i]];
          let copyObj = {
            "day": dupObj.day,
            "estrogen": dupObj.estrogen,
            "progesterone": dupObj.progesterone/10
          }
          intData.splice(dupArr[i], 0, copyObj);
        }
        for (let i = 0; i < intData.length; i++){
          intData[i].day = i + 1;
        }
        return intData;
      } else {
        let delArr = [27, 15, 8, 3, 21, 1, 6];
        let loop = 28 - user.cycle_length;
        for (let i = 0; i <= loop; i++) {
          intData.splice(delArr[i], 1)
        }
        for (let i = 0; i < intData.length; i++){
          intData[i].day = i + 1;
        }
        return intData;
      }
    }
   }

      drawLine(startPoint, endPoint) {
          var path = d3.path.path();
          path.lineTo(startPoint, endPoint);
          return path;
      }

      createBarChart(x, y, w, h) {
          var path = d3.path.path();
          path.rect(x, y, w, h);
          return path;
      }


  render() {
    if (this.state.isLoading === true) {
            return (
                <Spinner  />
            );
        }
    const data = this.state.data;
    const screen = Dimensions.get('window');
    const margin = {top: 50, right: 35, bottom: 350, left: 35}
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom

    const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0)
            .domain(data.map(d => d.day))

    const maxEstrogen = max(data, d => d.estrogen)
    const maxProgesterone = max(data, d => d.progesterone)

    const y0 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxEstrogen])

    const y1 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxProgesterone-1])

    const firstDay = x(data[0].day)
    const secondDay = x(data[1].day)
    const cycleLength = x(data[data.length - 1].day)
    const labelDx = (secondDay - firstDay) / 2

    const bottomAxis = [firstDay- labelDx, cycleLength + labelDx]

    const bottomAxisD = d3.shape.line()
                            .x(d => d + labelDx)
                            .y(() => 0)
                            (bottomAxis)

    const leftAxis = ticks(0, maxEstrogen, 5)

    const leftAxisD = d3.shape.line()
                        .x(() => bottomAxis[0] + labelDx)
                        .y(d => y0(d) - height)
                        (leftAxis)

    const rightAxis = ticks(0, maxProgesterone, 6)

    const rightAxisD = d3.shape.line()
                        .x(() => bottomAxis[1] + labelDx)
                        .y(d => y1(d) - height)
                        (rightAxis)

    const notch = 5
    const labelDistance = 9
    const labelDistanceR = 11
    const emptySpace = "";
    const hormones = ["estrogen", "progesterone"]

    return (
        <View style={styles.chartView}>
        <Surface style={styles.container} width={screen.width} height={screen.height}>
          <Group style={styles.legend}>
            <Shape d={new Transform().rotate(-90[50,50])}/>
              <Text
                fill={colors.black}
                x={50}
                y={50}
                font="12px helvetica" >
              </Text>
          </Group>
          <Group x={margin.left} y={margin.top}>
                    <Group x={0} y={height}>
                        <Group key={-1}>
                            <Shape d={bottomAxisD} stroke={colors.black} key="-1"/>
                              {
                                data.map((d, i) =>(
                                  <Group
                                      x={x(d.day) + labelDx}
                                      y={0}
                                      key={i + 1}
                                  >
                                      <Shape d={this.drawLine(0, notch)} y2={notch} stroke={colors.black}/>
                                      <Text
                                        y={labelDistance}
                                        fill={colors.black}
                                        font="18px helvetica"
                                      >
                                        {d.day}
                                      </Text>
                                  </Group>
                                ))
                              }
                        </Group>
                        <Group key={-2} >
                            <Shape stroke={colors.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <Group x={-1} y={y0(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={-5}
                                            y={-labelDistance}
                                            font="12px helvetica"
                                            alignment="right"

                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        <Group key={-3} >
                            <Shape stroke={colors.black} d={rightAxisD} key="-1"/>
                            {
                                rightAxis.map((d, i) => (
                                    <Group x={width-3} y={y1(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={10}
                                            y={-labelDistance}
                                            font="12px helvetica"
                                            alignment="left"
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        {
                            data.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.day), y0(d.estrogen) - height, x.bandwidth()/2, height - y0(d.estrogen))}
                                        fill={colors.estrogen}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                        {
                            data.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.day) + x.bandwidth()/2, y1(d.progesterone) - height, x.bandwidth()/2, height - y1(d.progesterone))}
                                        fill={colors.progesterone}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </Group>
                </Group>

          </Surface>
          {/* <View style={styles.legend}>
            <Text>Hello</Text>
          </View> */}
        </View>
      )
  }
};

const styles = StyleSheet.create({
  chartView:{
    marginBottom:-350,
  },
  container: {
    // margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  },
  textStyle: {
    transform: [{ rotate: '90deg'}],
  },
  legend: {
    backgroundColor: 'pink',
    position: 'absolute',
    height: 50,
    width: 50
  }
});


export default HormoneChart;
