import { getOrders, updateOrderStatus } from '../firebase/orders.js';

const orderContainer = document.getElementById('orderContainer');

async function loadOrders() {
  const result = await getOrders();

  if (!result.success) {
    console.log(result.error);
    return;
  }

  renderOrders(result.data);
}

function renderOrders(orders) {
  orderContainer.innerHTML = '';

  orders.forEach(order => {

    const card = document.createElement('div');
    card.className = 'order-card';

    card.innerHTML = `
      <div class="order-top">
        <div class="order-id">${order.order_id}</div>

        <div class="order-status ${order.status}">
          ${translateStatus(order.status)}
        </div>
      </div>

      <div class="order-info">
        <div><b>เกม:</b> ${order.game_name}</div>
        <div><b>ผู้ใช้:</b> ${order.username}</div>
        <div><b>หมวดหมู่:</b> ${order.category}</div>
        <div><b>ราคา:</b> ฿${order.price}</div>
        <div><b>เวลาชำระ:</b> ${order.payment_time}</div>
      </div>

      <div class="action-buttons">
        <button 
          class="action-btn accept-btn"
          onclick="changeStatus('${order.order_id}','success')">
          ยืนยัน
        </button>

        <button 
          class="action-btn loading-btn"
          onclick="changeStatus('${order.order_id}','processing')">
          กำลังเติม
        </button>

        <button 
          class="action-btn reject-btn"
          onclick="changeStatus('${order.order_id}','rejected')">
          ปฏิเสธ
        </button>
      </div>
    `;

    orderContainer.appendChild(card);
  });
}

window.changeStatus = async (orderId, status) => {

  const result = await updateOrderStatus(orderId, status);

  if (!result.success) {
    alert('อัปเดตไม่สำเร็จ');
    return;
  }

  loadOrders();
};

function translateStatus(status) {

  switch(status) {

    case 'pending':
      return 'รอดำเนินการ';

    case 'processing':
      return 'กำลังเติม';

    case 'success':
      return 'เติมสำเร็จ';

    case 'rejected':
      return 'ถูกปฏิเสธ';

    default:
      return status;
  }
}

loadOrders();