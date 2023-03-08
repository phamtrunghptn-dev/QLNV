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
          <th style={{ textAlign: 'center', width: '10%' }}>Sự kiện</th>
          <th style={{ textAlign: 'center', width: '15%' }}>Ví trí làm việc</th>
          <th style={{ textAlign: 'center', width: '10%' }}>Chức vụ làm việc</th>
          <th style={{ textAlign: 'center', width: '10%' }}>Phòng ban làm việc</th>
          <th style={{ textAlign: 'center', width: '20%' }}>Lý do</th>
        </tr>
        {list.map((item, index) => (
          <>
            <tr className="tr">
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>
                {item?.date ? moment(item?.date).format('DD/MM/YYYY') : ''}
              </td>
              <td style={{ textAlign: 'center' }}>{item?.event}</td>
              <td style={{ textAlign: 'center' }}>{item?.titleRecruit}</td>
              <td style={{ textAlign: 'center' }}>{item?.workingPosition}</td>
              <td style={{ textAlign: 'center' }}>{item?.workingDepartment}</td>
              <td style={{ textAlign: 'left' }}>{item?.reason}</td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
}
