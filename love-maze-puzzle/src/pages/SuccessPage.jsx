import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Yey!! Kamu Jago Banget! 🎉
      </h1>
      <p className="text-lg text-gray-800 mb-6">
        Akhirnya kamu selesaikan setiap tantangan perjuangan.
      </p>
      <p className="text-2xl font-semibold text-red-500">
        Ini kado buat kamu 🎁
      </p>

      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => navigate("/")}
      >
        Kembali ke Home
      </button>
    </div>
  );
}

export default SuccessPage;
