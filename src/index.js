
import prisonChart from './prisonChart'
import prisonButtonChart from './buttonChart'
(async (enabled) => {
    if (!enabled) return;
    await prisonChart.init();

    const data = prisonChart.data;

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomChart = () => {
        try {
            const from = getRandomInt(0, data.length - 1);
            const to = getRandomInt(from, data.length - 1);
            prisonChart.update(data.slice(from, to));
        } catch(e) {
            console.error(e);
        }
    };

    prisonChart.update(data);
    setInterval(randomChart, 3000);
})(false);

(async (enabled) => {
    if (!enabled) return;

    await prisonButtonChart.resolveData();
    await prisonButtonChart.init();
    prisonButtonChart.addUIElements();
    prisonButtonChart.update(prisonButtonChart.data);
})(true);