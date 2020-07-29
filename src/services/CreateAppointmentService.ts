import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';

/**
 * Recebimento das informacoes
 * tratativa de erros/excessoes
 * acesso ao repositório
 */

 interface Request {
     provider: string;
     date: Date;
 }

 /**
  * Dependency Inversion ( SOLID )
  *
  */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This Appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment
    }
}

export default CreateAppointmentService;
