export default interface ISearchHouse {
  init:boolean,
  houses: [
    {
      address: {
        home_number: number,
        street: string,
        city: string,
        state: string,
        zipcode: number
      },
      description: {
        square: number,
        prices: number,
        bed: number,
        bath: number,
        propertyDetail: string,
      },
      images: [string],
      interestingUserIds: [string],
      publisher: {
        appointments: [{
          email: string,
          fullName: string,
          userId: string
        }]
      },
      _id: string,
      indexSelected: number,
      hasImage:boolean
    }
  ],
  totalHouses: number
}
