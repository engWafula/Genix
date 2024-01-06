import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { _id, status } = await req.json();

  if (!_id || !status) {
    return Response.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    let updateFields = { $set: { status } };

    if (status === 'completed') {
      // If status is 'completed', also update 'paid' to true
      updateFields.$set.paid = true;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    return Response.json(updatedOrder);
  } catch (error) {
    return Response.json({ error: "Error updating order status" }, { status: 500 });
  }
}
