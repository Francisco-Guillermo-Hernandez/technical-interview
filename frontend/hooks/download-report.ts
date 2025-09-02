import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';



interface Package {
  length: number;
  height: number;
  width: number;
  content: string;
  weight: number;
}

interface Order {
  _id: string;
  deliveryAddress: string;
  directions: string;
  instructions: string;
  deliveryDate: string;
  firstLevel: string;
  secondLevel: string;
  thirdLevel: string | null;
  packages: Package[];
  firstName: string;
  lastName: string;
  pickupAddress: string;
  createdAt: string;
}

const useDownloadReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadOrdersAsXLSX = useCallback(async (response: Array<Order>, fileName: string = 'orders.xlsx') => {
    try {
      setLoading(true);
      setError(null);
      
      // Transform orders data to flat structure for Excel
      const flattenedOrders = response.map(order => {
        // Flatten package data - take the first package or create empty fields
        const pkg = order.packages[0] || {};
        
        return {
          'Order ID': order._id,
          'Delivery Address': order.deliveryAddress,
          'Directions': order.directions,
          'Instructions': order.instructions,
          'Delivery Date': order.deliveryDate,
          'First Level': order.firstLevel,
          'Second Level': order.secondLevel,
          'Third Level': order.thirdLevel || '',
          'Package Length': pkg.length || 0,
          'Package Height': pkg.height || 0,
          'Package Width': pkg.width || 0,
          'Package Content': pkg.content || '',
          'Package Weight': pkg.weight || 0,
          'First Name': order.firstName,
          'Last Name': order.lastName,
          // 'Phone': order.phone,
          // 'Email': order.email,
          'Pickup Address': order.pickupAddress,
          'Created At': order.createdAt
        };
      });

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(flattenedOrders);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');
      
      // Generate and download file
      XLSX.writeFile(wb, fileName);
    } catch (err) {
      setError('Failed to generate Excel file');
      console.error('Error generating Excel:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    downloadOrdersAsXLSX
  };
};

export default useDownloadReport;
