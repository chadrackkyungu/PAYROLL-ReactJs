/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import React from 'react'



const PayslipTable = () => {



    return (
        <table class="mt-4 table table-bordered">
            <thead className="bg-primary">
                <tr>
                    <th scope="col" className="text-white">Earnings</th>
                    <th scope="col" className="text-white">Amount</th>
                    <th scope="col" className="text-white">No. of days</th>
                    <th scope="col" className="text-white">Deductions</th>
                    <th scope="col" className="text-white">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Salary</th>
                    <td>R 12000</td>
                    <td>xx</td>
                    <td>PF</td>
                    <td>R 0.00</td>
                </tr>
                <tr>
                    <th scope="row">No. of over time worked</th>
                    <td>xx</td>
                    <td>6</td>
                    <td>xx</td>
                    <td>xx</td>
                </tr>
                <tr>
                    <th scope="row">Over Time</th>
                    <td>R 3000 </td>
                    <td>xx</td>
                    <td>Vat</td>
                    <td>R 1000</td>
                </tr>
                <tr>
                    <th scope="row">WA</th>
                    <td>120.00 </td>
                    <td>LOP</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <th scope="row">CA</th>
                    <td>0.00 </td>
                    <td>PT</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <th scope="row">CCA</th>
                    <td>0.00 </td>
                    <td>SPL. Deduction</td>
                    <td>500.00</td>
                </tr>
                <tr>
                    <th scope="row">MA</th>
                    <td>3000.00</td>
                    <td>EWF</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <th scope="row">Sales Incentive</th>
                    <td>0.00</td>
                    <td>CD</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <th scope="row">Leave Encashment</th>
                    <td>0.00</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <th scope="row">Holiday Wages</th>
                    <td>500.00</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <th scope="row">Special Allowance</th>
                    <td>100.00</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <th scope="row">Bonus</th>
                    <td>1400.00</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <th scope="row">Individual Incentive</th>
                    <td>2400.00</td>
                    <td colspan="2"></td>
                </tr>
                <tr class="border-top">
                    <th scope="row">Total Earning</th>
                    <td>25970.00</td>
                    <td>Total Deductions</td>
                    <td>2442.00</td>
                </tr>
            </tbody>
        </table>
    )
}

export default PayslipTable