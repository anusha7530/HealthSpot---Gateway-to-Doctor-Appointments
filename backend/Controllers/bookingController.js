import User from "../models/UserSchema";
import Doctor from "../models/DoctorSchema";
import Booking from "../models/BookingSchema";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.params.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amout: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              image: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });

    await booking.save();

    res.send(200).json({ succes: true, messgae: "Successfully paid", session });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error, creating checkout session" });
  }
};
