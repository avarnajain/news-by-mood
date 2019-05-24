"use-strict";

import BubbleChart from '@weknow/react-bubble-chart-d3';

function Bubble(props) {
    const tones = props.tone_data;
    console.log('tones', tones);
    const obj_list = [];
    const data = tones.map(tone => {
        obj_list.push({
            label:tone.tone,
            value:tone.score,
        })
    });
    console.log('obj_list', obj_list);
    return (<BubbleChart
      graph= {{
        zoom: 0.8,
        offsetX: 0.05,
        offsetY: 0.01,
      }}
      width={600}
      height={400}
      padding={0} // optional value, number that set the padding between bubbles
      showLegend={true} // optional value, pass false to disable the legend.
      legendPercentage={20} // number that represent the % of with that legend going to use.
      legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
      valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
      labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
          }}
      //Custom bubble/legend click functions such as searching using the label, redirecting to other page
      data={obj_list}
    />)
}

export default Bubble;