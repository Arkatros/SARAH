/**
 * Modelos para Pacientes - Sincronizados con la API
 */

export interface CreatePatientDTO {
  // Obligatorios
  name: string;
  lastName: string;
  email: string;
  phone: string;
  midWifeId: number;
  
  // Opcionales
  dateOfBirth?: string | Date;
  ethnicity?: string;
  residentialStatus?: string;
  partnerName?: string;
  partnerDateOfBirth?: string | Date;
  partnerAddress?: string;
  partnerEmail?: string;
  partnerPhone?: string;
  GPName?: string;
  GPEmail?: string;
  GPPhone?: string;
}

export interface Patient {
  id: number;
  dateOfBirth?: string | Date | null;
  ethnicity?: string | null;
  residentialStatus?: string | null;
  partnerName?: string | null;
  partnerDateOfBirth?: string | Date | null;
  partnerAddress?: string | null;
  partnerEmail?: string | null;
  partnerPhone?: string | null;
  GPName?: string | null;
  GPEmail?: string | null;
  GPPhone?: string | null;
  isActive: boolean;
  userId: number;
  midWifeId: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

