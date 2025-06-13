// QRScanner.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { confirmDialog } from '../utils/helpers';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const qrScannerRef = useRef(null);

  const handleScan = (decodedText, decodedResult) => {
    const tableNo = decodedText.replace('table-', '').toUpperCase(); // e.g., table-5 → 5
    
    if (confirmDialog(`Are you at Table ${tableNo}?`)) {
      sessionStorage.setItem('tableNo', tableNo);
      // Stop scanner before navigating
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
      }
      navigate('/menu');
    } else {
      setScanResult(null); // reset scan
      // Continue scanning
    }
  };

  const handleError = (errorMessage) => {
    console.error('QR Scanner Error:', errorMessage);
  };

  useEffect(() => {
    if (!isScanning) {
      // Initialize scanner
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
      };

      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        config,
        false // verbose
      );

      qrScannerRef.current = scanner;
      scanner.render(handleScan, handleError);
      setIsScanning(true);
    }

    // Cleanup function
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner:", error);
        });
      }
    };
  }, []);

  const stopScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Scan Table QR</h1>
      
      <div className="w-full max-w-md">
        <div id="qr-reader" ref={scannerRef}></div>
      </div>
      
      {scanResult && (
        <p className="mt-4 text-green-600">Scanned: {scanResult}</p>
      )}
      
      {isScanning && (
        <button
          onClick={stopScanner}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop Scanner
        </button>
      )}
    </div>
  );
};

export default QRScanner;