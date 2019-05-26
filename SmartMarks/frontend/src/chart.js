import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart} from 'victory';


const Chart = (props) => {
    const {classes} = props;
    const data = props.tags.map(tag => ({
        tagName: tag.tagName,
        tagOccurance: tag.count,
    }));
    console.log(data);

    return (
        <VictoryChart
            domainPadding={10}
            >
            <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={data}
            />
        </VictoryChart>
    )
}

export default Chart;