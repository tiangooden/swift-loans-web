
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const getStatusColor = (status: string) => {
    const colors = {
        submitted: 'bg-gray-100 text-blue-800',
        approved: 'bg-green-100 text-green-800',
        accepted: 'bg-green-100 text-green-800',
        offered: 'bg-orange-100 text-orange-800',
        rejected: 'bg-red-100 text-red-800',
        countered: 'bg-yellow-100 text-gray-800',
        withdrawn: 'text-blue-600 bg-blue-100',
        active: 'text-green-600 bg-green-100',
        pending: 'text-yellow-600 bg-yellow-100',
        paid: 'text-blue-600 bg-blue-100',
        overdue: 'text-red-600 bg-red-100',
        suspended: 'text-gray-600 bg-gray-100',
        default: 'text-gray-600 bg-gray-100',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getStatusIcon = (status: string) => {
    switch (status) {
        case 'approved': return <CheckCircle className="h-4 w-4" />;
        case 'accepted': return <CheckCircle className="h-4 w-4" />;
        case 'rejected': return <XCircle className="h-4 w-4" />;
        case 'offered': return <Clock className="h-4 w-4" />;
        case 'pending': return <Clock className="h-4 w-4" />;
        case 'countered': return <Clock className="h-4 w-4" />;
        case 'withdrawn': return <CheckCircle className="h-4 w-4" />;
        case 'active': return <CheckCircle />;
        case 'pending': return <Clock />;
        case 'paid': return <CheckCircle />;
        case 'overdue': return <AlertTriangle />;
        case 'suspended': return <AlertTriangle />;
        default: return <Clock className="h-4 w-4" />;
    }
};