import * as d3 from 'd3';
import PrisonPopulation from '../prisonChart';
import './prisonChart.scss';
// class buttonPrisonPopulationChart extends PrisonPopulation {
//     scenes = scenes
// }
const buttonPrisonPopulationChart = Object.create(PrisonPopulation);

buttonPrisonPopulationChart.scenes = (async () => await (await fetch('assets/prison_scenes.json')).json());

buttonPrisonPopulationChart.clearSelected = function clearSelected() {
    d3.timeout(() => {
        d3.selectAll('.selected').classed('selected', false);
    }, this.transitionSpeed);
};

buttonPrisonPopulationChart.selectBars = function selectBars(years) {
    d3.timeout(() => {
        d3.select('.bars').selectAll('.bar')
            .filter(d => years.indexOf(Number(d.year)) > -1)
            .classed('selected', true);
    }, this.transitionSpeed);
};
buttonPrisonPopulationChart.loadScene = function loadScene(scene) {
    const range = d3.range(scene.domain[0], scene.domain[1]);
    
    this.update(this.data.filter(d => range.indexOf(Number(d.year)) > -1));

    // this.clearSelected();

    // if (scene.selected) {
    //     const selected = scene.selected.range
    //         ? d3.range(...scene.selected.range) : scene.selected;
    //     this.selectBars(selected);
    // }

    this.words.html(scene.copy);

    d3.selectAll('button.active').classed('active', false);
    d3.select((d3.event && d3.event.target) || this.buttons.node()).classed('active', true);
};
buttonPrisonPopulationChart.addUIElements = async function () {
    this.height -= 100;
    this.y.range([this.innerHeight(), 0]);
    this.yAxisElement.call(this.yAxis);

    this.xAxisElement
        .attr('transform', `translate(0, ${this.innerHeight()})`);
    this.buttons = d3.select('body')
        .append('div')
        .classed('buttons', true)
    .selectAll('.button');

    this.buttons.data(await this.scenes())
        .enter()
        .append('button')
        .classed('button', true)
        .text(d => d.label)
        .on('click', d => this.loadScene(d))
        .on('touchstart', d => this.loadScene(d));

    this.words = d3.select('body')
        .append('div')
        .classed('words', true);
    this.loadScene(this.scenes[0]);


}

export default buttonPrisonPopulationChart;