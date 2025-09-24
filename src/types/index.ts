export interface User {
  phone: string;
  role: 'farmer' | 'lab' | 'driver' | 'ngo' | 'vet';
  verified: boolean;
  name?: string;
  location?: string;
  aadhaarDetails?: {
    name: string;
    address: string;
    aadhaarNumber: string;
  };
  professionalDetails?: {
    name: string;
    license: string;
    specialization?: string;
  };
}

export interface Request {
  id: string;
  type: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'rejected';
  farmerName: string;
  location: string;
  description: string;
  createdAt: string;
  details?: any;
}

export interface ServiceRequest extends Request {
  serviceType: 'soil-test' | 'crop-test' | 'vet-service' | 'transport' | 'emergency';
}