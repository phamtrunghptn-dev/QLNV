import React from 'react';
import moment from 'moment';

export default function HistoryDialog(props) {
  const { list } = props;
  return (
    <>
      <table style={{ width: '100%' }} className="table">
        <tr className="tr">
          <th style={{ textAlign: 'center', width: '3%' }}>STT</th>
          <th style={{ textAlign: 'center', width: '10%' }}>Ngày xảy ra sự kiện</th>
          <th style={{ textAlign: 'center', width: '70%' }}>Mô tả</th>
        </tr>
        {list.map((item, index) => (
          <>
            <tr className="tr">
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>
                {item?.date ? moment(item?.date).format('DD/MM/YYYY') : ''}
              </td>
              <td style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>{item?.description}</td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
}
