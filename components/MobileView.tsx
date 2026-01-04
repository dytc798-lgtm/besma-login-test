"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MobileViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MobileView({ isOpen, onClose, title, children }: MobileViewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4">
        {/* 핸드폰 프레임 */}
        <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          {/* 노치 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
          
          {/* 화면 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ height: "700px" }}>
            {/* 상태바 */}
            <div className="bg-safety-navy text-white px-4 py-2 flex items-center justify-between text-xs">
              <div>9:41</div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1.5 bg-white rounded-sm m-0.5"></div>
                </div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>

            {/* 헤더 */}
            <div className="bg-safety-navy text-white px-4 py-3 flex items-center justify-between">
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-semibold text-sm">{title}</h2>
              <div className="w-5"></div>
            </div>

            {/* 콘텐츠 */}
            <div className="overflow-y-auto" style={{ height: "calc(700px - 80px)" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

