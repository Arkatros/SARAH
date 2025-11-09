import * as service from "../services/patientService.js";
import SarahError from "../utils/sarahError.js";
export const invitePatientController = async (req, res) => {
  const request = req.body;
  try {
    if (service.existsPatientEmail(request.email)) {
      service.sendPatientInviteEmail(
        request.email,
        request.name,
        "URL AL FORMULARIO"
      );

      return res.status(200).json({
        message: "Email sent succefully to the patient",
        data: null,
      });
    } else {
      return res.status(404).json({
        message: "Email is already registered in the system",
        data: null,
      });
    }
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    return res.status(500).json({ message: error.message, data: error });
  }
};
