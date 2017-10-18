// @flow
/* global Event */
import React from 'react';
import type { ElementRef } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import TemperatureStore from './TemperatureStore';

const temps = observable({
  cities: observable.map(new Map()
    .set('Amsterdam', new TemperatureStore())
    .set('London', new TemperatureStore())),
  addNewCity: action(function add(city: string) {
    this.cities.set(city, new TemperatureStore());
  }),
  removeCity: action(function remove(city: string) {
    this.cities.delete(city);
  }),
});

const cityObservable = observable({
  city: '',
  changeCityName: action(function change(value: string) {
    this.city = value;
  }),
});


type Props = {};

@observer
class Counter extends React.Component<Props> {
  cityInput: ?ElementRef<'input'>;

  handleChangeTemperatureUnit = (unit: 'C' | 'F' | 'K', temperatureStore: TemperatureStore) => {
    temperatureStore.setUnit(unit);
  };

  handleChangingNewCity = () => {
    if (this.cityInput) {
      cityObservable.changeCityName(this.cityInput.value);
    }
  };

  handleAddNewCity = (e: Event) => {
    e.preventDefault();
    temps.addNewCity(cityObservable.city);
    cityObservable.changeCityName('');
  };

  handleRemovingCity = (e: Event, city: string) => {
    e.preventDefault();
    temps.removeCity(city);
  };

  render() {
    return (
      <section>
        {
          temps.cities.entries().map(([city, temperatureStore]) => (
            <section key={`${city}-${temperatureStore.id}`}>
              <button onClick={(e: Event) => this.handleRemovingCity(e, city)}>
                {city}: {temperatureStore.temperature}
              </button>
              <button onClick={() => this.handleChangeTemperatureUnit('C', temperatureStore)}>C</button>
              <button onClick={() => this.handleChangeTemperatureUnit('F', temperatureStore)}>F</button>
              <button onClick={() => this.handleChangeTemperatureUnit('K', temperatureStore)}>K</button>
            </section>
          ))
        }
        <form onSubmit={this.handleAddNewCity}>
          <input
            ref={(ref) => {
              this.cityInput = ref;
            }}
            type="text"
            required
            value={cityObservable.city}
            onChange={this.handleChangingNewCity}
          />
          <button type="submit">Add</button>
        </form>
      </section>
    );
  }
}

export default Counter;
