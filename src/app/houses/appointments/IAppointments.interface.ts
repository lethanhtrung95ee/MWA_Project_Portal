export default interface IAppointmentsInterface {
  address: {
    home_number: number,
    street: string,
    city: string,
    state: string,
    zipcode: number
  },
  publisher: {
    appointments: [{
      email: string,
      fullName: string,
      userId: string
    }]
  }
}
