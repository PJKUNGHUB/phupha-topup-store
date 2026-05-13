import { supabase } from './supabase.js';

const main = {

  async submitOrder() {

    const gameName =
      document.getElementById('gameName').value;

    const price =
      document.getElementById('price').value;

    const category =
      document.getElementById('category').value;

    const paymentTime =
      document.getElementById('paymentTime').value;

    const imageFile =
      document.getElementById('slipImage').files[0];

    if (!gameName || !price || !category || !paymentTime || !imageFile) {
      alert('กรอกข้อมูลให้ครบ');
      return;
    }

    const orderId =
      'PP-' + Date.now();

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase
      .storage
      .from('payment-slips')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error(uploadError);
      alert('อัปโหลดรูปไม่สำเร็จ');
      return;
    }

    const imageUrl =
      `${supabase.storageUrl}/object/public/payment-slips/${fileName}`;

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          order_id: orderId,
          game_name: gameName,
          category: category,
          price: price,
          payment_time: paymentTime,
          image_url: imageUrl
        }
      ]);

    if (error) {
      console.error(error);
      alert('สร้างออเดอร์ไม่สำเร็จ');
      return;
    }

    window.location.href =
      `success.html?order=${orderId}`;
  }

};

window.main = main;