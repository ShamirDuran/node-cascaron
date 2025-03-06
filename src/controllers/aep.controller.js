const service = require("../services/aep.service");

const getEvents = async (req, res) => {
  try {
    const resp = await service.getEvents();
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
};
