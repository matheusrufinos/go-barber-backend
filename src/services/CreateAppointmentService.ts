import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appoinment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppoinmentService {
  public async execute({ provider_id, date }: Request): Promise<Appoinment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appoinmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoinmentService;
