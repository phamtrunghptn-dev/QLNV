export const API = 'https://c31a-27-69-1-119.ap.ngrok.io';
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
      message = 'Đạt';
      color = 'status-approved';
      break;
    case 9:
      message = 'Không đạt';
      color = 'status-not-pass';
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
    case 18:
      message = 'Chờ phỏng vấn';
      color = 'status-pending';
      break;
    default:
      message = 'Không trạng thái';
  }
  return {
    message,
    color,
  };
};

export const sex = [{ name: 'Nam' }, { name: 'Nữ' }, { name: 'Khác' }];
