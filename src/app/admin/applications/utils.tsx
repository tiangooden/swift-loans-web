import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    case 'paid': return 'text-blue-600 bg-blue-100';
    case 'overdue': return 'text-red-600 bg-red-100';
    case 'suspended': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusIcon = (status: string, props: React.SVGProps<SVGSVGElement>) => {
  switch (status) {
    case 'active': return <CheckCircle {...props} />;
    case 'pending': return <Clock {...props} />;
    case 'paid': return <CheckCircle {...props} />;
    case 'overdue': return <AlertTriangle {...props} />;
    case 'suspended': return <AlertTriangle {...props} />;
    default: return <Clock {...props} />;
  }
};