import Image from "next/image";

export default function QrCode() {
  return (
    <div className="flex h-screen w-full bg-blue-400 justify-center items-center">
      <Image src="/qrcode.png" alt="QRCode" width={328} height={328} />
    </div>
  );
}
