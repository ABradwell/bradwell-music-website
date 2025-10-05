// import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { useState } from 'react';
import { useEffect } from 'react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {

    const setQrCodeAsync = async () => {
      const qrCodeUrl = "https://linktr.ee/bradwell"

      const qrCode = await QRCode.toDataURL(qrCodeUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      setQrDataUrl(qrCode);
    }
    setQrCodeAsync()
   
  }, []);


  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded p-8 shadow-2xl"
        style={{ width: 315, height:330, borderRadius: 15, border: '1px solid #e0e0e0', justifyContent: 'center', alignItems: 'center', padding: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h3 className="text-xl font-semibold text-foreground">Scan with your phone</h3>
          <p className="text-muted-foreground text-sm">
            Point your camera at the QR code to visit my Linktree
          </p>
          
          <div className="flex justify-center p-4 bg-white rounded-xl">
            <img 
                src={qrDataUrl} 
                alt="QR Code for Linktree" 
                style={{ width: 150, height: 150 }}
              />
          </div>
          
          <p className="text-xs text-muted-foreground">
            Click anywhere to close
          </p>
        </div>
      </div>
    </div>
  );
}
