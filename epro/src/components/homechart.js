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

const data = [
  {day: "Monday", number: 0},
  {day: "Tuesday", number: 10},
  {day: "Wednesday", number: 0},
  {day: "Thursday", number: 6},
  {day: "Friday", number: 10},
];

class HomeChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
    }


  this.createBarChart = this.createBarChart.bind(this);
  this.drawLine = this.drawLine.bind(this);
  }

  drawLine(startPoint, endPoint) {
      var path = d3.path.path();
      path.lineTo(startPoint, endPoint);
      return path;
  }

  createBarChart(x, y, w, h) {
      var path = d3.path.path();
      path.rect(x, y, w, h );
      return path;
  }

  // createAreaChart() {
  //   var area = d3.shape.area()
  //       .x(function(d) { return x(d.day); })
  //       .y0(height)
  //       .y1(function(d) { return y(d.number); })
  //       .curve(d3.shape.curveNatural)
  //       (data)
  //
  //   console.debug(`area: ${JSON.stringify(area)}`);
  //
  //   return { path : area };
  // }

  render () {
    const screen = Dimensions.get('window');
    const margin = {top: 75, right: 35, bottom: 400, left: 35}
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom

    const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.day))

    const maxVolume = max(data, d => d.number)

    const y = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxVolume])

    const firstDay = x(data[0].day)
    const secondDay = x(data[1].day)
    const lastDay = x(data[data.length - 1].day)
    const labelDx = (secondDay - firstDay) / 2

    const bottomAxis = [firstDay- labelDx, lastDay + labelDx]

    const bottomAxisD = d3.shape.line()
                            .x(d => d + labelDx)
                            .y(() => 0)
                            (bottomAxis)

    const leftAxis = ticks(0, maxVolume, 5)

    const leftAxisD = d3.shape.line()
                        .x(() => bottomAxis[0] + labelDx)
                        .y(d => y(d) - height)
                        (leftAxis)

    const notch = 5
    const labelDistance = 9
    const emptySpace = "";

    return (
      <Container style={styles.container}>
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
                                      font="10px helvetica"
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
                                  <Group x={5} y={y(d)-height} key={i + 1}>
                                      <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                      <Text
                                          fill={colors.black}
                                          x={-25}
                                          y={-labelDistance}
                                          font="10px helvetica"

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
                                      d={this.createBarChart(x(d.day), y(d.number) - height, x.bandwidth(), height - y(d.number))}
                                      fill={'#EF5B5B'}
                                      >
                                  </Shape>
                              </TouchableWithoutFeedback>
                          ))
                      }

                  </Group>
              </Group>

        </Surface>
      </Container>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFFFF',
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

export default HomeChart;
