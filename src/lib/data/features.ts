import type { Feature } from "$lib/utils/types";

export default [ 
  {
    name: 'Lớp học Yoga',
    description:
      'Lớp Yoga giúp cân bằng thân tâm, tăng cường sự dẻo dai và giảm căng thẳng. Hãy tham gia để khám phá hơi thở và tìm thấy bình yên nội tại.',
    image: 'images/class.jpg',
    tags: [{ label: 'Local and Foreign Teachers' }]
  }, 
  {
    name: 'Trại dưỡng sinh Yoga (Yoga Retreat)',
    description:
      'Trại dưỡng sinh Yoga mang đến thời gian tĩnh tâm sâu sắc, thực hành thiền định, và kết nối với thiên nhiên để phục hồi năng lượng toàn diện.',
    image: 'images/yoga.jpg',
    tags: [{ label: 'Primary Color' }, { label: 'Secondary Color', color: 'secondary' }]
  }, 
  {
    name: 'Y học Thay thế',
    description:
      'Y học Thay thế tập trung vào các phương pháp chữa lành tự nhiên, cân bằng năng lượng cơ thể, hỗ trợ sức khỏe và phòng ngừa bệnh tật hiệu quả.',
    image: 'images/veg.jpg',
  }, 
  {
    name: 'Lớp dạy nấu ăn chay',
    description:
      'Lớp dạy nấu ăn chay hướng dẫn các công thức đơn giản, dinh dưỡng, và sáng tạo, giúp bạn chế biến bữa ăn lành mạnh, ngon miệng cho gia đình.',
    image: 'images/veg.jpg',
    tags: [{ label: 'Food as Medicine' }]
  }, 
  {
    name: 'Đơn vị Chủ đạo Ananda Marga (Master Unit of Ananda Marga)',
    description:
      'Đơn vị Chủ đạo của Ananda Marga là nơi thực hành lối sống cân bằng, phát triển nông nghiệp sinh thái và phục vụ cộng đồng địa phương.',
    image: 'images/yoga.jpg',
  },
  {
    name: 'Cứu trợ Thảm họa AMURT (AMURT Disaster Relief)',
    description:
      'AMURT cung cấp cứu trợ nhân đạo khẩn cấp, hỗ trợ lương thực, y tế, và tái thiết cộng đồng sau thiên tai, mang lại hy vọng cho người dân.',
    image: 'images/amurt.jpg'
  },
  {
    name: 'Lý thuyết Kinh tế PROUT (PROUT Economic Theory)',
    description:
      'Lý thuyết Kinh tế PROUT đề xuất mô hình phân phối tài sản công bằng, tối đa hóa phúc lợi xã hội và đảm bảo sinh kế cho mọi người.',
    image: 'images/yoga.jpg'
  },  
  {
    name: 'Chủ nghĩa Tân Nhân văn (Neo-Humanism',
    description:
      'Chủ nghĩa Tân Nhân văn là triết lý mở rộng tình yêu thương và lòng trắc ẩn không chỉ với con người mà còn với muôn loài và toàn vũ trụ.',
    image: 'images/amurt.jpg'
  },  
] as Feature[];

