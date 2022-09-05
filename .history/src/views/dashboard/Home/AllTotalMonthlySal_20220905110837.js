/* eslint-disable prettier/prettier */
const todayDate = new Date().getMonth() + 1;

export const getCurrentMonth = (payment, paymentDate) => {

    return payment?.filter(e => {
        const [_, month] = e.paymentDate.split('-');
        return todayDate === +month;
    });
}