const Client = require("../models/client.modle");

const register = async (req, res) => {
  try {
    const {
      name,
      mobile,
      registrationNo,
      joiningDate,
      monthlyFee,
      lastpaidDate,
      nextDueDate,
      status,
    } = req.body;

    if (!name || !mobile || !registrationNo || !joiningDate) {
      return res.status(400).json({
        message: "name, mobile, registrationNo, joiningDate are required",
      });
    }
    console.log(
      name,
      mobile,
      registrationNo,
      joiningDate,
      monthlyFee,
      lastpaidDate,
      nextDueDate,
      status,
    );
    const clientdata = await Client.create({
      name,
      mobile,
      registrationNo,
      joiningDate,
      monthlyFee,
      lastpaidDate,
      nextDueDate,
      status,
    });
    console.log(Client);
    return res.status(201).json({ message: "client created", clientdata });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getclient = async (req, res) => {
  try {
    const client = await Client.find();
    console.log(client)
    return res.status(200).json({
      message: "Get clients successfully",
      client,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getclientbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      message: "Get client successfully",
      client,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteclient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      message: "Client deleted successfully",
      client,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getduesoon = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAhead = new Date(today);
    weekAhead.setDate(weekAhead.getDate() + 7);

    const clients = await Client.find({
      nextDueDate: { $gte: today, $lte: weekAhead },
      status: "active",
    });

    return res.status(200).json({
      message: "Clients with fee due within 7 days",
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const markFeePaid = async (req, res) => {
  try {
    const { id } = req.params;

    const today = new Date();
    const nextDueDate = new Date(today);
    nextDueDate.setDate(nextDueDate.getDate() + 30); // was: nextDueDate.setMonth(nextDueDate.getMonth() + 1)

    const client = await Client.findByIdAndUpdate(
      id,
      {
        lastpaidDate: today,
        nextDueDate,
        status: "active",
      },
      { new: true },
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      message: "Fee marked as paid",
      client,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const updateclient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      mobile,
      registrationNo,
      joiningDate,
      monthlyFee,
      lastpaidDate,
      nextDueDate,
      status,
    } = req.body;

    const client = await Client.findByIdAndUpdate(
      id,
      { name, mobile, registrationNo, joiningDate, monthlyFee, lastpaidDate, nextDueDate, status },
      { new: true, runValidators: true },
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { register, getclient, getclientbyid, deleteclient, getduesoon, markFeePaid, updateclient };

