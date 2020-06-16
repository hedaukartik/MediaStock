import React from 'react'
import { Table } from 'reactstrap';
import TimeAgo from 'react-timeago';
import BootstrapTable from 'react-bootstrap-table-next';

export function ListView(props) {

    const getStockValueColor = (stock) => {
        if (stock.current_value < stock.history.slice(-2)[0].value) {
            return 'bg-red';
        }
        else if (stock.current_value > stock.history.slice(-2)[0].value) {
            return 'bg-green';
        }
        else {
            return null;
        }
    }


    return (
        <React.Fragment>
            <div>
                <Table bordered className="text-center">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Current Price</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(props.stocks).map((stock) => {
                                const current_stock = props.stocks[stock];
                                console.log("current_stock", current_stock);
                                return (
                                    <tr key={stock}>
                                        <td>{stock}</td>
                                        <td className={getStockValueColor(current_stock)}>
                                            {current_stock.current_value.toFixed(2)}
                                        </td>
                                        <td className='updated_at'>
                                            <TimeAgo date={current_stock.history.slice(-1)[0].time} />
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }

                    </tbody>
                </Table>
            </div>
        </React.Fragment>

    )

}

export default ListView;