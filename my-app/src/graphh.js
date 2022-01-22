import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import "./graphh.css";
import { format } from "d3-format";
import { OHLCTooltip, SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { FormControl } from "react-bootstrap";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { utcHour } from "d3-time";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { InteractiveYCoordinate } from "react-stockcharts/lib/interactive";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { withRouter } from "react-router-dom";
import { timeFormat } from "d3-time-format";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import Select from 'react-select'
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
	Label,
	Annotate,
	SvgPathAnnotation,
	buyPath,
	sellPath,
} from "react-stockcharts/lib/annotation";

function Graphh(props) {
	const [display1, setDisplay1] = useState();
	const [display2, setDisplay2] = useState();
	const [display3, setDisplay3] = useState();
	const [display4, setDisplay4] = useState();
	const [display5, setDisplay5] = useState();
	const [display6, setDisplay6] = useState();
	const [display7, setDisplay7] = useState();
	const [display8, setDisplay8] = useState();
	const [display9, setDisplay9] = useState();
	const [display10, setDisplay10] = useState();
	const [display11, setDisplay11] = useState();
	const [display12, setDisplay12] = useState();
	const [display13, setDisplay13] = useState();
	const [display14, setDisplay14] = useState();
	const [display15, setDisplay15] = useState();
	const [display16, setDisplay16] = useState();
	const [display17, setDisplay17] = useState();
	const [display18, setDisplay18] = useState();
	const [data, setData] = useState([]);
	const [width, setWidth] = useState();
	const [hight, setHight] = useState();
	const [loading, setLoding] = useState(false);
	const [price, setPrice] = useState(0);

	const [selectedOption, setSelectedOption] = useState(null);
	const [selected, setSelected] = useState([])
	const options = [
		{ value: 'Aroonu', label: 'Aroonu' },
		{ value: 'Aroond', label: 'Aroond' },
		{ value: 'rsiK', label: 'rsiK' },
		{ value: 'Ci', label: 'Ci' },
		{ value: 'Ambb5', label: 'Ambb5' }
	  ]

	useEffect(() =>{
		
		if(!selectedOption) return
		selectedOption.map(sel=> {
			selected.push(sel.value)
		})
		console.log(selected ,'selected');
		
		console.log(selectedOption, 'selecte')
	}, [selectedOption]);
	useEffect(() => {
		loopData(props.data.data.hcl);
	}, [props.data]);
	const macdAppearance = {
		stroke: {
			BUY2: "#FF0000",
		},
		fill: {
			divergence: "#4682B4",
		},
	};

	const loopData = (hcl) => {
		var array = [];
		var OpenLen = hcl.Open.length;
		//props.data.data.
		for (var i = 0; i < OpenLen; i++) {
			array.push({
				date: new Date(hcl.opentime[i]),
				open: hcl.Open[i],
				high: hcl.High[i],
				low: hcl.Low[i],
				close: hcl.Close[i],
				volume: hcl.Volume[i],
				buy2: props.data.data.ai.bigmome.BUY2[i],
				ambi: props.data.data.ai.bigmome.ambi[i],
				amb0: props.data.data.ai.sell.amb0[i],
				amb1: props.data.data.ai.sell.amb1[i],
				amb2: props.data.data.ai.sell.amb2[i],
				amb3: props.data.data.ai.sell.amb3[i],
				amb99: props.data.data.ai.sell.amb99[i],
				amb13: props.data.data.ai.mome.amb13[i],
				amb14: props.data.data.ai.mome.amb14[i],
				amb15: props.data.data.ai.mome.amb15[i],
				amb55: props.data.data.ai.mome.amb55[i],
				ci: props.data.data.ai.smallmome.ci[i],
				rsik: props.data.data.formula.rsiK[i],
				aroonu: props.data.data.formula.aroonu[i],
				aroond: props.data.data.formula.aroond[i],
				macd: props.data.data.formula.macd[i],
				histogram: props.data.data.formula.histogram[i],
				ambb5: props.data.data.ai.buy.ambb5[i],
				BUYSELL: props.data.data.ai.other.BUYSELL[i],
			});
		}
		setData(array);
		setWidth(window.innerWidth);
		setLoding(true);
		setPrice(props.data.data.hcl.Close[0]);
	};

	const longAnnotationProps = {
		y: ({ yScale, datum }) => yScale(datum.low),
		fill: "#006517",
		path: buyPath,
		tooltip: "Go long",
	};
	const shortAnnotationProps = {
		y: ({ yScale, datum }) => yScale(datum.high),
		fill: "#FF0000",
		path: sellPath,
		tooltip: "Go short",
	};
	const margin = { left: 70, right: 70, top: 20, bottom: 30 };

	const height = 400;
	const gridHeight = height - margin.top - margin.bottom;
	const gridWidth = width - margin.left - margin.right;
	const showGrid = true;
	const yGrid = showGrid
		? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
		: {};
	const xGrid = showGrid
		? {
				innerTickSize: -3 * gridHeight,
				tickStrokeDasharray: "Solid",
				tickStrokeOpacity: 0.2,
				tickStrokeWidth: 1.2,
		  }
		: {};

	window.addEventListener("resize", function () {
		setWidth(window.innerWidth);
		setHight(window.innerHeight);
	});

	// console.log(new Date(props.data.data.hcl.opentime[0]))

	const xAccessor = (d) => {
		if (d != null) {
			return d.date;
		}
	};

	const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 150])];
	const valuee = (e) => {
		console.log(e.target.value);
	};

	const aroonuChart = () => {
		return(

			<>
			<LineSeries
								yAccessor={(d) => d.aroonu / 100}
								stroke={"#283747"}
								style={display17 ? { display: "none" } : { display: "" }}
							/>
							<SingleValueTooltip
								onClick={() => setDisplay17(!display17)}
								yAccessor={(d) => d.aroonu / 100}
								yLabel={`Aroonu`}
								valueFill="#283747"
								yDisplayFormat={format(".2f")}
								/* valueStroke={atr14.stroke()} - optional prop */
								/* labelStroke="#4682B4" - optional prop */
								origin={[-40, 3]}
							/>
							
						<CurrentCoordinate
							yAccessor={(d) => d.aroonu / 100}
							fill={!display17 ? "#283747" : "#FFFFFF"}
						/>
			</>
		)
	}

	const aroondChart = () => {
		return (
			<>
			<LineSeries
								yAccessor={(d) => d.aroond / 100}
								stroke={"#FF4136"}
								style={display18 ? { display: "none" } : { display: "" }}
							/>
							<SingleValueTooltip
								yAccessor={(d) => d.aroond / 100}
								valueFill="#FF4136"
								yLabel={`Aroond`}
								onClick={() => setDisplay18(!display18)}
								yDisplayFormat={format(".2f")}
								/* valueStroke={atr14.stroke()} - optional prop */
								/* labelStroke="#4682B4" - optional prop */
								origin={[30, 3]}
							/>
							<CurrentCoordinate
								yAccessor={(d) => d.aroond / 100}
								fill={!display18 ? "#FF4136" : "#FFFFFF"}
							/>
			</>
		)
	}

	const rsikChart = () => {
		return(
			<>
			<LineSeries
				yAccessor={(d) => d.rsik / 100}
				stroke={"#FF4136"}
				style={display16 ? { display: "none" } : { display: "" }}
			/>

			<SingleValueTooltip
				yAccessor={(d) => d.rsik / 100}
				valueFill="#FF4136"
				yLabel={`rsiK`}
				onClick={() => setDisplay16(!display16)}
				yDisplayFormat={format(".2f")}
				/* valueStroke={atr14.stroke()} - optional prop */
				/* labelStroke="#4682B4" - optional prop */
				origin={[75, 3]}
			/>
			<CurrentCoordinate
				yAccessor={(d) => d.rsik / 100}
				fill={!display16 ? "#FF4136" : "#FFFFFF"}
			/>
			</>
		)
	}

	const ambb5Chart = () => {
		return (
			<>
			<LineSeries
				yAccessor={(d) => d.ambb5}
				stroke={"#283747"}
				style={display14 ? { display: "none" } : { display: "" }}
			/>
			<SingleValueTooltip
				onClick={() => setDisplay14(!display14)}
				yAccessor={(d) => d.ambb5}
				yLabel={`ambb5`}
				valueFill="#283747"
				yDisplayFormat={format(".2f")}
				/* valueStroke={atr14.stroke()} - optional prop */
				/* labelStroke="#4682B4" - optional prop */
				origin={[-40, 3]}
			/>
			<CurrentCoordinate
				yAccessor={(d) => d.ambb5}
				fill={!display14 ? "#283747" : "#FFFFFF"}
			/>
			</>
		)
	}
	const ciChart = () => {
		return(
			<>
				<LineSeries
					yAccessor={(d) => d.ci}
					stroke={"#657a00"}
					style={display15 ? { display: "none" } : { display: "" }}
				/>
				
				<SingleValueTooltip
					onClick={() => setDisplay15(!display15)}
					yAccessor={(d) => d.ci}
					yLabel={`ci`}
					valueFill="#657a00"
					yDisplayFormat={format(".2f")}
					/* valueStroke={atr14.stroke()} - optional prop */
					/* labelStroke="#4682B4" - optional prop */
					origin={[30, 3]}
				/>
				<CurrentCoordinate
					yAccessor={(d) => d.ci}
					fill={!display15 ? "#657a00" : "#FFFFFF"}
				/>
			</>
		)
	}
	const ambiChart = () => {

		return(
			<>

			<LineSeries
			yAccessor={(d) => d.ambi}
			stroke={"#657a00"}
			style={display2 ? { display: "none" } : { display: "" }}
		/>
		<SingleValueTooltip
								onClick={() => setDisplay2(!display2)}
								yAccessor={(d) => d.ambi}
								yLabel={`ambi`}
								yDisplayFormat={format(".2f")}
								valueFill="#657a00"
								origin={[30, 3]}
							/>
			</>
		)
	}
	
	return (
		<>
		<div className="raper">
			

			{loading && data !== null ? (
				<ChartCanvas
					className="aa"
					height={945}
					margin={{ left: 80, right: 100, top: 10, bottom: 30 }}
					width={width}
					onChange={"resize"}
					type={"svg"}
					seriesName="MSFT"
					data={data}
					xAccessor={(d) => d.date}
					xScale={scaleTime(Date.now())}
					xExtents={xExtents}
				>
					<Chart
						height={150}
						id={0}
						yExtents={(d) => [d.high, d.low]}
						padding={{ top: 10, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={7} {...yGrid} />
						<Annotate
							with={SvgPathAnnotation}
							when={(d) => d.BUYSELL === 1}
							usingProps={longAnnotationProps}
						/>
						<Annotate
							with={SvgPathAnnotation}
							when={(d) => d.BUYSELL === 2}
							usingProps={shortAnnotationProps}
						/>
						<XAxis
							showGrid={true}
							axisAt="bottom"
							orient="bottom"
							opacity={2}
							showTicks={false}
						/>

						<CandlestickSeries width={timeIntervalBarWidth(utcHour.every(4))} />
						<OHLCTooltip origin={[-40, 8]} />
						{price > 1000 || price < 0.01 ? (
							<EdgeIndicator
								itemType="last"
								orient="right"
								edgeAt="right"
								yAccessor={(d) => d.close}
								fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
								displayFormat={format(".4s")}
							/>
						) : (
							<EdgeIndicator
								itemType="last"
								orient="right"
								edgeAt="right"
								yAccessor={(d) => d.close}
								fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
								displayFormat={format(".3f")}
							/>
						)}
						{price > 1000 || price < 0.01 ? (
							<MouseCoordinateY
								at="right"
								orient="right"
								displayFormat={format(".4s")}
							/>
						) : (
							<MouseCoordinateY
								at="right"
								orient="right"
								displayFormat={format(".3f")}
							/>
						)}
					</Chart>

					<Chart
						id={1}
						yExtents={(d) => d.buy2}
						height={75}
						origin={(w, h) => [0, h - 740]}
						padding={{ top: 10, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={3} {...yGrid} />

						<LineSeries
							yAccessor={(d) => d.buy2}
							stroke={"#283747"}
							style={display1 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.ambi}
							stroke={"#657a00"}
							style={display2 ? { display: "none" } : { display: "" }}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.buy2}
							fill={!display1 ? "#283747" : "#FFFFFF"}
						/>

						<SingleValueTooltip
							onClick={() => setDisplay1(!display1)}
							yAccessor={(d) => d.buy2}
							yLabel={`BUY2`}
							yDisplayFormat={format(".2f")}
							valueFill="#283747"
							origin={[-40, 3]}
						/>
						{/* {ambiChart()} */}
						<SingleValueTooltip
							onClick={() => setDisplay2(!display2)}
							yAccessor={(d) => d.ambi}
							yLabel={`ambi`}
							yDisplayFormat={format(".2f")}
							valueFill="#657a00"
							origin={[30, 3]}
						/>
						<XAxis
							axisAt="bottom"
							orient="bottom"
							showTicks={false}
							opacity={2}
						/>
						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					<Chart
						id={2}
						yExtents={(d) => d.amb99}
						height={90}
						origin={(w, h) => [0, h - 650]}
						padding={{ top: 15, bottom: 15 }}
					>
						<YAxis axisAt="right" orient="right" ticks={3} {...yGrid} />

						<LineSeries
							yAccessor={(d) => d.amb0}
							stroke={"#283747"}
							style={display3 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb1}
							stroke={"#657a00"}
							style={display4 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb2}
							stroke={"#FF4136"}
							style={display5 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb3}
							stroke={"#7FDBFF"}
							style={display6 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb99}
							stroke={"#B10DC9"}
							style={display7 ? { display: "none" } : { display: "" }}
						/>
						<SingleValueTooltip
							yAccessor={(d) => d.amb0}
							onClick={() => setDisplay3(!display3)}
							yLabel={`amb0`}
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							valueFill="#283747"
							origin={[-40, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay4(!display4)}
							yAccessor={(d) => d.amb1}
							yLabel={`amb1`}
							// yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4684" - optional prop */
							valueFill="#657a00"
							origin={[30, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay5(!display5)}
							yAccessor={(d) => d.amb2}
							yLabel={`amb2`}
							yDisplayFormat={format(".2f")}
							valueFill="#FF4136"
							origin={[100, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay6(!display6)}
							yAccessor={(d) => d.amb3}
							yLabel={`amb3`}
							valueFill="#7FDBFF"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[170, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay7(!display7)}
							yAccessor={(d) => d.amb99}
							yLabel={`amb99`}
							valueFill="#B10DC9"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[240, 3]}
						/>
						<XAxis
							axisAt="bottom"
							orient="bottom"
							showTicks={false}
							opacity={2}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.amb2}
							fill={!display5 ? "#FF4136" : "#FFFFFF"}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.amb99}
							fill={!display7 ? "#B10DC9" : "#FFFFFF"}
						/>

						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					<Chart
						id={3}
						yExtents={(d) => d.amb13}
						height={90}
						origin={(w, h) => [0, h - 545]}
						padding={{ top: 13, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={3} {...yGrid} />

						<LineSeries
							yAccessor={(d) => d.amb13}
							stroke={"#283747"}
							style={display8 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb14}
							stroke={"#657a00"}
							style={display9 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb15}
							stroke={"#FF4136"}
							style={display10 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.amb55}
							stroke={"#7FDBFF"}
							style={display11 ? { display: "none" } : { display: "" }}
						/>

						<SingleValueTooltip
							onClick={() => setDisplay8(!display8)}
							yAccessor={(d) => d.amb13}
							yLabel={`amb13`}
							yDisplayFormat={format(".2f")}
							valueFill="#283747"
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[-40, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay9(!display9)}
							yAccessor={(d) => d.amb14}
							yLabel={`amb14`}
							valueFill="#657a00"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[30, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay10(!display10)}
							yAccessor={(d) => d.amb15}
							yLabel={`amb15`}
							valueFill="#FF4136"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[100, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay11(!display11)}
							yAccessor={(d) => d.amb55}
							yLabel={`amb55`}
							valueFill="#7FDBFF"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[170, 3]}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.amb13}
							fill={!display8 ? "#283747" : "#FFFFFF"}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.amb14}
							fill={!display9 ? "#657a00" : "#FFFFFF"}
						/>
						<XAxis
							axisAt="bottom"
							orient="bottom"
							showTicks={false}
							opacity={2}
						/>
						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					<Chart
						id={4}
						yExtents={(d) => d.macd}
						height={75}
						origin={(w, h) => [0, h - 440]}
						padding={{ top: 10, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={2} {...yGrid} />

						<LineSeries
							yAccessor={(d) => d.macd}
							stroke={"#657a00"}
							style={display12 ? { display: "none" } : { display: "" }}
						/>
						<LineSeries
							yAccessor={(d) => d.histogram}
							stroke={"#FF4136"}
							style={display13 ? { display: "none" } : { display: "" }}
						/>

						<SingleValueTooltip
							onClick={() => setDisplay12(!display12)}
							yAccessor={(d) => d.macd}
							yLabel={`MACD`}
							valueFill="#657a00"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[-40, 3]}
						/>
						<SingleValueTooltip
							onClick={() => setDisplay13(!display13)}
							yAccessor={(d) => d.histogram}
							yLabel={`Signal`}
							valueFill="#FF4136"
							yDisplayFormat={format(".2f")}
							/* valueStroke={atr14.stroke()} - optional prop */
							/* labelStroke="#4682B4" - optional prop */
							origin={[40, 3]}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.macd}
							fill={!display12 ? "#657a00" : "#FFFFFF"}
						/>
						<CurrentCoordinate
							yAccessor={(d) => d.histogram}
							fill={!display13 ? "#FF4136" : "#FFFFFF"}
						/>

						<XAxis
							axisAt="bottom"
							orient="bottom"
							showTicks={false}
							opacity={2}
						/>
						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					<Chart
						id={5}
						yExtents={(d) => d.ambb5}
						height={90}
						origin={(w, h) => [0, h - 350]}
						padding={{ top: 10, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={3} {...yGrid} />
						{rsikChart()}
						{ambb5Chart()}
						{ciChart()}
						<XAxis
							axisAt="bottom"
							orient="bottom"
							showTicks={false}
							opacity={2}
						/>

						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					
					<Chart
						id={6}
						yExtents={(d) => d.aroonu / 100}
						height={80}
						origin={(w, h) => [0, h - 250]}
						padding={{ top: 10, bottom: 10 }}
					>
						<YAxis axisAt="right" orient="right" ticks={3} {...yGrid} />

						{aroonuChart()}
						{aroondChart()}

						{	selected.includes('rsiK') ? (
							rsikChart()
						) : ("")
						}

						{	selected.includes('Ambb5') ? (
							ambb5Chart()
						) : ("")
						}
						
						{	selected.includes('Ci') ? (
							ciChart()
						) : ("")
						}
						<XAxis
							axisAt="bottom"
							orient="bottom"
							outerTickSize={10}
							{...xGrid}
						/>
						<MouseCoordinateX
							at="bottom"
							orient="bottom"
							opacity={2}
							displayFormat={timeFormat("%Y-%m-%d")}
						/>
						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")}
						/>
					</Chart>
					<CrossHairCursor mouseMove />
				</ChartCanvas>
			) : (
				""
			)}
			
		</div>
		<div className="select">
				<Select
					closeMenuOnSelect={false}
					defaultValue={[options[0], options[1]]}
					isMulti
					options={options}
					
					onChange={setSelectedOption}
				/>
			</div>
		</>
	);
}

export default Graphh;
