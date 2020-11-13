import React, { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import Typography from "@material-ui/core/Typography";

export default function TypeInfo(props) {
    const COLOR_SCALE = ["#85C4C8", "#C22E00", "#1E96BE", "#EC9370", "#F6D18A"];

    const radialRadius = 150;
    const [hoveredRadial, setHoveredRadial] = useState(false);

    // method to create data for radial chart
    const careateData = () => {
        // array for data
        let data = [];
        // check type info: if string, parse, else object
        let info = props.typeInfo;
        // get the type data
        info.forEach((attr, index) => {
            data.push({
                angle: attr.proportion,
                label: JSON.stringify(attr.use),
                color: COLOR_SCALE[index],
            });
        });

        return data;
    };

    const data = careateData();

    return (
        <RadialChart
            colorType="literal"
            animation={true}
            className={"donut-chart-example"}
            innerRadius={radialRadius / 2 - radialRadius / 5}
            radius={radialRadius / 2}
            getLabel={(d) => d.label}
            labelsRadiusMultiplier={1}
            labelsStyle={{
                textAnchor: "middle",

                fontSize: 10,
                fill: "#FFF",
                textShadow: "2px 2px 2px #000",
            }}
            showLabels
            getAngle={(d) => d.angle}
            data={data}
            onValueMouseOver={(evt) => {
                setHoveredRadial(evt);
            }}
            onSeriesMouseOut={() => setHoveredRadial(false)}
            width={radialRadius}
            height={radialRadius}
            padAngle={0.1}
        >
            {hoveredRadial !== false && (
                <Hint value={hoveredRadial}>
                    <div
                        style={{
                            background: "rgba(0,0,0,0.8)",
                            fontSize: 14,
                        }}
                    >
                        <Typography variant={"caption"} gutterBottom>
                            {hoveredRadial.label}
                        </Typography>
                    </div>
                </Hint>
            )}
        </RadialChart>
    );
}
