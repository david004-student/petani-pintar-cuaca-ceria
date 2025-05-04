
import React, { useState } from 'react';
import { sendWhatsAppMessage } from '@/utils/whatsappNotification';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const WhatsAppNotifier = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !message) {
      toast({
        title: "Error",
        description: "Nomor telepon dan pesan harus diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Format the phone number if needed (remove +, spaces, etc.)
      const formattedPhone = phoneNumber.replace(/[+\s]/g, '');
      
      const result = await sendWhatsAppMessage({
        phone: formattedPhone,
        message: message,
      });
      
      if (result.status === true) {
        toast({
          title: "Sukses",
          description: "Pesan WhatsApp berhasil dikirim!",
        });
        // Clear form after success
        setMessage('');
      } else {
        toast({
          title: "Gagal",
          description: result.reason || "Pesan gagal terkirim",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim pesan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-farm-green mb-6">Kirim Notifikasi WhatsApp</h2>
      
      <form onSubmit={handleSendMessage} className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Nomor WhatsApp
          </label>
          <Input
            id="phoneNumber"
            placeholder="Contoh: 628123456789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Format: 62xxxxxxxxxx (tanpa tanda + atau spasi)</p>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Pesan
          </label>
          <Textarea
            id="message"
            placeholder="Tulis pesan notifikasi di sini"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[100px]"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-farm-green hover:bg-farm-green-dark"
          disabled={isLoading}
        >
          {isLoading ? "Mengirim..." : "Kirim Pesan WhatsApp"}
        </Button>
      </form>
    </div>
  );
};

export default WhatsAppNotifier;
