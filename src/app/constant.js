export const API = 'https://f6d5-222-252-21-66.ap.ngrok.io';
export const checkStatus = (value) => {
  let message;
  let color;
  switch (value) {
    case -1:
      message = 'Không được phê duyệt';
      color = 'status-rejected';
      break;
    case 1:
      message = 'Bản nháp';
      color = 'status-new';
      break;
    case 2:
      message = 'Chờ duyệt';
      color = 'status-pending';
      break;
    case 3:
      message = 'Đã duyệt';
      color = 'status-approved';
      break;
    case 4:
      message = 'Đang thực hiện';
      color = 'status-processing';
      break;
    case 5:
      message = 'Đã kết thúc';
      color = 'status-finsished';
      break;
    case 6:
      message = 'Từ chối';
      color = 'status-rejected';
      break;
    case 7:
      message = 'Tiếp nhận';
      break;
    case 8:
      message = 'Pass phỏng vấn';
      break;
    case 9:
      message = 'Không pass phỏng vấn';
      break;
    case 10:
      message = 'Yêu cầu chỉnh sửa';
      color = 'status-pending';
      break;
    case 11:
      message = 'Chờ đợi';
      break;
    case 12:
      message = 'Thử việc';
      break;
    case 13:
      message = 'Kết thúc thử việc';
      break;
    case 14:
      message = 'Chính thức';
      break;
    case 15:
      message = 'Nghỉ việc';
      break;
    case 16:
      message = 'Sa thải';
      break;
    case 17:
      message = 'Chờ xử lý';
      color = 'status-new';
      break;
    default:
      message = 'Không trạng thái';
  }
  return {
    message,
    color,
  };
};
