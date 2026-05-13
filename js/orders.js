import supabaseClient from './config.js';

/**
 * สร้าง Order ใหม่
 */
export async function createOrder(orderData) {
  try {
    const { data, error } = await supabaseClient
      .from('orders')
      .insert([orderData])
      .select();

    if (error) {
      console.error('Create Order Error:', error);
      return {
        success: false,
        error
      };
    }

    return {
      success: true,
      data
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err
    };
  }
}

/**
 * ดึงรายการออเดอร์ทั้งหมด
 */
export async function getOrders() {
  try {
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);

      return {
        success: false,
        error
      };
    }

    return {
      success: true,
      data
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err
    };
  }
}

/**
 * ดึงออเดอร์ตาม Order ID
 */
export async function getOrderById(orderId) {
  try {
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error(error);

      return {
        success: false,
        error
      };
    }

    return {
      success: true,
      data
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err
    };
  }
}

/**
 * อัปเดตสถานะ Order
 */
export async function updateOrderStatus(orderId, status) {
  try {
    const { data, error } = await supabaseClient
      .from('orders')
      .update({
        status: status
      })
      .eq('order_id', orderId)
      .select();

    if (error) {
      console.error(error);

      return {
        success: false,
        error
      };
    }

    return {
      success: true,
      data
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err
    };
  }
}

/**
 * ลบ Order
 */
export async function deleteOrder(orderId) {
  try {
    const { error } = await supabaseClient
      .from('orders')
      .delete()
      .eq('order_id', orderId);

    if (error) {
      console.error(error);

      return {
        success: false,
        error
      };
    }

    return {
      success: true
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err
    };
  }
}