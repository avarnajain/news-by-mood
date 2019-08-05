"use-strict";

import BubbleChart from '@weknow/react-bubble-chart-d3';
import {TONE_COLORS} from './constants.jsx'
import '../css/bubblechart.css';
function Bubble(props) {
    const window_width = window.innerWidth;
    // console.log('width', window_width);
    const tones = props.tone_data;
    // console.log('tones', tones);
    const obj_list = [];
    const data = tones.map(tone => {
      obj_list.push({
          label:tone.tone,
          value:tone.score,
          color:TONE_COLORS[tone.tone]
      })
    });
    // console.log('obj_list', obj_list);
    // console.log(obj_list[0].label)
    if (window_width > 560) {
      if (obj_list[0].label == 'no text' || obj_list[0].label == 'None') {
        return (
          <div className="col align-self-center" id="bubblechart-lg">
            <div className="big_screen" id="no_text">
              <p style={{height: 250}}>No Dominant Tones Found</p>
            </div>
          </div>
        )
      }
      return (
        <div className="col align-self-end" id="bubblechart-lg">
        <BubbleChart id='bubble-chart-jsx'
        graph= {{
          zoom: 0.4,
          offsetX: 0.05,
          offsetY: 0.01,
        }}
        width={600}
        height={200}
        padding={0} // optional value, number that set the padding between bubbles
        showLegend={false} // optional value, pass false to disable the legend.
        legendPercentage={20} // number that represent the % of with that legend going to use.
        legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold'
        }}
        showValue={false}
        valueFont={{
            family: 'Arial',
            size: 13,
            color: '#fff',
            weight: 'bold',
        }}
        labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
        }}
        data={obj_list}
      />
      </div>)
    } else if (window_width <= 560) {
      if (obj_list[0].label == 'no text' || obj_list[0].label == 'None') {
        return (
          <div className="col align-items-baseline" id="bubblechart-xs">
            <div className="small_screen" id="no_text">
              <p style={{height: 120}}>No Dominant Tones Found</p>
            </div>
          </div>
        )
      }
      return (
        <div className="col align-self-end" id="bubblechart-xs">
        <BubbleChart id='bubble-chart-jsx'
        graph= {{
          zoom: 0.4,
          offsetX: 0.02,
          offsetY: 0.01,
        }}
        width={300}
        height={150}
        padding={0} // optional value, number that set the padding between bubbles
        showLegend={false} // optional value, pass false to disable the legend.
        legendPercentage={20} // number that represent the % of with that legend going to use.
        valueFont={{
            family: 'Arial',
            size: 7,
            color: '#fff',
            weight: 'bold',
        }}
        labelFont={{
            family: 'Arial',
            size: 10,
            color: '#fff',
            weight: 'bold',
        }}
        data={obj_list}
      />
      </div>)
    }
}

export default Bubble;