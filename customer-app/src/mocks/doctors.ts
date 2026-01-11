import type { IDoctor } from '@/types'

export const mockDoctors: IDoctor[] = [
  {
    id: '1',
    name: 'Dr. Simmons',
    title: 'General Practitioner',
    specialty: 'Family Medicine',
    bio: 'Dr. Simmons has extensive experience in family medicine, providing comprehensive care for patients of all ages.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    languages: ['English'],
    qualifications: ['MBBS', 'FRACGP'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    title: 'General Practitioner',
    specialty: 'General Practice',
    bio: 'Dr. Chen provides quality general practice care with a focus on preventive medicine and chronic disease management.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    languages: ['English', 'Mandarin'],
    qualifications: ['MBBS', 'FRACGP'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    title: 'General Practitioner',
    specialty: 'General Practice',
    bio: 'Dr. Wilson is dedicated to providing comprehensive healthcare services to the community.',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    languages: ['English'],
    qualifications: ['MBBS', 'FRACGP'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    title: 'General Practitioner',
    specialty: 'General Practice',
    bio: 'Dr. Brown offers patient-centered care with years of experience in general practice medicine.',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    languages: ['English'],
    qualifications: ['MBBS', 'FRACGP'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
  },
  {
    id: '5',
    name: 'Dr. Emma Richardson',
    title: 'Skin Specialist',
    specialty: 'Dermatology',
    bio: 'Dr. Richardson is a visiting skin specialist with expertise in skin cancer detection, mole checks, and general dermatology. Available one day per week.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    languages: ['English'],
    qualifications: ['MBBS', 'FACD', 'Specialist Dermatologist'],
    availableDays: ['Thursday'],
    isActive: true,
  },
]

export const getDoctorById = (id: string): IDoctor | undefined => {
  return mockDoctors.find((doctor) => doctor.id === id)
}
