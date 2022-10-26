export default interface IAddHouse{

    address: {
        home_number: string,
        street: string,
        city: string,
        state: string,
        zipcode: string
    },
    description: {
        square: string,
        prices: string,
        bed: string,
        bath: string,
        propertyDetail: string,
        yearBuilt: string,
        garages: string
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
    selectedIndex: number

}
