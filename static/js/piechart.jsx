"use-strict";

import PieChart from 'react-minimal-pie-chart';

const tone_color_dict = {
    "sadness": '#76A0A0',
    "fear": '#001514',
    "anger": '#CE0002',
    "joy": '#F6B621',
    "analytical": '#736F72',
    "confident": '#9A8F97',
    "tentative": '#C3BABA'
}


function Pie(props) {
    const heading = props.heading;
    const tones = props.data;
    console.log('tones', tones);
    const obj_list = [ ];
    const colors = ['#E38627','#C13C37','#6A2135']
    let index = 0;
    Object.keys(tones).forEach((tone) => {
        obj_list.push({
            title: tone,
            value: tones[tone].length,
            color: tone_color_dict[tone]
        })
        index += 1;
    });
    console.log('obj_list', obj_list);
    return (
        <div>
            <h1> {heading} </h1>
            <PieChart
              data={obj_list}
            />
        </div>
    )
}

export default Pie;
