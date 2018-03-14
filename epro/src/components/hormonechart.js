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
    progesterone: '#FFBA49'
}

class HormoneChart extends Component {
  constructor(props) {
     super(props)
     this.state = {
       isLoading: true,
       data: [],
       userId: null,
       contraceptive: "non_hormonal",
       cycleLength: 28,
       userId: this.props.userId
     }
     this.createBarChart = this.createBarChart.bind(this);
     this.drawLine = this.drawLine.bind(this);
   };

   //get the user info
   async componentDidMount() {
     const response = await fetch(`https://epro-fitness-api.herokuapp.com/users/1`, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     })
     const json = await response.json()
     console.log("this is the user info: ", json);
     console.log("this is the cycleLength", json[0].cycle_length);
     this.setState({
       contraceptive: json[0].birth_control_type,
       cycleLength: json[0].cycle_length,
     })
   }

   async componentDidMount() {
    const response = await fetch(`https://epro-fitness-api.herokuapp.com/hormones/${this.state.contraceptive}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    console.log("this is the hormone data", json);
    this.setState({
      data: json,
      isLoading: false,
    })
  }

      drawLine(startPoint, endPoint) {
          var path = d3.path.path();
          path.lineTo(startPoint, endPoint);
          return path;
      }

      createBarChart(x, y0, y1, w, h) {
          var path = d3.path.path();
          path.rect(x, y0, y1, w, h);
          return path;
      }


  render() {
    if (this.state.isLoading === true) {
            return (
                <Spinner  />
            );
        }
    const data = this.state.data;
    const progesterone = data.map(el => el.progesterone/10);
    console.log("the state ==" ,this.state.data);
    console.log('prog =', progesterone);
    const screen = Dimensions.get('window');
    const margin = {top: 50, right: 35, bottom: 350, left: 35}
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom

    const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0)
            .domain(data.map(d => d.day))

    const maxEstrogen = max(data, d => d.estrogen)
    const maxProgesterone = max(progesterone, d => d)

    const y0 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxEstrogen])

    const y1 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxProgesterone])

    const firstDay = x(data[0].day)
    const secondDay = x(data[1].day)
    const cycleLength = x(data[data.length - 1].day)
    const labelDx = (secondDay - firstDay) / 2

    const bottomAxis = [firstDay- labelDx, cycleLength + labelDx]

    const bottomAxisD = d3.shape.line()
                            .x(d => d + labelDx)
                            .y(() => 0)
                            (bottomAxis)

    const leftAxis = ticks(0, maxEstrogen+25, 5)

    const leftAxisD = d3.shape.line()
                        .x(() => bottomAxis[0] + labelDx)
                        .y(d => y0(d) - height)
                        (leftAxis)

    const rightAxis = ticks(0, maxProgesterone, 5)

    const rightAxisD = d3.shape.line()
                        .x(() => bottomAxis[1] + labelDx)
                        .y(d => y1(d) - height)
                        (rightAxis)

    const notch = 5
    const labelDistance = 9
    const labelDistanceR = 11
    const emptySpace = "";
    const leftAxisTitle = new Transform().rotate(-90);

    return (
        <View>
        <Surface style={styles.container} width={screen.width} height={screen.height}>
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
                                    <Group x={5} y={y0(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={-25}
                                            y={-labelDistance}
                                            font="12px helvetica"
                                            // style={styles.yAxisText}
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        <Group key={-3} >
                          <Text
                              style={styles.textStyle}
                              x={0}
                              y={-height/2}
                              font = {{
                                 fontFamily:'Helvetica, Neue Helvetica, Arial',
                                 fontSize:13,
                                 fontWeight:"normal", // or "normal"
                                 fontStyle:"normal" // or "normal"
                               }}
                               rotate={"45"}
                               textAnchor={"middle"}
                               fill = "#000000"
                              // alignment = { leftAxisTitle }
                            >
                              Hello World
                            </Text>
                            <Shape stroke={colors.black} d={rightAxisD} key="-1"/>
                            {
                                rightAxis.map((d, i) => (
                                    <Group x={width-10} y={y1(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={15}
                                            y={-labelDistanceR}
                                            font="12px helvetica"
                                            alignment="center"
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
                                        d={this.createBarChart(x(d.day) + x.bandwidth()/2, y1(d.progesterone/10) - height, x.bandwidth()/2, height - y1(d.progesterone/10))}
                                        fill={colors.progesterone}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </Group>
                </Group>

          </Surface>
        </View>
      )
  }
};

const styles = StyleSheet.create({
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
    transform: [{ rotate: '-90deg' }]
  }
});


export default HormoneChart;
