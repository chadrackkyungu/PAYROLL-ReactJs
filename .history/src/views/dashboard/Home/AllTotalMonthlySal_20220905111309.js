/* eslint-disable prettier/prettier */
const todayDate = new Date().getMonth() + 1;
const january = new Date("2022-02-01").getMonth() + 1;

export const getCurrentMonth = (payment) => {
    return payment?.filter(e => {
        const [_, month] = e.paymentDate.split('-');
        return todayDate === +month;
    });
}
export const getJanuary = (payment) => {
    return payment?.filter(e => {
        const [_, month] = e.paymentDate.split('-');
        return january === +month;
    });
}