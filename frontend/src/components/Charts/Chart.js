import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

// line graph
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

// we need to register the elements that we have imported from the chart.js
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Extract and merge dates from incomes and expenses
    const allDates = [
        ...incomes.map((income) => income.date),
        ...expenses.map((expense) => expense.date),
    ];

    // Remove duplicates and sort dates in ascending order
    const sortedDates = [...new Set(allDates)].sort((a, b) => new Date(a) - new Date(b));

    const data = {
        // Use sorted dates as labels
        labels: sortedDates.map((date) => dateFormat(date)),

        datasets: [
            {
                label: 'Income',
                data: sortedDates.map((date) => {
                    // Match income amount to the date or return 0 if no income on that date
                    const income = incomes.find((inc) => inc.date === date);
                    return income ? income.amount : 0;
                }),
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: sortedDates.map((date) => {
                    // Match expense amount to the date or return 0 if no expense on that date
                    const expense = expenses.find((exp) => exp.date === date);
                    return expense ? expense.amount : 0;
                }),
                backgroundColor: 'red',
                tension: 0.2,
            },
        ],
    };


    return (
        <ChartStyled >
            <Line data={data} />
            
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart