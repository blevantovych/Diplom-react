import React from 'react';
import Plot from './Plot';
import Formula from './Formula';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import truncateCoefs from '../helpers/truncateCoefs';


const CardExampleWithAvatar = () => (
  <Card>
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwC8bhOwOO7aYasqD6Wa-7gHsOGeLMqxVgt7D6uWLTSrGItp3z"
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="http://www.planwallpaper.com/static/images/4-Nature-Wallpapers-2014-1_ukaavUI.jpg" />
    </CardMedia>
    
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);


export default class Iteration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const alt = this.props.data.alternance.map((el, i) => {
            return <td key={i}>{el.toFixed(7)}</td>
        })
        alt.unshift(<td>Точка альтернансу</td>)

        const err_alt = this.props.data.err_in_each_point.map((el, i) => {
            return <td key={i}>{el.toFixed(7)}</td>
        })
        err_alt.unshift(<td>Похибка</td>)

        return (

            <Card style={{marginBottom: '20px'}}>
                <CardHeader
                    title={'Ітерація ' + (this.props.ctn+1)}
                />

                <CardText>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>{alt}</tr>
                            <tr>{err_alt}</tr>
                        </tbody>
                    </table>
                    <h4>Максимальна похибка
                        <b>{this.props.data.max_err.toFixed(7)}</b>
                    </h4>
                    <h4>Значення <i>x</i> в якому досягається максимальна похибка &nbsp;
                        <b>{this.props.data.x_of_max_err.toFixed(7)}</b></h4>

                    <h4>{this.props.isLast ? 'Алгоритм закінчено бо ' : 'Продовжуємо алгоритм бо '}
                        <b>{this.props.data.err_diff.toFixed(7)} {this.props.isLast ? '<' : '>'} 0.01</b></h4>

                    <h4>Аналітичний вигляд многочлена:
                        <Formula formula={this.props.data.polynom_latex.replace(truncateCoefs(4), '$1')}/>
                    </h4>
                    <Plot
                        id={this.props.ctn+1}
                        plotData={[{x: this.props.data.error_plot[0], y: this.props.data.error_plot[1]}]}
                    />
                    {
                        this.props.isLast &&
                        <div>
                            <h3>Функція і наближення многочленом</h3>
                            <Plot
                                id={this.props.ctn+1 + 'polynom'}
                                plotData={[
                                    {x: this.props.data.pol_plot[0], y: this.props.data.pol_plot[1], name: "f(x)"},
                                    {x: this.props.data.func_plot[0], y: this.props.data.func_plot[1], name: "p(x)"}
                                ]}
                            />
                        </div>
                    }
                </CardText>
            </Card>

        );
    }
}

