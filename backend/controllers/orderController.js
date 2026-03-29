import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';

// ============================
// PLACE ORDER (FINAL CLEAN VERSION)
// ============================
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            status: "Pending",
            payment: false
        });

        await newOrder.save();

        // Clear cart after order
        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        });

        res.json({
            success: true,
            message: "Order Placed Successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// ============================
// VERIFY ORDER (DISABLED)
// ============================
const verifyOrder = async (req, res) => {
    res.json({
        success: true,
        message: "Payment not required"
    });
};

// ============================
// USER ORDERS
// ============================
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ============================
// ADMIN: LIST ALL ORDERS
// ============================
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ============================
// UPDATE ORDER STATUS
// ============================
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status
        });

        res.json({
            success: true,
            message: "Status Updated"
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
};