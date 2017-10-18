// @flow
import { observable, computed, action } from 'mobx';

class TemperatureStore {
  id: number = Math.random();
  @observable unit: 'C' | 'F' | 'K' = 'C';
  @observable temperatureCelsius: number = 25;

  @action.bound
  setUnit(unit: 'C' | 'F' | 'K'): void {
    this.unit = unit;
  }

  // $FlowFixMe
  @computed
  get getTemperatureKelvin(): number {
    return (this.temperatureCelsius * (9 / 5)) + 32;
  }

  // $FlowFixMe
  @computed
  get getTemperatureFahrenheit(): number {
    return this.temperatureCelsius + 273.15;
  }

  // $FlowFixMe
  @computed
  get temperature(): string {
    switch (this.unit) {
      case 'K':
        return `${this.getTemperatureKelvin}K`;
      case 'F':
        return `${this.getTemperatureFahrenheit}F`;
      case 'C':
        return `${this.temperatureCelsius}C`;
      default:
        return '';
    }
  }
}

export default TemperatureStore;
