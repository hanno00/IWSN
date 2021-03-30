export interface tempData {
    hum: number,
    temp: number,
    _id: string,
    date: Date
}

export interface energyData {
    _id: string,
    date: Date,
    electricity_delivered_to_client_tariff_1: string,
    electricity_delivered_to_client_tariff_2: string,
    electricity_delivered_by_client_tariff_1: string,
    electricity_delivered_by_client_tariff_2: string,
    Actual_electricity_power_delivered_plus: string,
    Actual_electricity_power_received_min: string,
    Instantaneous_active_power_L1_plus: string,
    Instantaneous_active_power_L1_min: string
}