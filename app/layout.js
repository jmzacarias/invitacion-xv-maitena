import "@/app/styles/global.css"; // Verifica que la ruta sea exacta a tu carpeta
export const metadata = {
  title: "Mi Invitación Digital",
  description: "Te invito a mi evento especial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}