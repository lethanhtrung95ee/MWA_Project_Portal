export default interface IDetailHouse{
    
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
        yearBuilt: number,
        garages: number
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